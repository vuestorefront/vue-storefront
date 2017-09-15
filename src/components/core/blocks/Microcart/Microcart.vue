<template>
  <div id="microcart">
    Core Microcart
    <!-- Items in cart displayed as a list with quantitys for each item -->
    <ul>
      <li v-for='product in cartItems'>
        {{ product._source.name[0] }} - {{ product._source.price[0].price }}  - x{{ product.quantity }}
      </li>
    </ul>  
  </div>
</template>

<script>
export default {
  name: 'microcart',
  props: ['product'],
  computed: {
    cartItems () {
      return this.$store.state.cart.items
    }
  }
}
</script>

