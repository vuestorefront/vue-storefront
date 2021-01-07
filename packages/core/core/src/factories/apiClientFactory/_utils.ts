import { integrationPluginFactory } from './../../utils';

export const compose = ({ createApiClient, createApiProxy, factoryParams }: any) => {
  if (createApiClient) {
    createApiClient.tag = factoryParams.tag;
    const integrationPlugin = integrationPluginFactory(createApiClient);
    return { createApiClient, integrationPlugin };
  }

  createApiProxy.tag = factoryParams.tag;
  const integrationPlugin = integrationPluginFactory(createApiProxy);
  return { createApiProxy, integrationPlugin };
};
