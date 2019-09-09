import * as types from './mutation-types'
import { Logger } from '@vue-storefront/core/lib/logger'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

const watchedMutations = [types.COMPARE_ADD_ITEM, types.COMPARE_DEL_ITEM, types.COMPARE_LOAD_COMPARE]
const cacheStorage = StorageManager.get('compare')

const cachePersistPlugin = (mutation, state) => {
  const mutations = watchedMutations.map(m => `compare/${m}`)

  if (mutations.includes(mutation.type)) {
    cacheStorage.setItem('current-compare', state.compare.items).catch((reason) => {
      Logger.error(reason, 'compare')
    })
  }
}

export default cachePersistPlugin
