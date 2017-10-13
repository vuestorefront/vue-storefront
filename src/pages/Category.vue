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

export default {
  name: 'category',

  methods: {

    baseFilterQuery () {
      let self = this
      let searchProductQuery = builder().query('range', 'price', { 'gt': 0 }).andFilter('range', 'visibility', { 'gte': 3, 'lte': 4 }/** Magento visibility in search & categories */).orFilter('term', 'category.category_id', self.category.id)  // FIXME!

      // add filters to query
      for (let attrToFilter of Object.keys(self.filters)) {
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

      if (self.category.children_data) {
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
        recurCatFinderBuilder(self.category, searchProductQuery)
      }

      return searchProductQuery
    },

    filterData ({ populateAggregations = false, searchProductQuery }) {
      let self = this
      self.$store.dispatch('product/list', {
        query: searchProductQuery.build(),
        start: self.pagination.offset,
        size: self.pagination.pageSize
      }).then(function (res) {
        self.aggregations = res.aggregations
        self.products = res.items
        self.isCategoryEmpty = (self.products.length === 0)

        if (populateAggregations === true) { // populate filter aggregates
          for (let attrToFilter of Object.keys(self.filters)) { // fill out the filter options
            self.filters[attrToFilter] = []

            if (attrToFilter !== 'price') {
              for (let option of res.aggregations['agg_terms_' + attrToFilter].buckets) {
                self.filters[attrToFilter].push({
                  id: option.key,
                  label: optionLabel(self.$store.state.attribute, { attributeKey: attrToFilter, optionId: option.key })
                })
              }
            } else { // special case is range filter for prices
              let index = 0
              let count = res.aggregations['agg_range_' + attrToFilter].buckets.length
              for (let option of res.aggregations['agg_range_' + attrToFilter].buckets) {
                self.filters[attrToFilter].push({
                  id: option.key,
                  from: option.from,
                  to: option.to,
                  label: (index === 0 || (index == count-1)) ? (option.to ? '<' : '>') + ' $' + option.from : '$' + option.from + (option.to ? ' - ' + option.to : '')// TODO: add better way for formatting, extract currency sign
                })
                index++
              }
            }
          }
        }
      })
    },

    fetchData () {
      let self = this
      let searchProductQuery = self.baseFilterQuery()

      if (self.category) { // fill breadcrumb data - TODO: extract it to a helper to be used on product page
        EventBus.$emit('current-category-changed', self.$store.state.category.current_path)
        self.breadcrumbs.routes = breadCrumbRoutes(self.$store.state.category.current_path)

        self.$store.dispatch('attribute/list', { // load filter attributes for this specific category
          filterValues: Object.keys(self.filters) // TODO: assign specific filters/ attribute codes dynamicaly to specific categories
        })
      }
      self.filterData({ searchProductQuery: searchProductQuery, populateAggregations: true })
    },

    validateRoute () {
      let self = this
      let slug = this.$route.params.slug

      self.$store.dispatch('category/list', {}).then((categories) => {
        self.$store.dispatch('category/single', { key: 'slug', value: slug }).then((category) => {
          self.category = category

          if (!self.category) {
            self.$router.push('/')
          } else {
            self.fetchData()
          }
        })
      })
    }
  },
  watch: {
    '$route': 'validateRoute'
  },

  beforeMount () {
    this.validateRoute()
    let self = this // TODO: refactor it to bind()
    EventBus.$on('filter-changed', (filterOption) => { // slection of product variant on product page
      console.log(filterOption)
      if (self.filterSet[filterOption.attribute_code]) {
        delete self.filterSet[filterOption.attribute_code]
      } else {
        self.filterSet[filterOption.attribute_code] = filterOption
      }

      let filterQr = self.baseFilterQuery()
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
      self.filterData({ populateAggregations: false, searchProductQuery: filterQr }) // because already aggregated
    })
  },
  data () {
    return {
      isCategoryEmpty: false,
      breadcrumbs: { routes: [] },
      products: {},
      category: {},
      aggregations: {}, // facets
      pagination: {
        pageSize: 18,
        offset: 0
      },
      filterSet: {}, // filter set selected by user
      filters: { // filters should be set by category, and should be synchronized with magento
        color: [{'id': 165, 'label': 'red'}, {'id': 166, 'label': 'blue'}],
        size: [
            {'id': 50, 'label': 'XS'},
            {'id': 51, 'label': 'S'},
            {'id': 52, 'label': 'M'},
            {'id': 53, 'label': 'L'},
            {'id': 54, 'label': 'XL'}
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
