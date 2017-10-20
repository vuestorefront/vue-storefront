<template>
  <div class="microcart-icon" @click="toggleMicrocart">
    <i class="material-icons md-18">shopping_cart</i>
    <span class="minicart-count l-center-vh brdr-circle fs-10 weight-700 bg-gray c-white" v-cloak>{{totals.quantity}}</span>
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
  .microcart-icon {
    display: inline-flex;
  }

  .minicart-count {
    position: relative;
    top: -5px;
    left: -5px;
    width: 16px;
    height: 16px;
  }
</style>
