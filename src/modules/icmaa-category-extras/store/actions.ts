import config from 'config'
import { ActionTree } from 'vuex'

import RootState from '@vue-storefront/core/types/RootState'
import CategoryExtrasState, { CategoryExtrasContentHeader } from '../types/CategoryExtrasState'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'
import * as types from './mutation-types'

import { DataResolver } from '@vue-storefront/core/data-resolver/types/DataResolver'
import { fetchChildCategories } from 'icmaa-category/helpers'
import { icmaa_categoryextras } from 'config'
import { categoryExtrasStateKey } from './index'
import CmsService from 'icmaa-cms/data-resolver/CmsService'
import Task from '@vue-storefront/core/lib/sync/types/Task'

import { Logger } from '@vue-storefront/core/lib/logger'

const actions: ActionTree<CategoryExtrasState, RootState> = {
  async loadCategoryWithExtras ({ dispatch, getters }, categorySearchOptions: DataResolver.CategorySearchOptions): Promise<Category> {
    categorySearchOptions.includeFields = config.entities.category.includeFields.concat(config.icmaa_cms.categoryExtras.categoryAttributes)
    return dispatch('category-next/loadCategory', categorySearchOptions, { root: true })
  },
  loadDepartmentChildCategoryIdMap: async (context): Promise<void> => {
    const parentId: number[] = icmaa_categoryextras.parentDepartmentCategoryIds || []
    return context.dispatch('loadChildCategoryIdMap', parentId)
  },
  loadChildCategoryIdMap: async (context, parentId: number[]): Promise<void> => {
    const childCategories: Category[]|void = await fetchChildCategories({ parentId, level: 10, onlyShowTargetLevelItems: false })
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
        children[categoryParentId].push({
          id: category.id,
          url_key: category.url_key
        })
      }
    })

    let childrenArray = []
    for (const parentId in children) {
      childrenArray.push({
        parentId: parseInt(parentId), children: children[parentId]
      })
    }

    context.commit(types.ICMAA_CATEGORY_EXTRAS_CHILDCATEGORIES_ADD, childrenArray)
  },
  loadContentHeader: async ({ commit }, identifier: string): Promise<CategoryExtrasContentHeader|any[]> => {
    const documentType = 'category-extras'
    return CmsService.singleQueue({ documentType, uid: identifier, actionName: `${categoryExtrasStateKey}/syncContentHeader` })
  },
  syncContentHeader: async ({ commit }, task: Task): Promise<CategoryExtrasContentHeader|any[]> => {
    const { result, resultCode } = task
    if (resultCode === 200 && result.contentHeader) {
      const payload: CategoryExtrasContentHeader = result.contentHeader
      const identifier: string = result.identifier
      commit(types.ICMAA_CATEGORY_EXTRAS_CONTENT_HEADER_ADD, { identifier, payload })
      return payload
    }

    return []
  }
}

export default actions
