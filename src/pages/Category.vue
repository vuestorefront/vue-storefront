<template>
  <div id="Category">
    Core Category
  </div>
</template>

<script>
import builder from 'bodybuilder'

import { breadCrumbRoutes } from 'src/lib/filters'
import EventBus from 'src/event-bus/event-bus'
import Sidebar from '../components/core/blocks/Category/Sidebar.vue'
import ProductTile from '../components/core/ProductTile.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import { optionLabel } from 'src/store/modules/attribute'

function baseFilterQuery (filters, parentCategory) {
  let searchProductQuery = builder().query('range', 'price', { 'gt': 0 }).andFilter('range', 'visibility', { 'gte': 3, 'lte': 4 }/** Magento visibility in search & categories */).orFilter('term', 'category.category_id', parentCategory.id)  // FIXME!

  // add filters to query
  for (let attrToFilter of filters) {
    if (attrToFilter !== 'price') {
      searchProductQuery = searchProductQuery.aggregation('terms', attrToFilter)
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

  if (parentCategory.children_data) {
    let recurCatFinderBuilder = (category, searchProductQuery) => {
      if (!category) {
        return searchProductQuery
      }

      if (!category.children_data) {
        return searchProductQuery
      }

      for (let sc of category.children_data) {
        if (sc && sc.id) {
          searchProductQuery = searchProductQuery.orFilter('term', 'category.category_id', sc.id)
        }
        return recurCatFinderBuilder(sc, searchProductQuery)
      }

      return searchProductQuery
    }
    recurCatFinderBuilder(parentCategory, searchProductQuery)
  }

  return searchProductQuery
}

function filterData ({ populateAggregations = false, filters = [], searchProductQuery, store, route, offset = 0, pageSize = 50 }) {
  return store.dispatch('product/list', {
    query: searchProductQuery.build(),
    start: offset,
    size: pageSize
  }).then(function (res) {
    if (populateAggregations === true) { // populate filter aggregates
      for (let attrToFilter of filters) { // fill out the filter options
        store.state.category.filters[attrToFilter] = []

        if (attrToFilter !== 'price') {
          for (let option of res.aggregations['agg_terms_' + attrToFilter].buckets) {
            store.state.category.filters[attrToFilter].push({
              id: option.key,
              label: optionLabel(store.state.attribute, { attributeKey: attrToFilter, optionId: option.key })
            })
          }
        } else { // special case is range filter for prices
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
  })
}

export default {
  name: 'category',
  methods: {
    fetchData ({ store, route }) {
      let self = this
      let searchProductQuery = baseFilterQuery(Object.keys(self.filters), store.state.category.current)

      if (self.category) { // fill breadcrumb data - TODO: extract it to a helper to be used on product page
        EventBus.$emit('current-category-changed', store.state.category.current_path)
      }
      filterData({ searchProductQuery: searchProductQuery, populateAggregations: true, store: store, route: route, ofset: self.pagination.offset, pageSize: self.pagination.pageSize, filters: Object.keys(self.filters) })
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

      store.dispatch('category/list', {}).then((categories) => {
        store.dispatch('category/single', { key: 'slug', value: slug }).then((category) => {
          if (!self.category) {
            self.$router.push('/')
          } else {
            self.fetchData({store: store, route: route})
          }
        })
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
            console.log('Loading products list in SSR')
            filterData({ searchProductQuery: baseFilterQuery(defaultFilters, parentCategory), populateAggregations: true, store: store, route: route, ofset: 0, pageSize: 50, filters: defaultFilters }).then((res) => {
              store.state.category.breadcrumbs.routes = breadCrumbRoutes(store.state.category.current_path)
              return resolve()
            })
          })
        })
      })
    })
  },

  beforeMount () {
    this.validateRoute({store: this.$store, route: this.$route})

    let self = this // TODO: refactor it to bind()
    EventBus.$on('filter-changed', (filterOption) => { // slection of product variant on product page
      console.log(filterOption)
      if (self.filterSet[filterOption.attribute_code]) {
        delete self.filterSet[filterOption.attribute_code]
      } else {
        self.filterSet[filterOption.attribute_code] = filterOption
      }

      let filterQr = baseFilterQuery(Object.keys(self.filters), this.$store.state.category.current)
      for (let code of Object.keys(self.filterSet)) {
        const filter = self.filterSet[code]

        if (filter.attribute_code !== 'price') {
          filterQr = filterQr.andFilter('match', filter.attribute_code, filter.id)
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
      self.filterData({ populateAggregations: false, searchProductQuery: filterQr, store: self.$store, route: self.$route, offset: self.pagination.offset, pageSize: self.pagination.pageSize, filters: Object.keys(self.filters) }) // because already aggregated
    })
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
        pageSize: 18,
        offset: 0
      },
      filterSet: {}, // filter set selected by user
      filters: { // filters should be set by category, and should be synchronized with magento
        color: [],
        size: [
        ],
        price: ['0.00 - 50.00', '50.01 - 100.00', '100.01 - 150.00', '150.01 and more']
      }
    }
  },
  components: {
    ProductTile,
    Breadcrumbs,
    Sidebar
  }
}
</script>
