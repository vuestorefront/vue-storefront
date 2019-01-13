import { server } from 'config'

export const getSearchAdapter = async (adapterName = server.api) => {
  const SearchAdapterModule = await import(/* webpackChunkName: "vsf-search-adapter-" */ `./${adapterName}/searchAdapter`)
  const SearchAdapter = SearchAdapterModule.SearchAdapter

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

export default {
  getSearchAdapter
}
