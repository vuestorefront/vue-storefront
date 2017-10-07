<template>
  <div class="microcart-icon display-inline-flex" @click="toggleMicrocart">
    <i class="material-icons md-18">shopping_cart</i>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

export default {
  methods: {
    toggleMicrocart () {
      EventBus.$emit('toggle-microcart')
      EventBus.$emit('toggle-overlay')
    }
  },
  mixins: [coreComponent('core/blocks/Header/MicrocartIcon')]
}
</script>

<style scoped>

</style>
