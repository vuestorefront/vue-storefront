<template>
  <div id='hp'>
    Core Home
  </div>
</template>

<script>
import MainSlider from '../components/core/blocks/MainSlider/MainSlider.vue'
import ProductTile from '../components/core/ProductTile.vue'
let bodybuilder = require('bodybuilder')

export default {
  name: 'Home',
  beforeMount () {
    this.$store.dispatch('cart/loadCart')
    // this.$store.dispatch('catalog/quickSearchByText', 'bag')

    this.$store.dispatch('catalog/quickSearchByQuery', bodybuilder().query('match', 'name', 'Bag').build()).then(function (res) { console.log(res) })
  },
  components: {
    ProductTile,
    MainSlider
  }
}
</script>

<style scoped>

</style>
