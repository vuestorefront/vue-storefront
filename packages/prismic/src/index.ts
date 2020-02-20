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
const linkResolver = null;
const htmlSerializer = null;
let endpoint = null;

const setup = (setupConfig: SetupConfig) => {
  apiOptions = setupConfig ? setupConfig.apiOptions || null : null;
  endpoint = setupConfig ? setupConfig.endpoint || null : null;

  return prismic.client(setupConfig.endpoint, setupConfig.apiOptions)
}

export {
  setup,
  prismic,
  apiOptions,
  linkResolver,
  htmlSerializer,
  endpoint,
  usePrismic,
  getPages,
  getBlocks,
  getSlices,
  getPageId
};
