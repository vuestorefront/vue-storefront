import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import RecommendationsState, { Recommendations } from '../types/RecommendationsState'

const mutations: MutationTree<RecommendationsState> = {
  [types.ICMAA_RECOMMENDATIONS_ADD] (state, payload: Recommendations) {
    let list: Recommendations = state.list.find(i => i.productId === payload.productId && i.type === payload.type)
    if (list) {
      const newProductids = payload.products.map(p => p.id).filter(id => !list.products.map(p => p.id).includes(id))
      list.products.push(...payload.products.filter(p => newProductids.includes(p.id)))
      return
    }

    state.list.push(payload)
  }
}

export default mutations
