import * as types from '../mutation-types'
import { quickSearchByQuery } from 'core/lib/search'
import { entityKeyName } from 'core/lib/entities'
import builder from 'bodybuilder'

const state = {
  rules: []
}

const getters = {
}

// actions
const actions = {
  /**
   * Load the tax rules
   */
  list (context, { entityType = 'taxrule' }) {
    if (context.state.rules.length > 0) {
      console.info('Tax rules served from local memory')
      return new Promise((resolve, reject) => {
        resolve({ items: context.state.rules })
      })
    } else {
      return quickSearchByQuery({ query: builder(), entityType }).then((resp) => {
        context.commit(types.TAX_UPDATE_RULES, resp)
        return resp
      }).catch(function (err) {
        console.error(err)
      })
    }
  },
  single (context, { productTaxClassId }) {
    return context.state.rules.find((e) => { return e.product_tax_class_ids.indexOf(parseInt(productTaxClassId)) >= 0 })
  }
}

// mutations
const mutations = {
  [types.TAX_UPDATE_RULES] (state, taxClasses) {
    const cache = global.db.elasticCacheCollection
    for (let tc of taxClasses.items) { // we store each product separately in cache to have offline acces for products/single method
      const cacheKey = entityKeyName('tc', tc.id)
      cache.setItem(cacheKey, tc).catch((err) => { console.error('Cannot store cache for ' + cacheKey + ', ' + err) })
    }
    state.rules = taxClasses.items // extract fields from ES _source
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
