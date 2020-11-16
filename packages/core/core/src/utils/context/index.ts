import { BaseFactoryParams, Context } from './../../types';

interface ContextConfiguration {
  useContext: () => Context;
}

let useContext = (): Context => ({ $vsf: {} });

const configureContext = (config: ContextConfiguration) => {
  useContext = config.useContext || useContext;
};

const createFactoryParams = <T extends BaseFactoryParams>(factoryParams: T): T => {
  const context = useContext();

  if (!factoryParams.api) {
    return { ...factoryParams, $vsf: context.$vsf } as T;
  }

  const api = Object.entries(factoryParams.api)
    .reduce((prev, [key, fn]) => {
      return {
        // @ts-ignore
        ...prev, [key]: fn.raw.bind(context)
      };
    }, {}) as T;

  return {
    ...factoryParams,
    $vsf: context.$vsf,
    api
  } as T;
};

const registerIntegration = (fn) => (ctx, inject) => {
  const configure = (config) => {
    const { tag, settings } = config;
    inject('vsf', { [tag]: settings });
  };

  return fn({ ...ctx, vsf: { configure } }, inject);
};

export {
  registerIntegration,
  createFactoryParams,
  useContext,
  configureContext
};
