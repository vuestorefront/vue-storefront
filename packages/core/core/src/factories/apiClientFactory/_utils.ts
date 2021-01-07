import { integrationPluginFactory } from './../../utils';

export const compose = ({ createApiClient, createApiProxy, factoryParams }: any) => {
  const createFn = createApiClient || createApiProxy;
  createFn.tag = factoryParams.tag;
  const integrationPlugin = integrationPluginFactory(createFn);
  const name = createApiClient ? 'createApiClient' : 'createApiProxy';

  return {
    [name]: createFn,
    integrationPlugin
  };
};
