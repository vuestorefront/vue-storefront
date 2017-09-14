<template>
  <span @click="toggleMicrocart">
    <i class="material-icons md-18">shopping_cart</i>
    {{ info}}
  </span>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

export default {
  methods: {
    toggleMicrocart () {
      EventBus.$emit('toggle-microcart')
    }
  },
  mixins: [coreComponent('core/blocks/Header/MicrocartIcon')]
}
</script>

<style scoped>

</style>
