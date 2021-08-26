import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import RecentlyViewedState from '../types/RecentlyViewedState'
import { cacheStorage } from '../'

const actions: ActionTree<RecentlyViewedState, RootState> = {
  load ({ commit }) {
    cacheStorage.getItem('recently-viewed', (err, storedItems) => {
      if (err) throw new Error(err)
      commit(types.RECENTLY_VIEWED_LOAD, storedItems)
    })
  },
  addItem ({ commit }, product) {
    commit(types.RECENTLY_VIEWED_ADD_ITEM, { product })
  }
}

export default actions
