import { ApiClientFactoryParams, ApiClientConfig, ApiInstance, ApiClientFactory, ApiClientExtension } from './../types';
import { Logger } from './../utils';

interface ApplyingContextHooks {
  before: ({ callName, args }) => any[];
  after: ({ callName, args, response }) => any;
}

const isFn = (x) => typeof x === 'function';

const nopBefore = ({ args }) => args;
const nopAfter = ({ response }) => response;

const createQueryFactory = (context, args) => (defaults) => {
  const customQueries = context.queries;
  const queryArgs = args.find(a => a?._q) || {};

  return Object.entries(defaults)
    .reduce((prev, [queryName, initialArgs]: any) => {
      const queryFn = customQueries[queryArgs[queryName]] || (() => initialArgs);

      return {
        ...prev,
        [queryName]: queryFn(initialArgs)
      };
    }, {});
};

const applyContextToApi = (
  api: Record<string, Function>,
  context: any,

  /**
   * By default we use NOP function for returning the same parameters as they come.
   * It's useful in extensions, when someone don't want to inject into changing arguments or the response,
   * in that case, we use default function, to handle that scenario - NOP
   */
  hooks: ApplyingContextHooks = { before: nopBefore, after: nopAfter }
) =>
  Object.entries(api)
    .reduce((prev, [callName, fn]: any) => ({
      ...prev,
      [callName]: async (...args) => {
        const createQuery = createQueryFactory(context, args);
        const transformedArgs = hooks.before({ callName, args });
        const apiClientContext = { ...context, createQuery };
        const response = await fn(apiClientContext, ...transformedArgs);
        const transformedResponse = hooks.after({ callName, args, response });

        return transformedResponse;
      }
    }), {});

const apiClientFactory = <ALL_SETTINGS extends ApiClientConfig, ALL_FUNCTIONS>(factoryParams: ApiClientFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>): ApiClientFactory => {
  function createApiClient (config: any, customApi: any = {}): ApiInstance {
    const rawExtensions: ApiClientExtension[] = this?.middleware?.extensions || [];
    const lifecycles = Object.values(rawExtensions)
      .filter(ext => isFn(ext.hooks))
      .map(({ hooks }) => hooks(this?.middleware?.req, this?.middleware?.res));
    const extendedApis = Object.keys(rawExtensions)
      .reduce((prev, curr) => ({ ...prev, ...rawExtensions[curr].extendApiMethods }), customApi);

    const _config = lifecycles
      .filter(ext => isFn(ext.beforeCreate))
      .reduce((prev, curr) => curr.beforeCreate({ configuration: prev }), config);

    const settings = factoryParams.onCreate ? factoryParams.onCreate(_config) : { config, client: config.client };

    Logger.debug('apiClientFactory.create', settings);

    settings.config = lifecycles
      .filter(ext => isFn(ext.afterCreate))
      .reduce((prev, curr) => curr.afterCreate({ configuration: prev }), settings.config);

    const extensionHooks = {
      before: (params) => lifecycles
        .filter(e => isFn(e.beforeCall))
        .reduce((args, e) => e.beforeCall({ ...params, configuration: settings.config, args}), params.args),
      after: (params) => lifecycles
        .filter(e => isFn(e.afterCall))
        .reduce((response, e) => e.afterCall({ ...params, configuration: settings.config, response }), params.response)
    };

    const api = applyContextToApi(
      { ...factoryParams.api, ...extendedApis },
      { ...settings, ...this?.middleware || {} },
      extensionHooks
    );

    return {
      api,
      client: settings.client,
      settings: settings.config
    };
  }

  (createApiClient as any)._predefinedExtensions = factoryParams.extensions || [];

  return { createApiClient };
};

export { apiClientFactory };
