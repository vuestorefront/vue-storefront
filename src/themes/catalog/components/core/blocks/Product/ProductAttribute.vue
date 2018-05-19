<template>
  <div>
    <strong v-html="label + ': '"/>
    <span v-html="value"/>
  </div>
</template>

<script>
import productAttribute from 'core/components/ProductAttribute'

export default {
  mixins: [productAttribute]
}
</script>
