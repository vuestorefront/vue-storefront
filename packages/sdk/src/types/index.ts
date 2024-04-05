/**
 * This file contains all types used in the SDK.
 *
 * @remarks
 * This file is used to generate the documentation for the SDK.
 * We use the {@link https://tsdoc.org/ | TSDoc} syntax.
 * When you add a new type, please add a short description and an example.
 */

/**
 * AnyFunction type represents a function that accepts any number of arguments
 * and returns any type of value.
 * It is used for the connector methods, interceptors, overrides and extensions for which
 * we don't know the exact types.
 *
 * @example
 * const fn: AnyFunction = (a, b) => a + b;
 */
export type AnyFunction = (...args: Array<any>) => any;

/**
 * InitFunction is a function that is called when the module is initialized.
 * It contains the module options that is passed to the module and returns
 * the module.
 *
 * @example
 * const MyModule: InitFunction<Module> = (opts) => {
 * // Do something with the options
 *  return {
 *    connector: {
 *    method1: () => {},
 *   },
 *  }
 * }
 */
export type InitFunction<T> = (opts?: any) => T;

/**
 * Alias for the AnyFunction type.
 * Used in the context of interceptors.
 *
 * @see AnyFunction
 */
export type Interceptor = AnyFunction;

/**
 * InterceptorType represents the type of the interceptor.
 */
export type InterceptorType = "before" | "after" | "around";

/**
 * InterceptorsConfig represents the configuration of the interceptors.
 * It is a map of the interceptor type to the map of the method name to the interceptor.
 *
 * @example
 * const interceptorsConfig: InterceptorsConfig = {
 *  before: {
 *    method1: [interceptor1, interceptor2],
 *    method2: interceptor3,
 *  },
 *  after: {
 *    method1: [interceptor1, interceptor2],
 *    method2: interceptor3,
 *  },
 *  around: {
 *    method1: [interceptor1, interceptor2],
 *    method2: interceptor3,
 *  },
 *};
 */
export type InterceptorsConfig = {
  [type in InterceptorType]?: Record<
    string,
    Interceptor | Array<Interceptor> | undefined
  >;
};

/**
 * MappedInterceptors represents the interceptors mapped to the methods.
 * Used internally by the SDK.
 *
 * @internal
 */
export type MappedInterceptors = Record<
  string,
  Record<string, Array<Interceptor>>
>;

/**
 * Utility type that defines the type of arguments that are passed to the `before` interceptor.
 */
export type InterceptorArgsBefore<ARGS extends AnyFunction> = Parameters<ARGS>;

/**
 * Utility type that defines the type of the result that is returned from the `before` interceptor.
 */
export type InterceptorResultBefore<ARGS extends AnyFunction> = Promise<
  Parameters<ARGS>
>;

/**
 * Utility type that defines the type of arguments that are passed to the `after` interceptor.
 */
export type InterceptorArgsAfter<RESULT extends AnyFunction> = Awaited<
  ReturnType<RESULT>
>;

/**
 * Utility type that defines the type of the result that is returned from the `after` interceptor.
 */
export type InterceptorResultAfter<RESULT extends AnyFunction> = Promise<
  ReturnType<RESULT>
>;

/**
 * EventCallback is a function that is called when an event is emitted.
 */
export type EventCallback = <T>(...data: Array<T>) => void;
/**
 * Subscribers are declarative callbacks that are called when an event is emitted.
 */
export type Subscribers = Record<string, EventCallback | Array<EventCallback>>;
/**
 * Connector returns all methods that are exposed by the module.
 */
export type Connector = Record<string, AnyFunction>;

/**
 * ModuleOptions Type represents a generic module options object.
 */
export type ModuleOptions = Record<string, any>;

/**
 * Module Type represents the module configuration.
 * It is a pluggable piece of code in a standalone package.
 * Module can be a subject of interceptors, overrides and extensions.
 */
export type Module = {
  /**
   * Connector returns all methods that are exposed by the module.
   * Each method must be an asynchronous function.
   * The connector is called only once when the module is initialized.
   * It can be used to create proxies for the methods.
   */
  connector: Connector;
  /**
   * Small pieces of code that can be used by the module and external packages.
   * Utils functions can be asynchronous or synchronous.
   * Functions should be small and reusable.
   */
  utils?: Record<string, any>;
  /**
   * Subscribers are declarative callbacks that are called when an event is emitted.
   * Subscribers mustn't modify the arguments or return any value.
   *
   * @see Subscribers
   *
   * @example
   * Registering a subscriber for the event MyModule_Method1_before.
   *
   *```typescript
   * const subscribers: Subscribers = {
   *  MyModule_Method1_before: (args) => {
   *    // do something with the arguments
   *    console.log('MyModule_Method1_before input arguments', args);
   *  }
   *```
   */
  subscribers?: Subscribers;
  context?: Record<string, any>;
};

/**
 * ModuleOverride Type prevents from creating an override with
 * a signature different from the existing SDK method.
 */
type ModuleOverride<OverriddenConnector> = {
  [K in keyof OverriddenConnector]?: OverriddenConnector[K];
};

/**
 * Extension Type represents the extension configuration.
 * It provides extensibility mechanisms like interceptors, extensions, overrides, and pub/sub manager.
 */
export type Extension<ExtendedModule extends Module = Module> = Omit<
  Partial<Module>,
  "connector" | "context"
> & {
  /**
   * Extend contains methods that are added to the module.
   * Because of the dynamic nature of the SDK, the extend method must be an asynchronous function.
   *
   * @example
   * Extending the module with a new method.
   * ```typescript
   * import { SAPCCModuleType } from "@vsf-enterprise/sapcc-sdk";
   *
   * const extension: Extension<SAPCCModuleType> = {
   *  extend: {
   *   getBlueProducts: async () => {
   *     const products = await client.getProducts({ color: 'blue'});
   *   }
   *  }
   * }
   * ```
   * Such function will be available in the SDK API under the module namespace.
   * ```typescript
   * sdk.mymodule.getBlueProducts();
   * ```
   */
  extend?: Record<string, AnyFunction>;
  /**
   * Override contains methods that are replaced in the module.
   * Because of the dynamic nature of the SDK, the override method must be an asynchronous function.
   * Override function must fulfill the same interface as the original method.
   * Providing generic types for the function is recommended to preserve the original method signature.
   *
   * @example
   * Overriding the module method.
   * Assume that the module has a method called getProducts.
   *
   * ```typescript
   * import { SAPCCModuleType } from "@vsf-enterprise/sapcc-sdk";
   *
   * const extension: Extension<SAPCCModuleType> = {
   * override: {
   *  getProducts: async (args: Parameters<getProducts>): ReturnType<getProducts> => {
   *     const products = await client.getProducts({ color: 'blue'});
   *     // Execute some logic that the original method doesn't have.
   *     return products;
   *  }
   * }
   * ```
   */
  override?: ModuleOverride<ExtendedModule["connector"]>;
  /**
   * Interceptors are functions that are called before, after or around the method
   * and can be used to modify the input and output of the method but also
   * to add logging, validation, error handling, etc.
   * Each interceptor must be an asynchronous function.
   * Each interceptor must fulfill the same interface as the original method.
   *
   * @see InterceptorsConfig
   */
  interceptors?: Array<InterceptorsConfig>;
};

/**
 * SDKConfig represents the configuration and the API of the SDK.
 */
export type SDKConfig = Readonly<
  Record<string, Module> & Record<string, Extension<Module>>
>;

/**
 * ModuleInitializer Type represents a function accepting optional module options
 * as an argument and returning the actual module.
 */
export type ModuleInitializer<
  InitializedModule extends Module,
  Options extends ModuleOptions
> = (options?: Options) => InitializedModule;

/**
 * StrictModuleInitializer Type represents a function accepting mandatory module options
 * as an argument and returning the actual module.
 */
export type ModuleInitializerWithMandatoryOptions<
  InitializedModule extends Module,
  Options extends ModuleOptions
> = (options: Options) => InitializedModule;

/**
 * ExtensionInitializer Type represents a function accepting extension options
 * as an argument and returning the actual extension.
 */
export type ExtensionInitializer<
  ExtendedModule extends Module,
  InitializedExtension extends Extension<ExtendedModule>,
  Options extends ModuleOptions
> = (
  options?: Options,
  parent?: {
    methods: ExtendedModule["connector"];
    context?: ExtendedModule["context"];
  }
) => InitializedExtension;

/**
 * SDKApi represents the API of the SDK.
 * On the init SDK transform configuration data to compose an API and apply interceptors
 * to all methods. This requires a dynamic type mapping to provide the user
 * with the best possible developer experience.
 *
 * The following type map understand the SDK configuration input and produce
 * usable SDK api with all type hints.
 */

export type SDKApi<Config extends SDKConfig> = {
  [ExtensionName in keyof Config]: Config[ExtensionName]["extend"] &
    Omit<
      Config[ExtensionName]["override"],
      keyof Config[ExtensionName]["extend"]
    > &
    Omit<
      Config[ExtensionName]["connector"],
      keyof Config[ExtensionName]["override"] &
        keyof Config[ExtensionName]["extend"]
    >;
} & {
  +readonly [ExtensionName in keyof Config]: {
    utils: {
      +readonly [Method in keyof Config[ExtensionName]["utils"]]: Config[ExtensionName]["utils"][Method];
    };
  };
};
