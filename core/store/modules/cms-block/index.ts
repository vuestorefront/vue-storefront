import { Module } from 'vuex'
import actions from './actions'
import RootState from "../../types/RootState"
import CmsBlockState from "./types/CmsBlockState"

const cms_block: Module<CmsBlockState, RootState> = {
  namespaced: true,
  state: {
    items: [],
  },
  actions
}

export default cms_block
