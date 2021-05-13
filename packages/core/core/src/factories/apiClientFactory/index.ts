import {
  ApiClientFactoryParams,
  ApiClientConfig,
  ApiInstance,
  ApiClientFactory,
  ApiClientExtension,
  ApiClientExtensionHooks
} from './../../types';
import { Logger } from './../../utils';
import { applyContextToApi } from './context';

type Fn<A extends any [] = any [], B = any> = (...xs: A) => B;
type HooksNames = keyof ApiClientExtensionHooks;

const isFn = (x): x is Fn => typeof x === 'function';

const callWithProp = (prop: string, rest: any = {}) => (result: any, hook: any) =>
  isFn(hook)
    ? hook({...rest, [prop]: result})
    : result;

const callThenWithProp = (prop: string, rest: any = {}) => (result: any, hook: any) =>
  isFn(hook)
    ? result.then(result => hook({...rest, [prop]: result}))
    : result;

const handleHook = (hookName: HooksNames, call: Fn) => (result: any, next: ApiClientExtensionHooks) =>
  call(result, next[hookName]);

const apiClientFactory = <ALL_SETTINGS extends ApiClientConfig, ALL_FUNCTIONS>(factoryParams: ApiClientFactoryParams<ALL_SETTINGS, ALL_FUNCTIONS>): ApiClientFactory => {
  function createApiClient (config: any, customApi: any = {}): ApiInstance {
    const rawExtensions: ApiClientExtension[] = this?.middleware?.extensions || [];

    const lifecycles = Object.values(rawExtensions)
      .filter(ext => isFn(ext.hooks))
      .map(({ hooks }) => hooks(this?.middleware?.req, this?.middleware?.res));

    const extendedApis = Object.keys(rawExtensions)
      .reduce((prev, curr) => ({ ...prev, ...rawExtensions[curr].extendApiMethods }), customApi);

    const _config = lifecycles.reduce(
      handleHook('beforeCreate', callWithProp('configuration')),
      config
    );

    const settings = factoryParams.onCreate
      ? factoryParams.onCreate(_config)
      : { config, client: config.client };

    Logger.debug('apiClientFactory.create', settings);

    settings.config = lifecycles.reduce(
      handleHook('afterCreate', callWithProp('configuration')),
      config
    );

    const before = (params) => lifecycles
      .reduce(
        handleHook('beforeCall', callThenWithProp('args', {...params, configuration: settings.config})),
        Promise.resolve(params.args)
      );

    const after = (params) => lifecycles
      .reduce(
        handleHook('afterCall', callThenWithProp('response', {...params, configuration: settings.config})),
        Promise.resolve(params.response)
      );

    const api = applyContextToApi(
      { ...factoryParams.api, ...extendedApis },
      { ...settings, ...this?.middleware || {} },
      { before, after }
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
