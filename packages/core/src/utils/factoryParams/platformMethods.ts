import { Logger } from '../logger';

const createPlatformMethod = (context, refs, functionObject) => async (params) => {
  const { mainRef, loading, error, alias } = refs;
  try {
    loading.value = true;
    mainRef.value = await functionObject.fn(
      context,
      { ...params, [alias]: mainRef.value }
    );
    loading.value = false;
  } catch (err) {
    error.value[functionObject.fnName] = err;
    Logger.error(`api.${functionObject.fnName}`, err);
  } finally {
    loading.value = false;
  }
};

const createFactoryParamsReducer = (context, refs) => (prev, [fnName, fn]: any) => ({
  ...prev,
  [fnName]: createPlatformMethod(context, refs, { fnName, fn })
});

const createPlatformMethods = (apiSection, context, refs) =>
  Object.entries(apiSection).reduce(createFactoryParamsReducer(context, refs), {});

export { createPlatformMethods };
