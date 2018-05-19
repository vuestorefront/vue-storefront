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
      <transition name="fade" appear>
        <!-- Pass prop 'instant="true"' to avoid lazy loading for product images.
        It's a good practice to use it for Product Tiles visible on a screen just after entering the page.
        By default instant value is 'false' and uses lazy loading -->
        <img
          v-if="instant"
          :src="thumbnail"
          :key="thumbnail"
          v-img-placeholder="placeholder"
          :alt="product.name"
        >
        <img
          v-if="!instant"
          :src="placeholder"
          v-lazy="thumbnail"
          :key="thumbnail"
          :alt="product.name"
        >
      </transition>
      <!-- Main product information, you can find the rest under 'product' property passed -->
      <h1> {{ product.name }} </h1>
      <div>
        <!-- Displays proper price depending on amount of special price -->
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
  </div>
</template>

<script>
import productTile from 'core/components/productTile'

export default {
  mixins: [productTile]
}
</script>
