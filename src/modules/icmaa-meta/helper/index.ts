import config from 'config'
import { currentStoreView, StoreView } from '@vue-storefront/core/lib/multistore'
import defaultsDeep from 'lodash-es/defaultsDeep'

import ConfigMutator, { ExtendedMetaInfo } from './ConfigMutator'
import { MetaInfo } from 'vue-meta'

export const store: Function = (): StoreView => currentStoreView()
export const storeCode: Function = (): string => store().storeCode || config.i18n.defaultLanguage.toLowerCase()
export const storeLang: Function = (): string => store().i18n.defaultLocale || config.i18n.defaultLocale

export let mergeWithDefaults: any = (defaults: MetaInfo, config: ExtendedMetaInfo) => {
  const { add, update, remove } = config

  delete config.add
  delete config.update
  delete config.remove

  defaultsDeep(defaults, config)

  const mutator = new ConfigMutator(defaults)
  mutator.apply({ add, update, remove })

  return defaults
}
