import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from './CategoryState'
import { calculateBreadcrumbs } from '../../helpers/categoryHelpers'
import { products } from 'config'
import FilterVariant from '../../types/FilterVariant'
import { optionLabel } from '../../helpers/optionLabel'
import trim from 'lodash-es/trim'
import toString from 'lodash-es/toString'
import { compareByLabel } from './logic/categoryLogic'

const getters: GetterTree<CategoryState, RootState> = {
  getCategories: (state) => state.categories || [],
  getCategoryProducts: (state) => state.products,
  getCategoryFrom: (state, getters) => (path:string = '') => {
    return getters.getCategories.find(category => path.includes(category.url_path)) || {}
  },
  getCurrentCategory: (state, getters, rootState) => getters.getCategoryFrom(rootState.route.path),
  getAvailableFiltersFrom: (state, getters, rootState) => (aggregations) => {
    const filters = {}
    if (aggregations) { // populate filter aggregates
      for (let attrToFilter of products.defaultFilters) { // fill out the filter options
        let filterOptions:Array<FilterVariant> = []

        let uniqueFilterValues = new Set<string>()
        if (attrToFilter !== 'price') {
          if (aggregations['agg_terms_' + attrToFilter]) {
            let buckets = aggregations['agg_terms_' + attrToFilter].buckets
            if (aggregations['agg_terms_' + attrToFilter + '_options']) {
              buckets = buckets.concat(aggregations['agg_terms_' + attrToFilter + '_options'].buckets)
            }

            for (let option of buckets) {
              uniqueFilterValues.add(toString(option.key))
            }
          }

          uniqueFilterValues.forEach(key => {
            const label = optionLabel(rootState.attribute, { attributeKey: attrToFilter, optionId: key })
            if (trim(label) !== '') { // is there any situation when label could be empty and we should still support it?
              filterOptions.push({
                id: key,
                label: label,
                type: attrToFilter
              })
            }
          });
          filters[attrToFilter] = filterOptions.sort(compareByLabel)
        } else { // special case is range filter for prices
          const storeView = rootState.storeView
          const currencySign = storeView.i18n.currencySign
          if (aggregations['agg_range_' + attrToFilter]) {
            let index = 0
            let count = aggregations['agg_range_' + attrToFilter].buckets.length
            for (let option of aggregations['agg_range_' + attrToFilter].buckets) {
              filterOptions.push({
                id: option.key,
                type: attrToFilter,
                from: option.from,
                to: option.to,
                label: (index === 0 || (index === count - 1)) ? (option.to ? '< ' + currencySign + option.to : '> ' + currencySign + option.from) : currencySign + option.from + (option.to ? ' - ' + option.to : '')// TODO: add better way for formatting, extract currency sign
              })
              index++
            }
            filters[attrToFilter] = filterOptions
          }
        }
      }
      // Add sort to available filters
      let variants = []
      Object.keys(products.sortByAttributes).map(label => {
        variants.push({
          label: label,
          id: products.sortByAttributes[label],
          type: 'sort'
        })
      })
      filters['sort'] = variants
    }
    return filters
  },
  getAvailableFilters: state => state.availableFilters,
  getCurrentFiltersFrom: (state, getters, rootState) => (filters) => {
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
  getCurrentFilters: (state, getters, rootState) => getters.getCurrentFiltersFrom(rootState.route.query).filters,
  hasActiveFilters: (state, getters) => !!Object.keys(getters.getCurrentFilters).length,
  getSystemFilterNames: () => ['sort'],
  getBreadcrumbs: (state, getters) => {
    if (!getters.getCurrentCategory) return []
    return calculateBreadcrumbs(getters.getCategories, getters.getCurrentCategory.id)
  }
}

export default getters
