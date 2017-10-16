<template>
  <div class="microcart-icon" @click="toggleMicrocart">
    <i class="material-icons md-18">shopping_cart</i>
    <span class="minicart-count" v-cloak>{{totals.quantity}}</span>
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
    display: flex;
    top: -5px;
    left: -5px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    font-weight: 700;
    background-color: #8e8e8e;
    color: #fff;
  }
</style>
