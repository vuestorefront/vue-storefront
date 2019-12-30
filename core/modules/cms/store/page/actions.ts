import { ActionTree } from 'vuex'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState';
import CmsPageState from '../../types/CmsPageState'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { cmsPagesStorageKey } from './'
import { createPageLoadingQuery, createSinglePageLoadQuery } from '@vue-storefront/core/modules/cms/helpers'

const actions: ActionTree<CmsPageState, RootState> = {
  async list ({ commit }, { filterValues = null, filterField = 'identifier', size = 150, start = 0, excludeFields = null, includeFields = null, skipCache = false }) {
    let query = createPageLoadingQuery({ filterField, filterValues })
    const pageResponse = await quickSearchByQuery({ query, entityType: 'cms_page', excludeFields, includeFields })

    commit(types.CMS_PAGE_UPDATE_CMS_PAGES, pageResponse.items)
    return pageResponse.items
  },
  async single ({ getters, commit, dispatch }, { key = 'identifier', value, excludeFields = null, includeFields = null, skipCache = false, setCurrent = true }) {
    const currentItems = getters.findItems({ key, value })

    if (skipCache || !getters.hasItems || !currentItems) {
      const pageResponse = await quickSearchByQuery({
        query: createSinglePageLoadQuery({ key, value }),
        entityType: 'cms_page',
        excludeFields,
        includeFields
      })

      if (pageResponse && pageResponse.items && pageResponse.items.length > 0) {
        commit(types.CMS_PAGE_ADD_CMS_PAGE, pageResponse.items[0])
        if (setCurrent) commit(types.CMS_PAGE_SET_CURRENT, pageResponse.items[0])
        return pageResponse.items[0]
      }

      throw new Error('CMS query returned empty result')
    }

    if (currentItems) {
      if (setCurrent) {
        commit(types.CMS_PAGE_SET_CURRENT, currentItems)
      }
      return currentItems
    }
  },
  async loadFromCache ({ commit }, { key, value, setCurrent }) {
    const cmsStorage = StorageManager.get('cms')
    const storedItems = await cmsStorage.getItem(cmsPagesStorageKey)

    if (storedItems) {
      commit(types.CMS_PAGE_UPDATE_CMS_PAGES, storedItems)
      const resp = storedItems.find(p => p[key] === value)
      if (!resp) {
        throw new Error('CMS query returned empty result')
      }

      if (setCurrent) {
        commit(types.CMS_PAGE_SET_CURRENT, resp)
      }

      return resp
    }

    throw new Error('CMS query returned empty result')
  },
  addItem ({ commit }, page) {
    commit(types.CMS_PAGE_ADD_CMS_PAGE, page)
  }
}

export default actions
