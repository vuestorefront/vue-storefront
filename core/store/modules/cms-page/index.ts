import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from "../../types/RootState"
import CmsPageState from "./types/CmsPageState"

const cms_page: Module<CmsPageState, RootState> = {
  namespaced: true,
  state: {
    cmsPages: [],
  },
  getters,
  actions,
  mutations
}

export default cms_page
