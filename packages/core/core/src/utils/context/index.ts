import { Context } from './../../types';

interface ContextConfiguration {
  useContext: () => Context;
}

let useContext = () => ({}) as Context;

const configureContext = (config: ContextConfiguration) => {
  useContext = config.useContext || useContext;
};

const generateContext = (factoryParams) => {
  const context = useContext();

  if (factoryParams.setup) {
    const generatedSetup = factoryParams.setup();

    return { ...context, ...generatedSetup };
  }

  return context;
};

export {
  generateContext,
  useContext,
  configureContext
};
