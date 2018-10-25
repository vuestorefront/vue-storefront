'use strict'
import store from '@vue-storefront/store'

export default class SearchAdapterFactory {
  getSearchAdapter (adapterName = '') {
    if (adapterName === '') {
      adapterName = store.state.config.server.api
    }

    const {SearchAdapter} = require(`./${adapterName}/searchAdapter`)

    if (!SearchAdapter) {
      throw new Error('Search adapter class is not provided')
    } else {
      let adapterInstance = new SearchAdapter()

      if (typeof adapterInstance.isValidFor === 'function' && typeof adapterInstance.search === 'function' && typeof adapterInstance.handleResult === 'function') {
        throw new Error('Not valid search adapter class provided. Search Adapter must have search() and handleResult() methods')
      }

      return adapterInstance
    }
  }
}
