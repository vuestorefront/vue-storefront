<template>
  <div>
    <strong v-html="label + ': '"/>
    <span v-html="value"/>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('ProductAttribute')]
}
</script>
