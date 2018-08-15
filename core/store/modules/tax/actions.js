import * as types from '../../mutation-types'
import { quickSearchByQuery } from '../../lib/search/search'
import SearchQuery from 'core/store/lib/search/searchQuery'

export default {
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
      // removed builder()
      const searchQuery = new SearchQuery()
      return quickSearchByQuery({ searchQuery: searchQuery, entityType }).then((resp) => {
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
