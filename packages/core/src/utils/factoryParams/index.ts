import { generateContext } from '../context';
import { createCommonMethods } from './commonMethods';
import { createPlatformMethods } from './platformMethods';

const configureFactoryParams = (factoryParams, refs = null): any => {
  const context = generateContext(factoryParams);
  const { api, ...methods } = factoryParams;

  const commonMethods = createCommonMethods(methods, context);
  const platformMethods = refs ? createPlatformMethods(api || {}, context, refs) : {};

  return { ...commonMethods, api: platformMethods };
};

export { configureFactoryParams };
