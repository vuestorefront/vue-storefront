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

      self.$store.dispatch('catalog/quickSearchByQuery', // TODO: should be exported to separate component maybe?
        searchProductQuery
      ).then(function (res) {
        self.products = res.items
        self.isCategoryEmpty = (self.products.length == 0)
      }) 
    },

    validateRoute () {
      let self = this
      let slug = this.$route.params.slug

      self.$store.dispatch('catalog/loadCategories').then((categories) => {
        self.$store.dispatch('catalog/getCategoryBySlug', slug).then((category) => {
          self.category = category

          if (!self.category) {
            self.$router.push('/')
          } else {
            self.fetchData()
          }
        })
      })
    },
  },
  watch: {
    '$route': 'validateRoute'
  },

  beforeMount () {
    this.validateRoute()
  },
  data () {
    return {
      breadcrumbs: BreadcrumbsData,
      isCategoryEmpty: false,
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
