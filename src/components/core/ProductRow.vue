<template>
  <div>
    Core product row
  </div>  
</template>

<script>
import AddToCart from './AddToCart.vue'
import { thumbnail } from '../../lib/filters'

export default {
  name: 'product-row',
  props: ['product'],
  components: { AddToCart },
  computed: {
    thumbnail () {
      return thumbnail(this.product.image, 150, 150)
    }
  }
}
</script>

