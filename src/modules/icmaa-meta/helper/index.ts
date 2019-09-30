import defaultsDeep from 'lodash-es/defaultsDeep'

import ConfigMutator, { ExtendedMetaInfo } from './ConfigMutator'
import { MetaInfo } from 'vue-meta'

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
