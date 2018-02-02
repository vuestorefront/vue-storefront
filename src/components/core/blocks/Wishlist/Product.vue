<template>
  <div>
    Core product row
  </div>
</template>

<script>
import { thumbnail } from 'src/lib/filters'

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
      return thumbnail(this.product.image, 150, 150)
    }
  }
}
</script>
