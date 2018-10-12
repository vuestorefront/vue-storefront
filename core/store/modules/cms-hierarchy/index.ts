import { Module } from 'vuex'
import actions from './actions'
import RootState from "../../types/RootState"
import CmsHierarchyState from "./types/CmsHierarchyState"

const cms_hierachy: Module<CmsHierarchyState, RootState> = {
  namespaced: true,
  state: {
    items: [],
  },
  actions
}

export default cms_hierachy
