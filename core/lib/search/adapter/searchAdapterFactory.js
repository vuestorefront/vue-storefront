import { server } from 'config'
let instances = {}

const isImplementingSearchAdapterInterface = (obj) => {
  return typeof obj.search === 'function' && typeof obj.registerEntityType === 'function'
}

export const getSearchAdapter = async (adapterName = server.api) => {
  let SearchAdapterModule

  try {
    SearchAdapterModule = await import(/* webpackChunkName: "vsf-search-adapter-[request]" */ `src/search/adapter/${adapterName}/searchAdapter`)
  } catch {}

  if (!SearchAdapterModule) {
    try {
      SearchAdapterModule = await import(/* webpackChunkName: "vsf-search-adapter-[request]" */ `./${adapterName}/searchAdapter`)
    } catch {}
  }

  if (!SearchAdapterModule) {
    throw new Error('Search adapter module was not found in `src/search/adapter` neither in the `core/lib/search/adapter` folders')
  }

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
