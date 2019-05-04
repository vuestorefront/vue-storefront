<template>
  <span>{{ value|htmlDecode }}</span>
</template>

<script>
import ProductAttribute from '../../ProductAttribute.vue'

export default {
  mixins: [ProductAttribute]
}
</script>
