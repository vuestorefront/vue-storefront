import { Context } from './../../types';

interface ContextConfiguration {
  useVSFContext: () => Context;
}

let useVSFContext = () => ({}) as Context;

const configureContext = (config: ContextConfiguration) => {
  useVSFContext = config.useVSFContext || useVSFContext;
};

const NOP = (x) => x;
const applyContextToApi = (api, context, { before, after } = { before: NOP, after: NOP }) =>
  Object.entries(api)
    .reduce((prev, [key, fn]: any) => ({
      ...prev,
      [key]: async (...args) => after(await fn(context, ...before(args)))
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
  applyContextToApi
};
