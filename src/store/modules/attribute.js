import * as types from '../mutation-types'
const bodybuilder = require('bodybuilder')
import { entityKeyName } from '../../lib/entities'
import { quickSearchByQuery } from '../../api/search'

const state = {
  attributes: {},
  attributeLabels: {}
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
  list (context, { attrCodes = null, size = 150, start = 0 }) {
    const commit = context.commit

    let qrObj = bodybuilder()
    for (let attrCode of attrCodes) {
      qrObj = qrObj.orFilter('term', 'attribute_code', attrCode)
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
    let attrHash = {}

    for (let attr of attrList) {
      attrHash[attr.attribute_code] = attr

      const attrCollection = global.db.attributesCollection
      try {
        attrCollection.setItem(entityKeyName('attribute_code', attr.attribute_code.toLowerCase()), attr).catch((reason) => {
          console.debug(reason) // it doesn't work on SSR
        }) // populate cache by slug
      } catch (e) {
        console.error(e)
      }
    }
    state.attributes = attrHash
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
