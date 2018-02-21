<template>
  <ul>
    <li v-for="(productLink, index) in products" :key="index">
      {{ productLink.product.name }}

      <div v-if="productLink.product.special_price && productLink.product.priceInclTax && productLink.product.originalPriceInclTax">
        <span>{{ productLink.product.priceInclTax | price }}</span>
        <span>{{ productLink.product.originalPriceInclTax | price }}</span>
      </div>
      <div v-if="!productLink.product.special_price && productLink.product.priceInclTax">
        {{ productLink.product.priceInclTax | price }}
      </div>

      <input type="number" min="1" v-model.number="productLink.product.qty">
    </li>
  </ul>
</template>
<script>
export default {
  name: 'ProductLinks',
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>
