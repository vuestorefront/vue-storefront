import { integrationPluginFactory } from './../../utils';
import { CreateApiProxyFn, CreateApiClientFn } from './types';

interface CreatorFunctions {
  createApiClient?: CreateApiClientFn;
  createApiProxy?: CreateApiProxyFn;
}

export const createApiInstance = <T>(creatorFunctions: CreatorFunctions, factoryParams: any) => {
  const { createApiClient, createApiProxy } = creatorFunctions;
  const createFn = createApiClient || createApiProxy;
  (createFn as any).tag = factoryParams.tag;

  const integrationPlugin = integrationPluginFactory(createFn);
  const name = createApiClient ? 'createApiClient' : 'createApiProxy';

  return {
    [name]: createFn,
    integrationPlugin
  } as any as T;
};
