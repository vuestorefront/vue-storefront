<template>
  <div id="product">
    {{ product.name }}
  </div>
</template>

<script>
import { corePage } from 'lib/themes'

export default {
  mixins: [corePage('Product')]
}
</script>

<style scoped>
</style>
