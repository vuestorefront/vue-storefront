import { Context } from './../../types';

interface ContextConfiguration {
  useVSFContext: () => Context;
}

let useVSFContext = () => ({}) as Context;

const configureContext = (config: ContextConfiguration) => {
  useVSFContext = config.useVSFContext || useVSFContext;
};

const applyContextForApi = (api, context, extensions = []) =>
  Object.entries(api)
    .reduce((prev, [key, fn]: any) => ({
      ...prev,
      [key]: async (...args) => {
        const generatedArgs = extensions
          .filter(e => e.beforeCall)
          .reduce((prev, e) => e.beforeCall(prev), args);

        const resp = await fn(context, ...generatedArgs);

        const generatedResponse = extensions
          .filter(e => e.afterCall)
          .reduce((prev, e) => e.afterCall(prev), resp);

        return generatedResponse;
      }
    }), {});

const generateContext = (factoryParams) => {
  const context = useVSFContext();

  if (factoryParams.provide) {
    const generatedSetup = factoryParams.provide();

    return { ...context.$vsf, ...generatedSetup };
  }

  return context.$vsf;
};

export {
  generateContext,
  useVSFContext,
  configureContext,
  applyContextForApi
};
