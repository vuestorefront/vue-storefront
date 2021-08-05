const createFactoryParamsMethod = (fn, fnName, context) => (argObj) => {
  if (fnName === 'provide') {
    return fn(context);
  }

  return fn(context, argObj);
};

const createFactoryParamsReducer = (context) => (prev, [fnName, fn]: any) => ({
  ...prev,
  [fnName]: createFactoryParamsMethod(fn, fnName, context)
});

const createCommonMethods = (factoryParams, context) =>
  Object.entries(factoryParams)
    .reduce(createFactoryParamsReducer(context), {});

export { createCommonMethods };
