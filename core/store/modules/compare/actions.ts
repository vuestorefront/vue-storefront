import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from '../../mutation-types'
import { htmlDecode } from '../../lib/filters'
import i18n from '@vue-storefront/i18n'
import rootStore from '@vue-storefront/store'
import RootState from '../../types/RootState'
import CompareState from './types/CompareState'

const actions: ActionTree<CompareState, RootState> = {
  load (context) {
    const commit = context.commit
    Vue.prototype.$db.compareCollection.getItem('current-compare', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.COMPARE_LOAD_COMPARE, storedItems)
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
  }
}

export default actions
