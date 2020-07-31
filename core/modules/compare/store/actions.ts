import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import CompareState from '../types/CompareState'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'

const actions: ActionTree<CompareState, RootState> = {
  async load ({ commit, getters, dispatch }, force: boolean = false) {
    if (force || !getters.isCompareLoaded) {
      commit(types.SET_COMPARE_LOADED)
      const storedItems = await dispatch('fetchCurrentCompare')

      if (storedItems) {
        commit(types.COMPARE_LOAD_COMPARE, storedItems)
        Logger.info('Compare state loaded from browser cache: ', 'cache', storedItems)()
      }

      if (config.entities.attribute.loadByAttributeMetadata) {
        dispatch(
          'attribute/loadProductAttributes',
          { products: getters.getCompareItems, merge: true },
          { root: true }
        )
      }
    }
  },
  async fetchCurrentCompare () {
    const cacheStorage = StorageManager.get('compare')
    return cacheStorage.getItem('current-compare')
  },
  async addItem ({ commit }, product) {
    commit(types.COMPARE_ADD_ITEM, { product })
  },
  async removeItem ({ commit }, product) {
    commit(types.COMPARE_DEL_ITEM, { product })
  },
  async clear ({ commit }) {
    commit(types.COMPARE_LOAD_COMPARE, [])
  }
}

export default actions
