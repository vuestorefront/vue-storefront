<template>
  <div class="product-tile">
    <!-- Pass product object to this component -->
    <router-link
      :to="{
        name: product.type_id + '-product',
        params: {
          parentSku: product.parentSku ? product.parentSku : product.sku,
          slug: product.slug,
          childSku: product.sku
        }
      }"
    >
      <transition appear>
        <!-- Pass prop instant="true" to avoid lazy loading for product images.
             It's a good practice to use it for Product Tiles visible on a screen just after entering the page.
             By default instant value is 'false' and uses lazy loading -->
        <img
          v-if="instant"
          :src="thumbnail"
          :key="thumbnail"
          v-img-placeholder="placeholder"
          :alt="product.name"
        >
        <!-- Default palceholer is taken from core/assets/placeholder.png,
             you can override it by adding same file in your theme's assets -->
        <img
          v-if="!instant"
          :src="placeholder"
          v-lazy="thumbnail"
          :key="thumbnail"
          :alt="product.name"
        >
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
import productTile from 'core/components/productTile'

import AddToCart from './AddToCart'

export default {
<<<<<<< HEAD
  components: {
    AddToCart
  },
  mixins: [coreComponent('ProductTile')]
=======
  mixins: [productTile]
>>>>>>> upstream/develop
}
</script>
