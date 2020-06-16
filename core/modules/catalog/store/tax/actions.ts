import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { SearchQuery } from 'storefront-query-builder'
import RootState from '@vue-storefront/core/types/RootState'
import TaxState from '../../types/TaxState'
import { Logger } from '@vue-storefront/core/lib/logger'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { entityKeyName } from '@vue-storefront/core/lib/store/entities'
import config from 'config'
import { calculateProductTax } from '@vue-storefront/core/modules/catalog/helpers/taxCalc'
import { doPlatformPricesSync } from '@vue-storefront/core/modules/catalog/helpers'
import { catalogHooksExecutors } from './../../hooks'
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

const actions: ActionTree<TaxState, RootState> = {
  async list ({ state, commit, dispatch }, { entityType = 'taxrule' }) {
    if (state.rules.length > 0) {
      Logger.info('Tax rules served from local memory', 'tax')()
      return { items: state.rules }
    }

    const resp = await quickSearchByQuery({ query: new SearchQuery(), entityType })
    dispatch('storeToRulesCache', { items: resp.items })
    commit(types.TAX_UPDATE_RULES, resp)

    return resp
  },
  storeToRulesCache (context, { items }) {
    const cache = StorageManager.get('elasticCache')

    for (let tc of items) {
      const cacheKey = entityKeyName('tc', tc.id)
      cache.setItem(cacheKey, tc).catch((err) => {
        Logger.error('Cannot store cache for ' + cacheKey + ', ' + err)()
      })
    }
  },
  single ({ getters }, { productTaxClassId }) {
    return getters.getRules.find((e) =>
      e.product_tax_class_ids.indexOf(parseInt(productTaxClassId)) >= 0
    )
  },
  async calculateTaxes ({ dispatch, getters, rootState }, { products }) {
    const mutatedProducts = catalogHooksExecutors.beforeTaxesCalculated(products)

    if (config.tax.calculateServerSide) {
      Logger.debug('Taxes calculated server side, skipping')()
      return doPlatformPricesSync(mutatedProducts)
    }

    let storeView = currentStoreView()

    const tcs = await dispatch('list', {})
    const {
      defaultCountry,
      defaultRegion,
      sourcePriceIncludesTax,
      finalPriceIncludesTax,
      deprecatedPriceFieldsSupport
    } = storeView.tax

    const recalculatedProducts = mutatedProducts.map(product =>
      calculateProductTax({
        product,
        taxClasses: tcs.items,
        taxCountry: defaultCountry,
        taxRegion: defaultRegion,
        finalPriceInclTax: finalPriceIncludesTax,
        sourcePriceInclTax: sourcePriceIncludesTax,
        userGroupId: getters.getUserTaxGroupId,
        deprecatedPriceFieldsSupport: deprecatedPriceFieldsSupport,
        isTaxWithUserGroupIsActive: getters.getIsUserGroupedTaxActive
      })
    )

    return doPlatformPricesSync(recalculatedProducts)
  }
}

export default actions
