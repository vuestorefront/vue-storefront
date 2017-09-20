<template>
  <div class="inspirations">
    <div class="row">
      <div class="col-md-4 p15" v-for="product in products">
        <inspiration-tile :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import InspirationTile from './InspirationTile.vue'
import productData from '../../../../resource/products.json'

export default {
  name: 'inspirations',
  data () {
    return {
      products: productData.data
    }
  },
  components: {
    InspirationTile
  }
}
</script>

<style scoped>
</style>