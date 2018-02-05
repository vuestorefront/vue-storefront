<template>
  <div>
    <strong v-html="label + ': '"/>
    <span v-html="value"/>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/ProductAttribute')]
}
</script>
