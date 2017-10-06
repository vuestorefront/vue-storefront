<template>
  <div id="Category">
    Core Category
  </div>
</template>

<script>
import builder from 'bodybuilder'

import Sidebar from '../components/core/blocks/Category/Sidebar.vue'
import ProductTile from '../components/core/ProductTile.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'

export default {
  name: 'category',

  methods: {
    /**
     * Helper method for getting attribute name - TODO: to be moved to external/shared helper
     *
     * @param {String} attributeCode
     * @param {String} optionId - value to get label for
     */
    _attributeOptionName (attributeCode, optionId) {
      const state = this.$store.state.catalog
      let attrCache = state.attributeLabels[attributeCode]

      if (attrCache) {
        let label = attrCache[optionId]

        if (label) {
          return label
        }
      }

      let attr = state.attributes[attributeCode]
      if (attr) {
        let opt = attr.options.find((op) => { // TODO: cache it in memory
          if (op.value === optionId.toString()) {
            return op
          }
        }) // TODO: i18n support with multi website attribute names

        if (opt) {
          if (!state.attributeLabels[attributeCode]) {
            state.attributeLabels[attributeCode] = {}
          }
          state.attributeLabels[attributeCode][optionId] = opt.label
          return opt ? opt.label : optionId
        } else {
          return optionId
        }
      } else {
        return optionId
      }
    },
    fetchData (to) {
      let self = this
      let searchProductQuery = builder().query('match', 'category.category_id', self.category.id)  // FIXME!
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

      self.breadcrumbs.routes = []

      if (self.category) { // fill breadcrumb data - TODO: extract it to Breadcrumb component or to helper
        let recurCatFinder = (category) => {
          if (!category) {
            return
          }
          self.$store.dispatch('catalog/getCategoryBy', { key: 'id', value: category.parent_id }).then((category) => {
            if (!category) {
              return
            }
            self.breadcrumbs.routes.unshift({
              name: category.name,
              route_link: '/c/' + category.slug
            })

            if (category.parent_id) {
              recurCatFinder(category)
            }
          })
        }
        if (self.category.parent_id) {
          recurCatFinder(self.category) // TODO: Store breadcrumbs in IndexedDb for further usage to optimize speed?
        }

        self.$store.dispatch('catalog/loadAttributes', { // load filter attributes for this specific category
          attrCodes: Object.keys(self.filters) // TODO: assign specific filters/ attribute codes dynamicaly to specific categories
        })
      }
      self.$store.dispatch('catalog/quickSearchByQuery', {
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
                label: self._attributeOptionName(attrToFilter, option.key)
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

      self.$store.dispatch('catalog/loadCategories', {}).then((categories) => {
        self.$store.dispatch('catalog/getCategoryBy', { key: 'slug', value: slug }).then((category) => {
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
