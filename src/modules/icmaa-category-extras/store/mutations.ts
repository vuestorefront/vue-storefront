import { MutationTree } from 'vuex'
import { mutationsFactory } from 'icmaa-cms/store/abstract/mutations'
import * as types from './mutation-types'
import CategoryExtrasState from '../types/CategoryExtrasState'

const mutations: MutationTree<CategoryExtrasState> = {
  ...mutationsFactory({
    add: types.ICMAA_CATEGORY_EXTRAS_ADD,
    upd: types.ICMAA_CATEGORY_EXTRAS_UPD,
    rmv: types.ICMAA_CATEGORY_EXTRAS_RMV
  }),
  [types.ICMAA_CATEGORY_EXTRAS_CHILDCATEGORIES_ADD] (state, categories) {
    const existingCategories = state.childCategoryIdMap.map(c => c.parentId)
    categories = categories.filter(c => !existingCategories.includes(c.parentId))
    state.childCategoryIdMap = [...state.childCategoryIdMap, ...categories]
  },
  [types.ICMAA_CATEGORY_EXTRAS_DEPARTMENTLOGOS_ADD] (state, logos) {
    state.departmentLogos = logos
  }
}

export default mutations
