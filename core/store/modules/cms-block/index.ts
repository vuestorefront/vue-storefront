import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from "../../types/RootState"
import CmsBlockState from "./types/CmsBlockState"

const cms_block: Module<CmsBlockState, RootState> = {
  namespaced: true,
  state: {
    cmsBlocks: [],
  },
  getters,
  actions,
  mutations
}

export default cms_block
