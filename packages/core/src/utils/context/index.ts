import { Context, FactoryParams } from './../../types';

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

const createFactoryParamsMethod = (fn, fnName, context) => (argObj) => {
  const blackList = ['provide'];

  if (blackList.includes(fnName)) {
    return fn(context);
  }

  return fn(context, argObj);
};

const createFactoryParamsReducer = (context) => (prev, [fnName, fn]: any) => ({
  ...prev,
  [fnName]: createFactoryParamsMethod(fn, fnName, context)
});

const configureFactoryParams = <T extends FactoryParams>(factoryParams: T): any =>
  Object.entries(factoryParams)
    .reduce(
      createFactoryParamsReducer(generateContext(factoryParams)
      ), {});

export {
  generateContext,
  useVSFContext,
  configureContext,
  configureFactoryParams
};
