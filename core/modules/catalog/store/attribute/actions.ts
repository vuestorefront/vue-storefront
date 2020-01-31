import * as types from './mutation-types'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import AttributeState from '../../types/AttributeState'
import RootState from '@vue-storefront/core/types/RootState'
import { ActionTree } from 'vuex'
import config from 'config'
import { Logger } from '@vue-storefront/core/lib/logger'
import { entityKeyName } from '@vue-storefront/core/lib/store/entities'
import { prefetchCachedAttributes } from '../../helpers/prefetchCachedAttributes'
import createAttributesListQuery from './../../helpers/createAttributesListQuery'
import reduceAttributesLists from './../../helpers/reduceAttributesLists'
import filterAttributes from '../../helpers/filterAttributes'

const actions: ActionTree<AttributeState, RootState> = {
  async updateAttributes ({ commit, getters }, { attributes }) {
    const idsList = getters.getAttributeListById
    const codesList = getters.getAttributeListByCode

    for (let attr of attributes) {
      if (attr && !config.attributes.disablePersistentAttributesCache) {
        const attrCollection = StorageManager.get('attributes')

        try {
          await attrCollection.setItem(entityKeyName('attribute_code', attr.attribute_code.toLowerCase()), attr)
          await attrCollection.setItem(entityKeyName('attribute_id', attr.attribute_id.toString()), attr)
        } catch (e) {
          Logger.error(e, 'mutations')()
        }
      }
    }

    commit(types.ATTRIBUTE_UPD_ATTRIBUTES, reduceAttributesLists({ codesList, idsList, attributes }))
  },
  async loadCachedAttributes ({ dispatch }, { filterField, filterValues }) {
    if (!filterValues) {
      return
    }

    const attributes = await prefetchCachedAttributes(filterField, filterValues)

    if (attributes) {
      await dispatch('updateAttributes', { attributes })
    }
  },
  updateBlacklist ({ commit, getters }, { filterValues, filterField, attributes }) {
    if (attributes && filterValues.length > 0) {
      const foundValues = attributes.map(attr => attr[filterField])
      const toBlackList = filterValues.filter(ofv => !foundValues.includes(ofv) && !getters.getBlacklist.includes(ofv))
      commit(types.ATTRIBUTE_UPD_BLACKLIST, toBlackList)
    }
  },
  /**
   * Load attributes with specific codes
   * @param {Object} context
   * @param {Array} attrCodes attribute codes to load
   */
  async list ({ getters, dispatch }, { filterValues = null, filterField = 'attribute_code', only_user_defined = false, only_visible = false, size = 150, start = 0, includeFields = config.entities.optimize ? config.entities.attribute.includeFields : null }) {
    const blacklist = getters.getBlacklist
    const idsList = getters.getAttributeListById
    const codesList = getters.getAttributeListByCode
    const orgFilterValues = filterValues || []

    await dispatch('loadCachedAttributes', { filterField, filterValues })

    filterValues = filterAttributes({ filterValues, filterField, blacklist, idsList, codesList })
    if (filterValues.length === 0) {
      Logger.info('Skipping attribute load - attributes already loaded', 'attr', { orgFilterValues, filterField })()
      return { items: Object.values(codesList) }
    }

    const query = createAttributesListQuery({
      filterValues,
      filterField,
      onlyDefinedByUser: only_user_defined,
      onlyVisible: only_visible
    })
    const resp = await quickSearchByQuery({ entityType: 'attribute', query, includeFields, start, size })
    const attributes = resp && orgFilterValues.length > 0 ? resp.items : null

    dispatch('updateBlacklist', { filterValues, filterField, attributes })
    await dispatch('updateAttributes', { attributes })

    return resp
  }
}

export default actions
