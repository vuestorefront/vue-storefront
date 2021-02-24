import { Context, FactoryParams } from './../../types';

interface ContextConfiguration {
  useVSFContext: () => Context;
}

let useVSFContext = () => ({}) as Context;

const configureContext = (config: ContextConfiguration) => {
  useVSFContext = config.useVSFContext || useVSFContext;
};

/**
 * We have a control of given arguments to the factory params functions.
 * As they are given as object, we can easily attach a private/integnal flags.
 */
const configureArguments = (args) => {
  if (args?.customQuery) {
    args.customQuery._q = true;
  }

  return args;
};

const configureFactoryParams = <T extends FactoryParams>(factoryParams: T): any => {
  const vsfContext = useVSFContext();
  const balckList = ['provide'];

  const scopedContext = factoryParams.provide
    ? { ...vsfContext.$vsf, ...factoryParams.provide(vsfContext.$vsf) }
    : vsfContext.$vsf;

  return Object.entries(factoryParams)
    .reduce((prev, [fnName, fn]: any) => ({
      ...prev,
      [fnName]: (argObj) => {
        if (balckList.includes(fnName)) {
          return fn(scopedContext);
        }

        return fn(scopedContext, configureArguments(argObj));
      }
    }), {});
};

// deprecated
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
  configureFactoryParams
};
