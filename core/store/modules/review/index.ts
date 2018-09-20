import { Module } from 'vuex'
import actions from './actions'
import mutations from "./mutations";
import RootState from "../../types/RootState";
import ReviewState from "./types/ReviewState";

const review: Module<ReviewState, RootState> = {
  namespaced: true,
  state: {
    items: [],
  },
  actions,
  mutations
}

export default review
