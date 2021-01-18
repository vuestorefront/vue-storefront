import { integrationPluginFactory } from './../../utils';
import { CreateApiProxyFn, CreateApiClientFn } from './types';

interface ComposeParams {
  createApiClient?: CreateApiClientFn;
  createApiProxy?: CreateApiProxyFn;
  factoryParams: any;
}

export const compose = <T>(composeParams: ComposeParams) => {
  const { createApiClient, createApiProxy, factoryParams } = composeParams;
  const createFn = createApiClient || createApiProxy;
  (createFn as any).tag = factoryParams.tag;

  const integrationPlugin = integrationPluginFactory(createFn);
  const name = createApiClient ? 'createApiClient' : 'createApiProxy';

  return {
    [name]: createFn,
    integrationPlugin
  } as any as T;
};
