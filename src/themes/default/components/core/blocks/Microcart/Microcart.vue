<template>
  <div class="microcart" :class="{ active: isOpen }">
    <div class="row">
      <div class="col-md-12">
        <i class="material-icons p15 close" @click="closeMicrocart">close</i>
      </div>
    </div>

      <ul>
        <li v-for='product in cartItems'>
          {{ product.name }} - {{ product.price.price }}  - x{{ product.quantity }}
        </li>
      </ul>
      
    </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

export default {
  data () {
    return {
      isOpen: false
    }
  },
  created () {
    const self = this
    EventBus.$on('toggle-microcart', () => {
      self.isOpen = !self.isOpen
    })
  },
  methods: {
    closeMicrocart () {
      this.isOpen = false
      EventBus.$emit('toggle-overlay')
    }
  },
  mixins: [coreComponent('core/blocks/Microcart/Microcart')]
}
</script>

<style scoped>
.microcart {
    position: fixed;
    height: 100vh;
    width: 600px;
    background: black;
    top: 0;
    color: white;
    right: -600px;
}
.microcart.active {
    right: 0;
}
.close {
  cursor: pointer;
}
</style>
