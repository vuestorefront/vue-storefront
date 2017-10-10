<template>
  <div id='hp'>
    Core Home
  </div>
</template>

<script>
import builder from 'bodybuilder'

import MainSlider from '../components/core/blocks/MainSlider/MainSlider.vue'
import ProductTile from '../components/core/ProductTile.vue'

import OrderData from 'src/resource/order.json'

export default {
  name: 'Home',
  beforeMount () {
    let self = this
    let catalogQuery = builder().query('match', 'name', 'Bag').aggregation('terms', 'category.id').build()
    // mock for checkout
    self.$store.dispatch('order/placeOrder', OrderData)
    self.$store.dispatch('cart/load')

    self.$store.dispatch('product/list', {
      query: catalogQuery
    }).then(function (res) {
      self.products = res.items
    })
  },
  components: {
    ProductTile,
    MainSlider
  }
}
</script>

<style scoped>

</style>
