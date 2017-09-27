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

import BreadcrumbsData from 'src/resource/breadcrumbs.json'

export default {
  name: 'category',
  methods: {

    fetchData (to) {
      let self = this
      let searchProductQuery = builder().query('match', 'category.category_id', self.category.id).build()

      this.$store.dispatch('catalog/quickSearchByQuery', searchProductQuery).then((res) => {
        if (res.items) {
          self.products = res.items
          self.isCategoryEmpty = false
        }
      })
    },

    validateRoute () {
      // Checks if category from slug is a valid category name.
      let self = this
      let slug = this.$route.params.slug

      self.$store.dispatch('catalog/loadCategories').then((categories) => {
        self.category = self.$store.state.catalog.categories.find(
          (itm) => { return itm.slug === slug }
        )
      })

      if (!self.category) {
        self.$router.push('/')
      } else {
        self.fetchData()
      }
    }

  },
  watch: {
    '$route': 'validateRoute'
  },
  created () {
    this.validateRoute()
  },
  data () {
    return {
      breadcrumbs: BreadcrumbsData,
      isCategoryEmpty: true,
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
