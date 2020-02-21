import usePrismic from './composables/usePrismic';
import PrismicJS from 'prismic-javascript';
import { ApiOptions } from 'prismic-javascript/d.ts/Api';
import { getPages, getBlocks, getPageId, getSlices } from './helpers';

interface SetupConfig {
  endpoint: any;
  apiOptions?: ApiOptions;
}

const prismic = PrismicJS;
let apiOptions = null;
let endpoint = null;

const setup = (setupConfig: SetupConfig) => {
  apiOptions = setupConfig.apiOptions || null;
  endpoint = setupConfig.endpoint;

  return prismic.client(endpoint, apiOptions);
};

export {
  setup,
  prismic,
  apiOptions,
  endpoint,
  usePrismic,
  getPages,
  getBlocks,
  getSlices,
  getPageId
};
