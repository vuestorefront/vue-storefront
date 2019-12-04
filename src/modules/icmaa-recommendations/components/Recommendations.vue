<template>
  <div v-if="products && products.length > 0">
    <h3 v-if="title" v-text="title" class="t-text-sm t-uppercase t-text-center t-mb-4 t-text-base-tone" />
    <div class="t-flex t-flex-wrap t--mx-2">
      <product-tile v-for="(recommended, i) in products" :key="i" :product="recommended" class="product t-cursor-pointer t-px-1 lg:t-px-2 t-mb-8 t-w-1/2 lg:t-w-1/4 lg:t-mb-0" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductTile from 'theme/components/core/ProductTile'

export default {
  name: 'IcmaaRecommendations',
  components: {
    ProductTile
  },
  props: {
    type: {
      type: String,
      default: 'crosssell'
    },
    limit: {
      type: Number,
      default: 4
    },
    title: {
      type: [String, Boolean],
      default: false
    }
  },
  computed: {
    ...mapGetters({
      currentProduct: 'product/getCurrentProduct',
      getRecommendations: 'icmaaRecommendations/getByTypeAndProductId'
    }),
    recommendations () {
      return this.getRecommendations(this.product.id, this.type)
    },
    product () {
      return this.currentProduct
    },
    products () {
      return this.recommendations ? this.recommendations.products : []
    }
  },
  methods: {
    async fetchRelated () {
      await this.$store.dispatch(
        'icmaaRecommendations/single',
        { product: this.product, type: this.type, size: this.limit }
      )
    }
  },
  watch: {
    async product (product) {
      return this.fetchRelated()
    }
  },
  async mounted () {
    return this.fetchRelated()
  }
}
</script>
