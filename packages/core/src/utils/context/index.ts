import { Context } from '../../types';
interface ContextConfiguration {
  useVSFContext: () => Context;
}

let useVSFContext = () => ({}) as Context;

const configureContext = (config: ContextConfiguration) => {
  useVSFContext = config.useVSFContext || useVSFContext;
};

const generateContext = (factoryParams) => {
  const vsfContext = useVSFContext();

  if (factoryParams.provide) {
    return { ...vsfContext.$vsf, ...factoryParams.provide(vsfContext.$vsf) };
  }

  return vsfContext.$vsf;
};

export {
  generateContext,
  useVSFContext,
  configureContext
};
