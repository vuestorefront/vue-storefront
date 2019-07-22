import config from 'config'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import defaultsDeep from 'lodash-es/defaultsDeep'

import ConfigMutator, { ExtendedMetaInfo } from './ConfigMutator'
import { MetaInfo } from 'vue-meta'

export const storeCode: Function = (): string => currentStoreView().storeCode || config.i18n.defaultLanguage.toLowerCase()
export const storeLang: Function = (): string => currentStoreView().i18n.defaultLocale || config.i18n.defaultLocale

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
