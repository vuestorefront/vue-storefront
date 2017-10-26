<template>
  <div id='hp'>
    Core Home
  </div>
</template>

<script>
import Meta from 'src/lib/meta'
import MainSlider from '../components/core/blocks/MainSlider/MainSlider.vue'
import ProductTile from '../components/core/ProductTile.vue'

export default {
  name: 'Home',
  meta: {
    title: 'Home Page'
  },
  beforeMount () {
    this.$store.dispatch('category/reset')
  },
  components: {
    ProductTile,
    MainSlider
  },
  mixins: [Meta]
}
</script>

<style scoped>

</style>
