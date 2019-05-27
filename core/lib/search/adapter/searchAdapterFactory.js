import { server } from 'config'

let instances = {}

export const getSearchAdapter = async (adapterName = server.api) => {
  const SearchAdapterModule = await import(/* webpackChunkName: "vsf-search-adapter-" */ `./${adapterName}/searchAdapter`)
  const SearchAdapter = SearchAdapterModule.SearchAdapter

  if (!SearchAdapter) {
    throw new Error('Search adapter class is not provided')
  } else {
    if (instances[adapterName]) {
      return instances[adapterName]
    }

    instances[adapterName] = new SearchAdapter()

    if (typeof instances[adapterName].isValidFor === 'function' && typeof instances[adapterName].search === 'function' && typeof instances[adapterName].handleResult === 'function') {
      throw new Error('Not valid search adapter class provided. Search Adapter must have search() and handleResult() methods')
    }

    return instances[adapterName]
  }
}

export default {
  getSearchAdapter
}
