<template>
  <div>
    <strong v-html="label + ': '"></strong>
    <span v-html="value"></span>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/ProductAttribute')]
}
</script>