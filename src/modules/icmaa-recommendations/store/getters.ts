import { GetterTree } from 'vuex'
import RecommendationsState, { Recommendations } from '../types/RecommendationsState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<RecommendationsState, RootState> = {
  getList: (state): Recommendations[] => state.list,
  getRules: (state, getters, RootState, rootGetters) => (identifier: string = 'recommendations'): Record<string, any> => {
    return rootGetters['icmaaCmsBlock/getJsonBlockByIdentifier'](identifier)
  },
  getByTypeAndProductId: (state, getters) => (productId: string, type: string): Recommendations =>
    getters.getList.find(r => r.productId === productId && r.type === type)
}

export default getters
