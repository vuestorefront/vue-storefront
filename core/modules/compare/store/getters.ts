import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CompareState from '../types/CompareState'

const getters: GetterTree<CompareState, RootState> = {
  isEmpty: state => state.items.length === 0,
  isOnCompare: state => product => state.items.some(p => p.sku === product.sku),
  isCompareLoaded: state => state.loaded,
  getCompareProductsCount: state => state.items.length,
  getCompareItems: state => state.items
}

export default getters
