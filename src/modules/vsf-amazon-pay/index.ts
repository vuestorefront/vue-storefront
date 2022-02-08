import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { afterRegistration } from './hooks/afterRegistration'
import { module } from './store'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'
import config from 'config'

export const KEY = 'amazon-pay'
export const METHOD_CODE = config.amazonPay.backend_method_code || KEY

export const cacheStorage = initCacheStorage(KEY)

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [{ key: KEY, module }] },
  afterRegistration
}

export const AmazonPay = new VueStorefrontModule(moduleConfig)
