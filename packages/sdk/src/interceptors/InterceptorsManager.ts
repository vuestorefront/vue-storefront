import { handleError } from "../error";
import type { EventManagerInterface } from "../events/EventManager";
import type { InterceptorType, MappedInterceptors, SDKConfig } from "../types";
import { AnyFunction, Interceptor, InterceptorsConfig } from "../types";

/**
 * This class is responsible for managing interceptors, executing them and mapping them to the methods.
 */
export class InterceptorsManager<Config extends SDKConfig> {
  /**
   * SDK Configuration object
   *
   * @private
   */
  private readonly config: Config;

  /**
   * Event manager
   *
   * @private
   */
  private readonly eventManager: EventManagerInterface;

  /**
   * Mapped interceptors
   *
   * @private
   */
  private readonly configuredInterceptors: Record<string, MappedInterceptors>;

  /**
   * InterceptorsManager constructor
   *
   * @param config
   * @param eventManager
   */
  constructor(config: Config, eventManager: EventManagerInterface) {
    this.config = config;
    this.eventManager = eventManager;
    this.configuredInterceptors = this.configureInterceptors(config);
  }

  /**
   * Resolves interceptor from the configuration.
   *
   * @param {string} moduleName
   * @param {string} methodName
   * @param {InterceptorType} interceptorType
   */
  public getInterceptors(
    moduleName: string,
    methodName: string,
    interceptorType: InterceptorType
  ) {
    return (
      this.configuredInterceptors[moduleName]?.[interceptorType]?.[
        methodName
      ] ?? []
    );
  }

  /**
   * Resolves replacement function from the configuration object.
   *
   * @param {string} moduleName
   * @param {string} methodName
   */
  public getOverride(moduleName: string, methodName: string) {
    return this.config[moduleName]?.override?.[methodName] ?? null;
  }

  /**
   * Executes configured interceptors in an ordered sequence
   *
   * @param {Interceptor} interceptors
   * @param data
   */
  // eslint-disable-next-line class-methods-use-this
  private executeInterceptors = async <T>(
    interceptors: Interceptor[],
    data: T
  ): Promise<T> => {
    if (!interceptors) return data;
    for (const interceptor of interceptors) {
      if (typeof interceptor === "function") {
        // eslint-disable-next-line no-param-reassign
        data = await interceptor(data);
      }
    }

    return data;
  };

  /**
   * Configures interceptors for a given extension
   * and returns the result
   *
   * @param config
   */
  private configureInterceptors = (
    config: Config
  ): Record<string, MappedInterceptors> => {
    const mappedInterceptors: Record<string, MappedInterceptors> = {};

    Object.entries(config).forEach(([extensionCode, extensionConfig]) => {
      if (extensionConfig?.interceptors) {
        mappedInterceptors[extensionCode] = this.mapInterceptors(
          extensionConfig.interceptors
        );
      }
    });

    return mappedInterceptors;
  };

  /**
   * Structure of interceptors config object is user-friendly and looks like this:
   * interceptors: [
   *     {
   *       before: {
   *         m1: [() => 'm1+a', () => 'm1+b'],
   *         m2: () => 'm2'
   *       },
   *       after: {
   *         m1: () => 'm1-after'
   *       }
   *     },
   *     {
   *       before: {
   *         m1: () => 'm1+c',
   *         m3: () => 'm3'
   *       }
   *     },
   *     ...npmPackage1,
   *     ...npmPackage2,
   *     ...
   *   ]
   *
   * It will be internally mapped to this structure:
   * interceptors: {
   *   before: {
   *     m1: [
   *       () => 'm1+a',
   *       () => 'm1+b',
   *       () => 'm1+c'
   *     ],
   *     m2: [
   *       () => 'm2'
   *     ],
   *     m3:[
   *       () => 'm3'
   *     ]
   *   },
   *   after: {
   *     m1: [
   *       () => 'm1-after'
   *     ]
   *   }
   * }
   */
  // eslint-disable-next-line class-methods-use-this
  private mapInterceptors(
    interceptors: Array<InterceptorsConfig>
  ): MappedInterceptors {
    const mappedInterceptors: MappedInterceptors = {
      before: {},
      after: {},
      around: {},
    };

    interceptors.forEach((interceptor: InterceptorsConfig) => {
      Object.entries(interceptor).forEach(
        ([interceptorType, interceptorMethods]) => {
          Object.entries(interceptorMethods).forEach(
            ([methodName, methodInterceptors]) => {
              if (!mappedInterceptors[interceptorType][methodName]) {
                mappedInterceptors[interceptorType][methodName] = [];
              }

              if (Array.isArray(methodInterceptors)) {
                mappedInterceptors[interceptorType][methodName].push(
                  ...methodInterceptors
                );
              } else if (typeof methodInterceptors === "function") {
                mappedInterceptors[interceptorType][methodName].push(
                  methodInterceptors
                );
              }
            }
          );
        }
      );
    });

    return mappedInterceptors;
  }

  /**
   * @param {string} moduleName
   * @param {string} methodName
   * @param {any} args
   */
  private async executeBeforeInterceptors<T>(
    moduleName: string,
    methodName: string,
    args: T
  ): Promise<T> {
    const interceptors = this.getInterceptors(moduleName, methodName, "before");

    return this.executeInterceptors<T>(interceptors, args);
  }

  /**
   *
   * @param {string} moduleName
   * @param {string} methodName
   * @param {function} callback Original method
   * @param {any} args
   * @returns
   */
  private async executeAroundInterceptors<T>(
    moduleName: string,
    methodName: string,
    callback: AnyFunction,
    args: any[]
  ): Promise<T> {
    const interceptors = this.getInterceptors(moduleName, methodName, "around");

    if (!interceptors.length) {
      return callback(...args);
    }

    for (let i = interceptors.length - 1; i >= 0; i -= 1) {
      const interceptor = interceptors[i];
      const next = interceptors[i + 1] ?? callback;

      interceptors[i] = interceptor.bind(interceptor, next);
    }

    return interceptors?.[0]?.(...args) ?? callback(...args);
  }

  /**
   * @param {string} moduleName
   * @param {string} methodName
   * @param {any} result
   */
  private async executeAfterInterceptors<T>(
    moduleName: string,
    methodName: string,
    result: T
  ): Promise<T> {
    const interceptors = this.getInterceptors(moduleName, methodName, "after");

    return this.executeInterceptors<T>(interceptors, result);
  }

  /**
   * Applies interceptors to connector methods.
   *
   * @param {string} fnName Name of the interceptor subject function
   * @param {any} fn Subject of the interceptor
   * @param {string} moduleName
   * @public
   */
  public applyInterceptors(
    fnName: string,
    fn: AnyFunction,
    moduleName: string
  ): ReturnType<typeof fn> {
    return async (
      ...args: Parameters<typeof fn>
    ): Promise<ReturnType<typeof fn>> => {
      try {
        this.eventManager.emit(`*_before`, args);
        this.eventManager.emit(`${moduleName}_before`, args);
        this.eventManager.emit(`${moduleName}_${fnName}_before`, args);

        const methodArgs = await this.executeBeforeInterceptors(
          moduleName,
          fnName,
          args
        );
        const finalFn = this.getOverride(moduleName, fnName) ?? fn;

        let result = await this.executeAroundInterceptors(
          moduleName,
          fnName,
          finalFn,
          methodArgs
        );

        result = await this.executeAfterInterceptors(
          moduleName,
          fnName,
          result
        );

        this.eventManager.emit(`*_after`, result);
        this.eventManager.emit(`${moduleName}_after`, result);
        this.eventManager.emit(`${moduleName}_${fnName}_after`, result);

        return result;
      } catch (err) {
        if (err instanceof Error) {
          throw handleError(err);
        } else {
          throw err;
        }
      }
    };
  }
}
