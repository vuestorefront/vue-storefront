import usePrismic from './composables/usePrismic'
import PrismicJS from 'prismic-javascript'
import { ApiOptions } from 'prismic-javascript/d.ts/Api';
import { getPages, getBlocks, getPageId, getSlices } from './helpers'

interface SetupConfig {
  endpoint: any
  apiOptions?: ApiOptions
}

let prismic = PrismicJS
let apiOptions = null
let linkResolver = null
let htmlSerializer = null
let endpoint = null

const setup = (setupConfig: SetupConfig) => {
  apiOptions = setupConfig ? setupConfig.apiOptions || null : null
  endpoint = setupConfig ? setupConfig.endpoint || null : null

  prismic.client(setupConfig.endpoint, setupConfig.apiOptions)

  return prismic
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
}
