import { Module } from 'vuex'
import actions from './actions'
import mutations from './mutations';
import RootState from '@vue-storefront/core/types/RootState';
import ReviewState from '../types/ReviewState';

export const reviewStore: Module<ReviewState, RootState> = {
  namespaced: true,
  state: {
    items: []
  },
  actions,
  mutations
}
