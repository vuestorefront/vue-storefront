import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import CompareState from '../types/CompareState'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { Logger } from '@vue-storefront/core/lib/logger'
import { notifications } from '@vue-storefront/core/modules/compare/helpers'

const actions: ActionTree<CompareState, RootState> = {
  async load ({ commit, getters, dispatch }, force: boolean = false) {
    if (!force && getters.isCompareLoaded) return
    commit(types.SET_COMPARE_LOADED)
    const storedItems = await dispatch('getCurrentCompare')

    if (storedItems) {
      commit(types.COMPARE_LOAD_COMPARE, storedItems)
      Logger.info('Compare state loaded from browser cache: ', 'cache', storedItems)()
    }
  },
  async getCurrentCompare () {
    const cacheStorage = StorageManager.get('compare')
    return cacheStorage.getItem('current-compare')
  },
  addItem ({ commit, dispatch }, product) {
    commit(types.COMPARE_ADD_ITEM, { product })
    dispatch('notification/spawnNotification', notifications.productAddedToCompare(product.name), { root: true })
  },
  removeItem ({ commit, dispatch }, product) {
    commit(types.COMPARE_DEL_ITEM, { product })
    dispatch('notification/spawnNotification', notifications.productRemovedFromCompare(product.name), { root: true })
  },
  clear ({commit}) {
    commit(types.COMPARE_LOAD_COMPARE, [])
  }
}

export default actions
