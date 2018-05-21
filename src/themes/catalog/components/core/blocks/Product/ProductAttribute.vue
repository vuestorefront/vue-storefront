<template>
  <div>
    <strong v-html="label + ': '"/>
    <span v-html="value"/>
  </div>
</template>

<script>
import ProductAttribute from 'core/components/ProductAttribute'

export default {
  mixins: [ProductAttribute]
}
</script>
