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
    fetchData (to) {
      let self = this
      let searchProductQuery = builder().query('match', 'category.category_id', self.category.id).build()

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
          attrCodes: ['']
        })

      }

      self.$store.dispatch('catalog/quickSearchByQuery', {
        query: searchProductQuery
      }).then(function (res) {
        self.products = res.items
        self.isCategoryEmpty = (self.products.length === 0)
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
      filters: { // filters should be set by category, and should be synchronized with magento
        color: ['red', 'blue'],
        size: ['XS', 'S', 'M', 'L', 'XL']
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
