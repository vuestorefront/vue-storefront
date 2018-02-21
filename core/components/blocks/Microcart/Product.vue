<template>
  <div>
    Core product row
  </div>
</template>

<script>
import AddToCart from 'core/components/AddToCart.vue'

export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
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
