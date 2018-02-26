<template>
  <div id="hp">
    Core Home
  </div>
</template>

<script>
import Meta from 'core/lib/meta'
import MainSlider from 'core/components/blocks/MainSlider/MainSlider.vue'
import ProductTile from 'core/components/ProductTile.vue'

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
