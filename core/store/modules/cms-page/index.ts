import { Module } from 'vuex'
import actions from './actions'
import RootState from "../../types/RootState"
import CmsPageState from "./types/CmsPageState"

const cms_page: Module<CmsPageState, RootState> = {
  namespaced: true,
  state: {
    cmsPages: [],
  },
  actions
}

export default cms_page
