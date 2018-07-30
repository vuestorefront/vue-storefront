<template>
  <products-slider
    :products="products"
    :config="sliderConfig"
    :title="title"
  />
</template>
<script>
import SearchQuery from 'core/store/lib/search/searchQuery'
import ProductsSlider from 'theme/components/core/ProductsSlider'

export default {
  name: 'Collection',
  props: {
    title: {
      type: String,
      required: true
    },
    coverImage: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      products: [],
      sliderConfig: {
        perPage: 2,
        perPageCustom: [[768, 6]],
        paginationEnabled: false,
        loop: true
      }
    }
  },
  computed: {
    currentIndex: {
      cache: false,
      get () {
        return this.$refs.carousel ? this.$refs.carousel.currentPage : 0
      }
    }
  },
  beforeMount () {
    let self = this

    /* let inspirationsQuery = builder().query('match', 'category.name', this.category).build()

    self.$store.dispatch('product/list', {
      query: inspirationsQuery, */

    let inspirationsQuery = new SearchQuery()
    inspirationsQuery = inspirationsQuery.addQuery({type: 'match', key: 'category.name', value: this.category, boolType: 'query'})

    self.$store.dispatch('product/listByQuery', {
      searchQuery: inspirationsQuery,
      size: 12,
      sort: 'created_at:desc'
    }).then(function (res) {
      if (res) {
        self.products = res.items
      }
    })
  },
  components: {
    ProductsSlider
  }
}
</script>
