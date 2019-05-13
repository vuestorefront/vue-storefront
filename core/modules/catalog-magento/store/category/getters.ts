import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from './CategoryState'

const getters: GetterTree<CategoryState, RootState> = {
  getCategories: (state) => state.categories,
  getCategoryProducts: (state) => state.products,
  getAvailableFilters: state => state.availableFilters,
  calculateCurrentCategory: (state, getters, rootState) => (route) => {
    const currentRoute = route ? route : rootState.route
    return getters.getCategories.find(category => currentRoute.path.includes(category.url_path)) || {}
  },
  getCurrentCategory: (state, getters, rootState) => getters.calculateCurrentCategory(rootState.route),
  calculateFilters: (state, getters, rootState) => (filters) => {
    const currentQuery = filters ? filters : rootState.route.query
    const searchQuery = {
      filters: {}
    }
    Object.keys(currentQuery).forEach(filterKey => {
      const filter = getters.getAvailableFilters[filterKey]
      const queryValue = currentQuery[filterKey]
      if (!filter) return
      if (getters.getSystemFilterNames.includes(filterKey)) {
        searchQuery[filterKey] = queryValue
      } else if (Array.isArray(queryValue)) {
        queryValue.map(singleValue => {
          const variant = filter.find(filterVariant => filterVariant.id === singleValue)
          if (!searchQuery.filters[filterKey] || !Array.isArray(searchQuery.filters[filterKey])) searchQuery.filters[filterKey] = []
          searchQuery.filters[filterKey].push({...variant, attribute_code: filterKey})
        })
      } else {
        const variant = filter.find(filterVariant => filterVariant.id === queryValue)
        searchQuery.filters[filterKey] = {...variant, attribute_code: filterKey}
      }
    })
    return searchQuery
  },
  getCurrentFilters: (state, getters, rootState) => getters.calculateFilters(rootState.route.query).filters,
  hasActiveFilters: (state, getters) => !!Object.keys(getters.getCurrentFilters).length,
  getSystemFilterNames: () => ['sort']
}

export default getters
