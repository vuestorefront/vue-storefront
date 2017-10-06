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
    this.$store.dispatch('checkout/placeOrder', OrderData)
    this.$store.dispatch('cart/loadCart')
    // this.$store.dispatch('catalog/quickSearchByText', { queryText: 'bag' })

    const inst = this
    this.$store.dispatch('catalog/quickSearchByQuery', {
      query: bodybuilder().query('match', 'name', 'Bag').aggregation('terms', 'category.id').build() // docs: http://bodybuilder.js.org/
    }).then(function (res) {
      inst.products = res.items
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
