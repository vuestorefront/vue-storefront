import { Context } from './../../types';

interface ContextConfiguration {
  useVSFContext: () => Context;
}

let useVSFContext = () => ({}) as Context;

const configureContext = (config: ContextConfiguration) => {
  useVSFContext = config.useVSFContext || useVSFContext;
};

const composeApiWithContext = (api, context) =>
  Object.entries(api)
    .reduce((prev, [key, fn]: any) => ({
      ...prev,
      [key]: (...args) => fn(context, ...args)
    }), {});

const generateContext = (factoryParams) => {
  const context = useVSFContext();

  if (factoryParams.setup) {
    const generatedSetup = factoryParams.setup();

    return { ...context.$vsf, ...generatedSetup };
  }

  return context.$vsf;
};

export {
  generateContext,
  useVSFContext,
  configureContext,
  composeApiWithContext
};
