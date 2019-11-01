<template>
  <div class="product-listing t-flex t-flex-wrap t-justify-start t-px-3 lg:t-px-4 lg:t--mx-2">
    <template v-for="(product, i) in products">
      <product-tile :product="product" :key="`product-${i}`" class="t-px-1 lg:t-px-2 t-mb-8" :class="[ 't-w-1/2 lg:t-w-1/' + columns ]" />
      <list-banner v-if="i === 7 || i%28 === 27" :key="`listbanner-${i}`" class="t-w-full t-px-1 lg:t-px-2 t-mb-8" />
    </template>
  </div>
</template>

<script>
import ProductTile from 'theme/components/core/ProductTile'
import ListBanner from 'theme/components/core/blocks/CategoryExtras/ListBanner'

export default {
  name: 'ProductListing',
  components: {
    ProductTile,
    ListBanner
  },
  props: {
    products: {
      type: null,
      required: true
    },
    columns: {
      type: [Number, String],
      default: 4
    }
  }
}
</script>
