import { ActionTree } from 'vuex'
import { single as singleAbstract, list as listAbstract, MutationTypesInterface, SingleOptionsInterface, ListOptionsInterface } from 'icmaa-cms/store/abstract/actions'

import { categoryExtrasStorageKey as storageKey } from './'
import * as types from './mutation-types'
import CategoryExtrasState, { CategoryExtrasStateItem } from '../types/CategoryExtrasState'
import RootState from '@vue-storefront/core/types/RootState'
import { cacheStorage as cache } from 'icmaa-cms'

import { CategoryStateCategory } from 'icmaa-category/types/CategoryState'
import { fetchChildCategories } from 'icmaa-category/helpers'
import { icmaa_categoryextras } from 'config'

import config from 'config'
import Axios from 'axios'
import pick from 'lodash-es/pick'
import { processURLAddress } from '@vue-storefront/core/helpers'
import { getCurrentStoreCode } from 'icmaa-cms/helpers'
import { Logger } from '@vue-storefront/core/lib/logger'

const documentType = 'category-extras'
const mutationTypes: MutationTypesInterface = {
  add: types.ICMAA_CATEGORY_EXTRAS_ADD,
  upd: types.ICMAA_CATEGORY_EXTRAS_UPD,
  rmv: types.ICMAA_CATEGORY_EXTRAS_RMV
}

const actions: ActionTree<CategoryExtrasState, RootState> = {
  single: async (context, options: SingleOptionsInterface): Promise<CategoryExtrasStateItem> =>
    singleAbstract<CategoryExtrasStateItem>({ documentType, mutationTypes, storageKey, context, options }),
  list: async (context, options: ListOptionsInterface): Promise<CategoryExtrasStateItem[]> =>
    listAbstract<CategoryExtrasStateItem>({ documentType, mutationTypes, storageKey, context, options }),
  loadDepartmentChildCategoryIdMap: async (context): Promise<void> => {
    const parentId: number[] = icmaa_categoryextras.parentDepartmentCategoryIds || []
    return context.dispatch('loadChildCategoryIdMap', parentId)
  },
  loadChildCategoryIdMap: async (context, parentId: number[]): Promise<void> => {
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
  loadDepartmentLogos: async (context): Promise<void> => {
    const cacheKey = storageKey + '/department-logos'

    const cacheItem = await cache.getItem(cacheKey)
    if (cacheItem) {
      context.commit(types.ICMAA_CATEGORY_EXTRAS_DEPARTMENTLOGOS_ADD, cacheItem)
      return
    }

    const options = { has_logo: { 'in': true } }
    let params = {
      'type': documentType,
      'q': options,
      'lang': getCurrentStoreCode()
    }

    return Axios.get(
      processURLAddress(config.icmaa_cms.endpoint) + '/search',
      { responseType: 'json', params }
    ).then(resp => {
      let results = resp.data.result
      if (results.length === 0) {
        Logger.log(`No results found for :`, `icmaa-cms/${documentType}`, options)()
        return
      }

      results = results.map(r => pick(r, ['identifier', 'crossreferenceInLogoline', 'crossreferenceInProduct', 'customerCluster', 'genre']))

      context.commit(types.ICMAA_CATEGORY_EXTRAS_DEPARTMENTLOGOS_ADD, results)
      cache.setItem(cacheKey, results)
        .catch(error => Logger.error(error, 'icmaa-cms'))

      return results
    })
  }
}

export default actions
