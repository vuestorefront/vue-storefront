<template>
  <div>
    Core product row
  </div>
</template>

<script>
import AddToCart from 'src/components/core/AddToCart.vue'

export default {
  name: 'product',
  props: ['product'],
  computed: {
    thumbnail () {
      return this.getThumbnail(this.product.image, 150, 150)
    }
  },
  components: {
    AddToCart
  }
}
</script>

