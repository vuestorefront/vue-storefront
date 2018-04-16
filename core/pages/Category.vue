<template>
  <div id="Category">
    Core Category
  </div>
</template>

<script>
import builder from 'bodybuilder'

import { breadCrumbRoutes } from '@vue-storefront/store/helpers'
import config from 'config'
import Sidebar from 'core/components/blocks/Category/Sidebar.vue'
import ProductListing from 'core/components/ProductListing.vue'
import Breadcrumbs from 'core/components/Breadcrumbs.vue'
import { optionLabel } from '@vue-storefront/store/modules/attribute/helpers'
import EventBus from 'core/plugins/event-bus'
import Composite from 'core/mixins/composite'
import _ from 'lodash'
import i18n from 'core/lib/i18n'

function filterChanged (filterOption) { // slection of product variant on product page
  if (this.filters.chosen[filterOption.attribute_code] && ((_.toString(filterOption.id) === _.toString(this.filters.chosen[filterOption.attribute_code].id)) || filterOption.id === this.filters.chosen[filterOption.attribute_code].id)) { // for price filter it's a string
    delete this.filters.chosen[filterOption.attribute_code]
  } else {
    this.filters.chosen[filterOption.attribute_code] = filterOption
  }

  let filterQr = baseFilterQuery(config.products.defaultFilters, this.$store.state.category.current)

  let attrFilterBuilder = (filterQr, attrPostfix = '') => {
    for (let code of Object.keys(this.filters.chosen)) {
      const filter = this.filters.chosen[code]

      if (filter.attribute_code !== 'price') {
        filterQr = filterQr.andFilter('match', filter.attribute_code + attrPostfix, filter.id)
      } else { // multi should be possible filter here?
        const rangeqr = {}
        if (filter.from) {
          rangeqr['gte'] = filter.from
        }
        if (filter.to) {
          rangeqr['lte'] = filter.to
        }
        filterQr = filterQr.andFilter('range', filter.attribute_code, rangeqr)
      }
    }
    return filterQr
  }
  filterQr = filterQr.orFilter('bool', (b) => attrFilterBuilder(b).filter('match', 'type_id', 'simple'))
    .orFilter('bool', (b) => attrFilterBuilder(b, '_options').filter('match', 'type_id', 'configurable'))

  const fsC = Object.assign({}, this.filters.chosen) // create a copy because it will be used asynchronously (take a look below)
  filterData({ populateAggregations: false, searchProductQuery: filterQr, store: this.$store, route: this.$route, current: this.pagination.current, perPage: this.pagination.perPage, filters: config.products.defaultFilters }).then((res) => {
    EventBus.$emit('product-after-configured', { configuration: fsC })
  }) // because already aggregated
}

function baseFilterQuery (filters, parentCategory) { // TODO add aggregation of color_options and size_options fields
  let searchProductQuery = builder().query('range', 'price', { 'gt': 0 }).andFilter('range', 'visibility', { 'gte': 3, 'lte': 4 }/** Magento visibility in search & categories */)

  // add filters to query
  for (let attrToFilter of filters) {
    if (attrToFilter !== 'price') {
      searchProductQuery = searchProductQuery.aggregation('terms', attrToFilter)
      searchProductQuery = searchProductQuery.aggregation('terms', attrToFilter + '_options')
    } else {
      searchProductQuery = searchProductQuery.aggregation('terms', attrToFilter)
      searchProductQuery.aggregation('range', 'price', {
        ranges: [
          { from: 0, to: 50 },
          { from: 50, to: 100 },
          { from: 100, to: 150 },
          { from: 150 }
        ]
      })
    }
  }

  let childCats = [parentCategory.id]
  if (parentCategory.children_data) {
    let recurCatFinderBuilder = (category) => {
      if (!category) {
        return
      }

      if (!category.children_data) {
        return
      }

      for (let sc of category.children_data) {
        if (sc && sc.id) {
          childCats.push(sc.id)
        }
        recurCatFinderBuilder(sc)
      }
    }
    recurCatFinderBuilder(parentCategory)
  }
  searchProductQuery = searchProductQuery.filter('terms', 'category.category_id', childCats)
  return searchProductQuery
}

// TODO: Refactor - move this function to the Vuex store
function filterData ({ populateAggregations = false, filters = [], searchProductQuery, store, route, current = 0, perPage = 50, includeFields = [], excludeFields = [] }) {
  return store.dispatch('product/list', {
    query: searchProductQuery.build(),
    start: current,
    size: perPage,
    excludeFields: excludeFields,
    includeFields: includeFields
  }).then(function (res) {
    let subloaders = []
    if (!res || (res.noresults)) {
      EventBus.$emit('notification', {
        type: 'warning',
        message: i18n.t('No products synchronized for this category. Please come back while online!'),
        action1: { label: 'OK', action: 'close' }
      })
      store.dispatch('product/reset')
      store.state.product.list = { items: [] } // no products to show TODO: refactor to store.state.category.reset() and store.state.product.reset()
      // store.state.category.filters = { color: [], size: [], price: [] }
    } else {
      if (populateAggregations === true) { // populate filter aggregates
        for (let attrToFilter of filters) { // fill out the filter options
          store.state.category.filters.available[attrToFilter] = []

          let uniqueFilterValues = new Set()
          if (attrToFilter !== 'price') {
            if (res.aggregations['agg_terms_' + attrToFilter]) {
              let buckets = res.aggregations['agg_terms_' + attrToFilter].buckets
              if (res.aggregations['agg_terms_' + attrToFilter + '_options']) {
                buckets = buckets.concat(res.aggregations['agg_terms_' + attrToFilter + '_options'].buckets)
              }

              for (let option of buckets) {
                uniqueFilterValues.add(_.toString(option.key))
              }
            }

            for (let key of uniqueFilterValues.values()) {
              const label = optionLabel(store.state.attribute, { attributeKey: attrToFilter, optionId: key })
              if (_.trim(label) !== '') { // is there any situation when label could be empty and we should still support it?
                store.state.category.filters.available[attrToFilter].push({
                  id: key,
                  label: label
                })
              }
            }
          } else { // special case is range filter for prices
            if (res.aggregations['agg_range_' + attrToFilter]) {
              let index = 0
              let count = res.aggregations['agg_range_' + attrToFilter].buckets.length
              for (let option of res.aggregations['agg_range_' + attrToFilter].buckets) {
                store.state.category.filters.available[attrToFilter].push({
                  id: option.key,
                  from: option.from,
                  to: option.to,
                  label: (index === 0 || (index === count - 1)) ? (option.to ? '< $' + option.to : '> $' + option.from) : '$' + option.from + (option.to ? ' - ' + option.to : '')// TODO: add better way for formatting, extract currency sign
                })
                index++
              }
            }
          }
        }
      }
    }
    return subloaders
  }).catch((err) => {
    console.info(err)
    EventBus.$emit('notification', {
      type: 'warning',
      message: i18n.t('No products synchronized for this category. Please come back while online!'),
      action1: { label: 'OK', action: 'close' }
    })
  })
}

export default {
  name: 'Category',
  metaInfo () {
    return {
      title: this.$route.meta.title || this.categoryName,
      meta: this.$route.meta.description ? [{vmid: 'description', description: this.$route.meta.description}] : []
    }
  },
  mixins: [Composite],
  methods: {
    onFilterChanged (filterData) {
      (filterChanged.bind(this))(filterData)
    },
    fetchData ({ store, route }) {
      let self = this
      let searchProductQuery = baseFilterQuery(config.products.defaultFilters, store.state.category.current)

      if (self.category) { // fill breadcrumb data - TODO: extract it to a helper to be used on product page
        this.$bus.$emit('current-category-changed', store.state.category.current_path)
        store.dispatch('attribute/list', { // load filter attributes for this specific category
          filterValues: config.products.defaultFilters// TODO: assign specific filters/ attribute codes dynamicaly to specific categories
        })
      }
      return filterData({ searchProductQuery: searchProductQuery, populateAggregations: true, store: store, route: route, current: self.pagination.current, perPage: self.pagination.perPage, filters: config.products.defaultFilters })
    },
    validateRoute ({store, route}) {
      let self = this
      if (store == null) {
        store = self.$store
      }
      if (route == null) {
        route = self.$route
      }
      let slug = route.params.slug
      this.filters.chosen = {} // reset selected filters
      this.$bus.$emit('filter-reset')

      store.dispatch('category/single', { key: 'slug', value: slug }).then((category) => {
        store.state.category.breadcrumbs.routes = breadCrumbRoutes(store.state.category.current_path)

        if (!self.category) {
          self.$router.push('/')
        } else {
          self.fetchData({store: store, route: route})
          EventBus.$emitFilter('category-after-load', { store: store, route: route })
        }
      })
    }
  },
  watch: {
    '$route': 'validateRoute'
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      console.log('Entering asyncData for Category root ' + new Date())
      const defaultFilters = config.products.defaultFilters
      store.dispatch('category/list', { includeFields: config.ssr.optimize && global.$VS.isSSR ? config.ssr.category.includeFields : null }).then((categories) => {
        store.dispatch('attribute/list', { // load filter attributes for this specific category
          filterValues: defaultFilters, // TODO: assign specific filters/ attribute codes dynamicaly to specific categories
          includeFields: config.ssr.optimize && global.$VS.isSSR ? config.ssr.attribute.includeFields : null
        }).then((attrs) => {
          store.dispatch('category/single', { key: 'slug', value: route.params.slug }).then((parentCategory) => {
            filterData({ searchProductQuery: baseFilterQuery(defaultFilters, parentCategory), populateAggregations: true, store: store, route: route, current: 0, perPage: 50, filters: defaultFilters, includeFields: config.ssr.optimize && global.$VS.isSSR ? config.ssr.productList.includeFields : [], excludeFields: config.ssr.optimize && global.$VS.isSSR ? config.ssr.productList.excludeFields : [] }).then((subloaders) => {
              Promise.all(subloaders).then((results) => {
                store.state.category.breadcrumbs.routes = breadCrumbRoutes(store.state.category.current_path)

                EventBus.$emitFilter('category-after-load', { store: store, route: route }).then((results) => {
                  return resolve()
                }).catch((err) => {
                  console.error(err)
                  return resolve()
                })
              })
            })
          }).catch(err => {
            console.error(err)
            return reject(Error(err))
          })
        })
      })
    })
  },
  beforeMount () {
    this.$bus.$on('filter-changed-category', this.onFilterChanged)
  },
  beforeDestroy () {
    this.$bus.$off('filter-changed-category', this.onFilterChanged)
  },
  computed: {
    products () {
      return this.$store.state.product.list.items
    },
    productsCounter () {
      return this.$store.state.product.list.items.length
    },
    isCategoryEmpty () {
      return (!(this.$store.state.product.list.items) || this.$store.state.product.list.items.length === 0)
    },
    category () {
      return this.$store.state.category.current
    },
    categoryName () {
      return this.$store.state.category.current ? this.$store.state.category.current.name : ''
    },
    categoryId () {
      return this.$store.state.category.current ? this.$store.state.category.current.id : ''
    },
    filters () {
      return this.$store.state.category.filters
    },
    breadcrumbs () {
      return this.$store.state.category.breadcrumbs
    }

  },
  data () {
    return {
      pagination: {
        perPage: 50,
        current: 0,
        enabled: false
      }
    }
  },
  components: {
    ProductListing,
    Breadcrumbs,
    Sidebar
  }
}
</script>
