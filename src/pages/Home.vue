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

    const inst = this
    this.$store.dispatch('catalog/quickSearchByQuery',
      bodybuilder().query('match', 'name', 'Bag').aggregation('terms', 'category.id').build() // docs: http://bodybuilder.js.org/
    ).then(function (res) {
      inst.newProducts = res.items
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
