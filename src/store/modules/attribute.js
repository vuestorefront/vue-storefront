import * as types from '../mutation-types'
const bodybuilder = require('bodybuilder')
import { entityKeyName } from '../../lib/entities'
import { quickSearchByQuery } from '../../api/search'

const state = {
  list_by_code: {},
  list_by_id: {},
  labels: {}
}

const getters = {
}

// actions
const actions = {
  /**
   * Load attributes with specific codes
   * @param {Object} context
   * @param {Array} attrCodes attribute codes to load
   */
  list (context, { filterValues = null, filterField = 'attribute_code', size = 150, start = 0 }) {
    const commit = context.commit

    let qrObj = bodybuilder()
    for (let value of filterValues) {
      qrObj = qrObj.orFilter('term', filterField, value)
    }

    return quickSearchByQuery({ entityType: 'attribute', query: qrObj.build() }).then(function (resp) {
      commit(types.ATTRIBUTE_UPD_ATTRIBUTES, resp)
    }).catch(function (err) {
      console.error(err)
    })
  }
}

// mutations
const mutations = {
  /**
   * Store attributes by code in state and localForage
   * @param {} state
   * @param {Array} attributes
   */
  [types.ATTRIBUTE_UPD_ATTRIBUTES] (state, attributes) {
    let attrList = attributes.items // extract fields from ES _source
    let attrHashByCode = state.list_by_code
    let attrHashById = state.list_by_id

    for (let attr of attrList) {
      attrHashByCode[attr.attribute_code] = attr
      attrHashById[attr.attribute_id] = attr

      const attrCollection = global.db.attributesCollection
      try {
        attrCollection.setItem(entityKeyName('attribute_code', attr.attribute_code.toLowerCase()), attr).catch((reason) => {
          console.debug(reason) // it doesn't work on SSR
        }) // populate cache by slug
        attrCollection.setItem(entityKeyName('attribute_id', attr.attribute_id.toString()), attr).catch((reason) => {
          console.debug(reason) // it doesn't work on SSR
        }) // populate cache by id
      } catch (e) {
        console.error(e)
      }
    }
    state.list_by_code = attrHashByCode
    state.list_by_id = attrHashById
    console.log(state.list_by_code)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

/**
 * Helper method for getting attribute name - TODO: to be moved to external/shared helper
 *
 * @param {String} attributeCode
 * @param {String} optionId - value to get label for
 */
export function optionLabel (state, { attributeKey, searchBy = 'code', optionId }) {
  let attrCache = state.labels[attributeKey]

  if (attrCache) {
    let label = attrCache[optionId]

    if (label) {
      return label
    }
  }
  let attr = state['list_by_' + searchBy][attributeKey]
  if (attr) {
    let opt = attr.options.find((op) => { // TODO: cache it in memory
      if (op.value === optionId.toString()) {
        return op
      }
    }) // TODO: i18n support with multi website attribute names

    if (opt) {
      if (!state.labels[attributeKey]) {
        state.labels[attributeKey] = {}
      }
      state.labels[attributeKey][optionId] = opt.label
      return opt ? opt.label : optionId
    } else {
      return optionId
    }
  } else {
    return optionId
  }
}
