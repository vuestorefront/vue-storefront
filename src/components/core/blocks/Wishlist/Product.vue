<template>
  <div>
    Core product row
  </div>
</template>

<script>
import { thumbnail } from 'src/lib/filters'

export default {
  name: 'product',
  props: ['product'],
  computed: {
    thumbnail () {
      return thumbnail(this.product.image, 150, 150)
    }
  }
}
</script>
