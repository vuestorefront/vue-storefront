<template>
  <div id="hp">
      Core Home
  </div>
</template>

<script>
import MainSlider from '../components/core/blocks/MainSlider/MainSlider.vue'
import ProductTile from '../components/core/ProductTile.vue'

export default {
  name: 'Home',
  beforeMount () {
    this.$store.dispatch('loadCart')
    this.search()
  },
  components: {
    ProductTile,
    MainSlider
  }
}
</script>

<style scoped>

</style>
