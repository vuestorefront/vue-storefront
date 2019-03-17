import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import { entityKeyName } from '@vue-storefront/core/store/lib/entities'
import TaxState from '../../types/TaxState'
import { Logger } from '@vue-storefront/core/lib/logger'

const mutations: MutationTree<TaxState> = {
  [types.TAX_UPDATE_RULES] (state, taxClasses) {
    const cache = Vue.prototype.$db.elasticCacheCollection
    for (let tc of taxClasses.items) { // we store each product separately in cache to have offline acces for products/single method
      const cacheKey = entityKeyName('tc', tc.id)
      cache.setItem(cacheKey, tc).catch((err) => {
        Logger.error('Cannot store cache for ' + cacheKey + ', ' + err)()
      })
    }
    state.rules = taxClasses.items // extract fields from ES _source
  }
}

export default mutations
