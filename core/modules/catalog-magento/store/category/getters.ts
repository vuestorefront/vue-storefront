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
    const chosenFilter = {}
    Object.keys(currentQuery).map(filterKey => {
      const filter = getters.getAvailableFilters[filterKey]
      const queryValue = currentQuery[filterKey]
      if (Array.isArray(queryValue)) {
        queryValue.map(singleValue => {
          const variant = filter.find(filterVariant => filterVariant.id === singleValue)
          if (!chosenFilter[filterKey] || !Array.isArray(chosenFilter[filterKey])) chosenFilter[filterKey] = []
          chosenFilter[filterKey].push({...variant, attribute_code: filterKey})
        })
      } else {
        const variant = filter.find(filterVariant => filterVariant.id === queryValue)
        chosenFilter[filterKey] = {...variant, attribute_code: filterKey}
      }
    })
    return chosenFilter
  },
  getCurrentFilters: (state, getters, rootState) => getters.calculateFilters(rootState.route.query),
  hasActiveFilters: (state, getters) => !!Object.keys(getters.getCurrentFilters).length
}

export default getters
