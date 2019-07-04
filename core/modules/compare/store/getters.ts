import { GetterTree } from 'vuex';
import RootState from '@vue-storefront/core/types/RootState';
import CompareState from '../types/CompareState';

const getters: GetterTree<CompareState, RootState> = {
  isEmpty: state => state.items.length === 0,
  isCompareLoaded: state => state.loaded,
  isToCompare: state => product => state.items.find(p => p.sku === product.sku)
};

export default getters;
