import { ActionTree } from 'vuex'
import * as types from '../../mutation-types'
import { quickSearchByQuery } from '../../lib/search/search'
import SearchQuery from 'core/store/lib/search/searchQuery'
import RootState from '../../types/RootState'
import TaxState from './types/TaxState'

const actions: ActionTree<TaxState, RootState> = {
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
      const searchQuery = new SearchQuery()
      return quickSearchByQuery({ query: searchQuery, entityType }).then((resp) => {
        context.commit(types.TAX_UPDATE_RULES, resp)
        return resp
      }).catch((err) => {
        console.error(err)
      })
    }
  },
  single (context, { productTaxClassId }) {
    return context.state.rules.find((e) => { return e.product_tax_class_ids.indexOf(parseInt(productTaxClassId)) >= 0 })
  }
}

export default actions
