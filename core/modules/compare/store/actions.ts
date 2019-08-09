import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import { htmlDecode } from '@vue-storefront/core/store/lib/filters'
import i18n from '@vue-storefront/i18n'
import rootStore from '@vue-storefront/core/store'
import RootState from '@vue-storefront/core/types/RootState'
import CompareState from '../types/CompareState'
import { cacheStorage } from '../'
import { Logger } from '@vue-storefront/core/lib/logger'
const actions: ActionTree<CompareState, RootState> = {
  load ({ commit, getters }, force: boolean = false) {
    if (!force && getters.isCompareLoaded) return
    commit(types.SET_COMPARE_LOADED)
    cacheStorage.getItem('current-compare', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.COMPARE_LOAD_COMPARE, storedItems)
      Logger.info('Compare state loaded from browser cache: ', 'cache', storedItems)()
    })
  },
  addItem ({commit}, product) {
    commit(types.COMPARE_ADD_ITEM, {product})
    rootStore.dispatch('notification/spawnNotification', {
      type: 'success',
      message: i18n.t('Product {productName} has been added to the compare!', { productName: htmlDecode(product.name) }),
      action1: { label: i18n.t('OK') }
    })
  },
  removeItem ({commit}, product) {
    commit(types.COMPARE_DEL_ITEM, {product})
    rootStore.dispatch('notification/spawnNotification', {
      type: 'success',
      message: i18n.t('Product {productName} has been removed from compare!', { productName: htmlDecode(product.name) }),
      action1: { label: i18n.t('OK') }
    })
  },
  clear ({commit}) {
    commit(types.COMPARE_LOAD_COMPARE, [])
  }
}

export default actions
