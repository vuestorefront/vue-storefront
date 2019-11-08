<template>
  <div class="product-listing t-flex t-flex-wrap t-justify-start t-px-3 lg:t-px-4 lg:t--mx-2">
    <template v-for="(product, i) in products">
      <product-tile :product="product" :key="`product-${i}`" class="t-px-1 lg:t-px-2 t-mb-8" :class="['t-w-1/2 lg:t-w-1/' + columns]" />
    </template>
  </div>
</template>

<script>
import ProductTile from 'theme/components/core/ProductTile'
import { mapGetters } from 'vuex'

export default {
  name: 'ProductListingWidget',
  components: {
    ProductTile
  },
  props: {
    columns: {
      type: [Number, String],
      default: 4
    },
    limit: {
      type: [Number, String],
      default: 4
    },
    categoryId: {
      type: Number,
      required: true
    },
    sort: {
      type: String,
      default: 'created_at:asc'
    }
  },
  computed: {
    ...mapGetters('icmaaCategory', ['getProductListingWidgetByCategoryId']),
    ...mapGetters({ cluster: 'user/getCluster' }),
    products () {
      const products = this.getProductListingWidgetByCategoryId(this.categoryId)
      if (!products) {
        return []
      }
      return products.list.slice(0, this.limit)
    }
  },
  async mounted () {
    if (this.products.length < this.limit) {
      // If products are not enough because of different limit than product count in state, load more.
      await this.$store.dispatch('icmaaCategory/loadProductListingWidgetProducts', {
        categoryId: this.categoryId,
        cluster: this.cluster,
        size: this.limit - this.products.length,
        sort: this.sort
      })
    } else {
      // If no products there yet
      await this.$store.dispatch('icmaaCategory/loadProductListingWidgetProducts', {
        categoryId: this.categoryId,
        cluster: this.cluster,
        size: this.limit,
        sort: this.sort
      })
    }

    // If not enough cluster items found, load regular ones
    // ! This is a workaround for missing should/or filter of quickSearchByQuery
    if (this.cluster && this.products.length < this.limit) {
      await this.$store.dispatch('icmaaCategory/loadProductListingWidgetProducts', {
        categoryId: this.categoryId,
        size: this.limit - this.products.length,
        sort: this.sort
      })
    }
  }
}
</script>
