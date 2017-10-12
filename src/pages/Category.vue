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
    fetchData (to) {
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
      if (self.category) { // fill breadcrumb data - TODO: extract it to a helper to be used on product page
        EventBus.$emit('current-category-changed', self.$store.state.category.current_path)
        self.breadcrumbs.routes = breadCrumbRoutes(self.$store.state.category.current_path)

        self.$store.dispatch('attribute/list', { // load filter attributes for this specific category
          filterValues: Object.keys(self.filters) // TODO: assign specific filters/ attribute codes dynamicaly to specific categories
        })
      }
      self.$store.dispatch('product/list', {
        query: searchProductQuery.build(),
        start: self.pagination.offset,
        size: self.pagination.pageSize
      }).then(function (res) {
        self.aggregations = res.aggregations
        self.products = res.items
        self.isCategoryEmpty = (self.products.length === 0)

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
            for (let option of res.aggregations['agg_range_' + attrToFilter].buckets) {
              self.filters[attrToFilter].push(option.key)
            }
          }
        }
      })
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
  },
  data () {
    return {
      isCategoryEmpty: false,
      breadcrumbs: { routes: [] },
      products: {},
      category: {},
      aggregations: {}, // facets
      pagination: {
        pageSize: 150,
        offset: 0
      },

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
