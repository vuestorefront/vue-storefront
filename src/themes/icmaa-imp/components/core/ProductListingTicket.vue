<template>
  <div class="product-listing t-px-4 t-mb-8">
    <ul>
      <template v-for="(product, i) in products">
        <product-tile-ticket :product="product" :key="`product-${i}`" class="t-mb-1" />
        <list-banner v-if="i === 7 || i%28 === 27" :key="`listbanner-${i}`" class="t-w-full t-mb-1" />
      </template>
    </ul>
  </div>
</template>

<script>
import ProductTileTicket from 'theme/components/core/ProductTileTicket'
import ListBanner from 'theme/components/core/blocks/CategoryExtras/ListBanner'

export default {
  name: 'ProductListingTicket',
  components: {
    ProductTileTicket,
    ListBanner
  },
  props: {
    products: {
      type: null,
      required: true
    }
  }
}
</script>
