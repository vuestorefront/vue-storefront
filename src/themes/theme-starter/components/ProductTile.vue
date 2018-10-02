<template>
  <div class="product-tile">
    <!-- Pass product object to this component -->
    <router-link
      :to="localizedRoute({
        name: product.type_id + '-product',
        params: {
          parentSku: product.parentSku ? product.parentSku : product.sku,
          slug: product.slug,
          childSku: product.sku
        }
      })"
    >
      <transition appear>
        <!-- Default palceholer is taken from core/assets/placeholder.png,
             you can override it by adding same file in your theme's assets -->
        <img
          :alt="product.name"
          :src="thumbnailObj.loading"
          v-lazy="thumbnailObj"
          height="300"
          width="310">
      </transition>
      <!-- Main product information, you can find the rest under 'product' property passed -->
      <h3> {{ product.name }} </h3>
      <div>
        <!-- Displays proper price. Default with tax or special -->
        <span v-if="product.special_price && parseFloat(product.originalPriceInclTax) > 0">
          {{ product.originalPriceInclTax | price }}
        </span>
        <span
          v-if="product.special_price && parseFloat(product.special_price) > 0"
        >
          {{ product.priceInclTax | price }}
        </span>
        <span v-if="!product.special_price && parseFloat(product.priceInclTax) > 0">
          {{ product.priceInclTax | price }}
        </span>
      </div>
    </router-link>
    <add-to-cart :product="product" />
  </div>
</template>

<script>
import ProductTile from '@vue-storefront/core/components/ProductTile'
import AddToCart from 'theme/components/AddToCart'

export default {
  mixins: [ProductTile],
  components: { AddToCart }
}
</script>
