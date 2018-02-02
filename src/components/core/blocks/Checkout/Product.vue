<template>
  <div>
    Core product row
  </div>
</template>

<script>
export default {
  name: 'product',
  props: ['product'],
  computed: {
    thumbnail () {
      return this.getThumbnail(this.product.image, 150, 150)
    }
  }
}
</script>

