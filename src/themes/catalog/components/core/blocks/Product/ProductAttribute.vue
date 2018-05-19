<template>
  <div>
    <strong v-html="label + ': '"/>
    <span v-html="value"/>
  </div>
</template>

<script>
import productAttribute from 'core/components/productAttribute'

export default {
  mixins: [productAttribute]
}
</script>
