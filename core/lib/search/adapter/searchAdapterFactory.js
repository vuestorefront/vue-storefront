import { server } from 'config'

let instances = {}

const isImplementingSearchAdapterInterface = (obj) => {
  return typeof obj.search === 'function' && typeof obj.registerEntityType === 'function'
}

export const getSearchAdapter = async (adapterName = server.api) => {
  const SearchAdapterModule = await import(/* webpackChunkName: "vsf-search-adapter-" */ `./${adapterName}/searchAdapter`)
  const SearchAdapter = SearchAdapterModule.SearchAdapter

  if (!SearchAdapter) {
    throw new Error('Search adapter class is not provided')
  }

  if (instances[adapterName]) {
    return instances[adapterName]
  }

  const searchAdapter = new SearchAdapter()
  if (!isImplementingSearchAdapterInterface(searchAdapter)) {
    throw new Error('Not valid search adapter class provided. Search Adapter must implements SearchAdapterInterfaces')
  }
  instances[adapterName] = searchAdapter;
  return instances[adapterName];
}

export default {
  getSearchAdapter
}
