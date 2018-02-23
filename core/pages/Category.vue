<template>
  <div id="Category">
    Core Category
  </div>
</template>

<script>
import builder from 'bodybuilder'

import { breadCrumbRoutes } from 'core/helpers'
import Meta from 'core/lib/meta'
import Sidebar from 'core/components/blocks/Category/Sidebar.vue'
import ProductListing from 'core/components/ProductListing.vue'
import Breadcrumbs from 'core/components/Breadcrumbs.vue'
import { optionLabel } from 'core/store/modules/attribute'
import EventBus from 'core/plugins/event-bus'
import _ from 'lodash'
import i18n from 'core/lib/i18n'

function filterChanged (filterOption) { // slection of product variant on product page
  if (this.filterSet[filterOption.attribute_code] && ((parseInt(filterOption.id) === (this.filterSet[filterOption.attribute_code].id)) || filterOption.id === this.filterSet[filterOption.attribute_code].id)) { // for price filter it's a string
    delete this.filterSet[filterOption.attribute_code]
  } else {
    this.filterSet[filterOption.attribute_code] = filterOption
  }

  let filterQr = baseFilterQuery(Object.keys(this.filters), this.$store.state.category.current)

  let attrFilterBuilder = (filterQr, attrPostfix = '') => {
    for (let code of Object.keys(this.filterSet)) {
      const filter = this.filterSet[code]

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

  const fsC = Object.assign({}, this.filterSet) // create a copy because it will be used asynchronously (take a look below)
  filterData({ populateAggregations: false, searchProductQuery: filterQr, store: this.$store, route: this.$route, offset: this.pagination.offset, pageSize: this.pagination.pageSize, filters: Object.keys(this.filters) }).then((res) => {
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

function filterData ({ populateAggregations = false, filters = [], searchProductQuery, store, route, offset = 0, pageSize = 50 }) {
  return store.dispatch('product/list', {
    query: searchProductQuery.build(),
    start: offset,
    size: pageSize
  }).then(function (res) {
    let subloaders = []
    if (!res || (res.noresults)) {
      EventBus.$emit('notification', {
        type: 'warning',
        message: i18n.t('No products synchronized for this category. Please come back while online!'),
        action1: { label: 'OK', action: 'close' }
      })

      store.state.product.list = { items: [] } // no products to show TODO: refactor to store.state.category.reset() and store.state.product.reset()
      // store.state.category.filters = { color: [], size: [], price: [] }
    } else {
      if (populateAggregations === true) { // populate filter aggregates
        for (let attrToFilter of filters) { // fill out the filter options
          store.state.category.filters[attrToFilter] = []

          let uniqueFilterValues = new Set()
          if (attrToFilter !== 'price') {
            if (res.aggregations['agg_terms_' + attrToFilter]) {
              let buckets = res.aggregations['agg_terms_' + attrToFilter].buckets
              if (res.aggregations['agg_terms_' + attrToFilter + '_options']) {
                buckets = buckets.concat(res.aggregations['agg_terms_' + attrToFilter + '_options'].buckets)
              }

              for (let option of buckets) {
                uniqueFilterValues.add(parseInt(option.key))
              }
            }

            for (let key of uniqueFilterValues.values()) {
              const label = optionLabel(store.state.attribute, { attributeKey: attrToFilter, optionId: key })
              if (_.trim(label) !== '') { // is there any situation when label could be empty and we should still support it?
                store.state.category.filters[attrToFilter].push({
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
                store.state.category.filters[attrToFilter].push({
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
  mixins: [Meta],
  meta () {
    return {
      title: this.$store.state.category.current.name
    }
  },
  methods: {
    fetchData ({ store, route }) {
      let self = this
      let searchProductQuery = baseFilterQuery(Object.keys(self.filters), store.state.category.current)

      if (self.category) { // fill breadcrumb data - TODO: extract it to a helper to be used on product page
        this.$bus.$emit('current-category-changed', store.state.category.current_path)
        store.dispatch('attribute/list', { // load filter attributes for this specific category
          filterValues: Object.keys(self.filters)// TODO: assign specific filters/ attribute codes dynamicaly to specific categories
        })
      }
      return filterData({ searchProductQuery: searchProductQuery, populateAggregations: true, store: store, route: route, ofset: self.pagination.offset, pageSize: self.pagination.pageSize, filters: Object.keys(self.filters) })
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
      this.filterSet = {} // reset selected filters
      this.$bus.$emit('filter-reset')

      store.dispatch('category/single', { key: 'slug', value: slug }).then((category) => {
        store.state.category.breadcrumbs.routes = breadCrumbRoutes(store.state.category.current_path)
        self.setMeta()

        if (!self.category) {
          self.$router.push('/')
        } else {
          self.fetchData({store: store, route: route})
        }
      })
    }
  },
  watch: {
    '$route': 'validateRoute'
  },

  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      const defaultFilters = ['color', 'size', 'price']
      store.dispatch('category/list', {}).then((categories) => {
        store.dispatch('attribute/list', { // load filter attributes for this specific category
          filterValues: defaultFilters// TODO: assign specific filters/ attribute codes dynamicaly to specific categories
        }).then((attrs) => {
          store.dispatch('category/single', { key: 'slug', value: route.params.slug }).then((parentCategory) => {
            store.dispatch('meta/set', { title: store.state.category.current.name })
            filterData({ searchProductQuery: baseFilterQuery(defaultFilters, parentCategory), populateAggregations: true, store: store, route: route, ofset: 0, pageSize: 50, filters: defaultFilters }).then((subloaders) => {
              Promise.all(subloaders).then((results) => {
                store.state.category.breadcrumbs.routes = breadCrumbRoutes(store.state.category.current_path)
                return resolve()
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
    this.$bus.$on('filter-changed-category', filterChanged.bind(this))
  },
  beforeDestroy () {
    this.$bus.$off('filter-changed-category')
  },
  computed: {
    products () {
      return this.$store.state.product.list.items
    },
    isCategoryEmpty () {
      return (!(this.$store.state.product.list.items) || this.$store.state.product.list.items.length === 0)
    },
    category () {
      return this.$store.state.category.current
    },
    aggregations () {
      return this.$store.state.product.list.aggregations
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
        pageSize: 50,
        offset: 0
      },
      filterSet: {} // filter set selected by user
    }
  },
  components: {
    ProductListing,
    Breadcrumbs,
    Sidebar
  }
}
</script>
