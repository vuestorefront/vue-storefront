import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import CategoryListState, { ProductListingWidgetState } from '../types/CategoryState'

const mutations: MutationTree<CategoryListState> = {
  [types.ICMAA_CATEGORY_LIST_ADD_CATEGORY_LIST] (state, payload) {
    const item = state.lists.find(item => item.parent === payload.parent.id)
    if (!item) {
      payload.parent = payload.parent.id
      payload.list = payload.list.map(c => c.id)
      state.lists.push(payload)
    }
  },
  [types.ICMAA_CATEGORY_LIST_ADD_PRODUCT] (state, payload: ProductListingWidgetState) {
    let list = state.productListingWidget.find(i => i.parent === payload.parent)
    if (list) {
      const newProductids = payload.list.map(p => p.id).filter(id => !list.list.map(p => p.id).includes(id))
      list.list.push(...payload.list.filter(p => newProductids.includes(p.id)))
      return
    }
    state.productListingWidget.push(payload)
  }
}

export default mutations
