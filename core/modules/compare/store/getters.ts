import { GetterTree } from 'vuex';
import RootState from '@vue-storefront/core/types/RootState';
import CompareState from '../types/CompareState';

const getters: GetterTree<CompareState, RootState> = {
  isEmpty: state => state.items.length === 0,
  isToCompare: state => product => state.items.find(p => p.sku === product.sku),
  isCompareLoaded: state => state.loaded,
  getCompareProductsCount: state => state.items.length
};

export default getters;
