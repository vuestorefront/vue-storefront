import usePrismic from './composables/usePrismic';
import PrismicJS from 'prismic-javascript';
import { ApiOptions } from 'prismic-javascript/d.ts/Api';
import { getPages, getBlocks, getPageId, getSlices } from './helpers';
import { TransformBlock } from './types';
import { transformBlock as defaultTransformFunction } from './helpers/_utils';

interface SetupConfig {
  endpoint: any;
  apiOptions?: ApiOptions;
  transform?: TransformBlock;
}

const prismic = PrismicJS;
let apiOptions = null;
let endpoint = null;
let transform = defaultTransformFunction;

const setup = (setupConfig: SetupConfig) => {
  apiOptions = setupConfig.apiOptions || null;
  endpoint = setupConfig.endpoint;
  transform = setupConfig.transform || defaultTransformFunction;

  return prismic.client(endpoint, apiOptions);
};

export {
  setup,
  prismic,
  transform,
  apiOptions,
  endpoint,
  usePrismic,
  getPages,
  getBlocks,
  getSlices,
  getPageId
};
