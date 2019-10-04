import { ActionTree } from 'vuex'
import { single as singleAbstract, list as listAbstract, MutationTypesInterface, SingleOptionsInterface, ListOptionsInterface } from 'icmaa-cms/store/abstract/actions'

import { categoryExtrasStorageKey as storageKey } from './'
import * as types from './mutation-types'
import CategoryExtrasState, { CategoryExtrasStateItem } from '../types/CategoryExtrasState'
import RootState from '@vue-storefront/core/types/RootState'

import { CategoryStateCategory } from 'icmaa-category/types/CategoryState'
import { fetchChildCategories } from 'icmaa-category/helpers'
import { icmaa_cms } from 'config'

import { Logger } from '@vue-storefront/core/lib/logger'

const documentType = 'category-extras'
const mutationTypes: MutationTypesInterface = {
  add: types.ICMAA_CATEGORY_EXRTAS_ADD,
  upd: types.ICMAA_CATEGORY_EXRTAS_UPD,
  rmv: types.ICMAA_CATEGORY_EXRTAS_RMV
}

const actions: ActionTree<CategoryExtrasState, RootState> = {
  single: async (context, options: SingleOptionsInterface): Promise<CategoryExtrasStateItem> =>
    singleAbstract<CategoryExtrasStateItem>({ documentType, mutationTypes, storageKey, context, options }),
  list: async (context, options: ListOptionsInterface): Promise<CategoryExtrasStateItem> =>
    listAbstract<CategoryExtrasStateItem>({ documentType, mutationTypes, storageKey, context, options }),
  loadDepartmentChildCategoryIdMap: async (context): Promise<void> => {
    const parentId: number[] = icmaa_cms.categoryExtras.parentDepartmentCategoryIds || []
    const childCategories: CategoryStateCategory[]|void = await fetchChildCategories({ parentId, level: 10, onlyShowTargetLevelItems: false })
      .then(resp => resp)
      .catch(error => {
        Logger.error('Error while fetching children of category: ' + parentId, 'icmaaCategoryExtras', error)()
        return []
      })

    let children = {}
    childCategories.forEach(category => {
      const containsParentIdInPath = category.path.split('/').map(i => parseInt(i)).filter(id => parentId.includes(id))
      if (containsParentIdInPath.length > 0) {
        const categoryParentId = containsParentIdInPath[0]
        if (!children[categoryParentId]) {
          children[categoryParentId] = []
        }
        children[categoryParentId].push(category.id)
      }
    })

    context.commit(types.ICMAA_CATEGORY_EXRTAS_DEPARTMENT_CHILDCATEGORIES_ADD, children)
  }
}

export default actions
