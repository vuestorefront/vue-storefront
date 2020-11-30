import { Context } from './../../types';

interface ContextConfiguration {
  useContext: () => Context;
}

let useContext = () => ({}) as Context;

const configureContext = (config: ContextConfiguration) => {
  useContext = config.useContext || useContext;
};

const composeApiWithContext = (api, context) =>
  Object.entries(api)
    .reduce((prev, [key, fn]: any) => ({
      ...prev,
      [key]: (...args) => fn(context, ...args)
    }), {});

const generateContext = (factoryParams) => {
  const context = useContext();

  if (factoryParams.setup) {
    const generatedSetup = factoryParams.setup();

    return { ...context, ...context.$vsf, ...generatedSetup };
  }

  return context;
};

export {
  generateContext,
  useContext,
  configureContext,
  composeApiWithContext
};
