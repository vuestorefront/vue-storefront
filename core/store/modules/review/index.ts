import { Module } from 'vuex'
import actions from './actions'
import ReviewState from "core/store/modules/review/types/ReviewState";
import RootState from "core/store/types/RootState";
import mutations from "core/store/modules/review/mutations";
import getters from "core/store/modules/review/getters";

const review: Module<ReviewState, RootState> = {
  namespaced: true,
  state: {
    items: [],
  },
  getters,
  actions,
  mutations
}

export default review
