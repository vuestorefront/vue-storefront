<template>
  <div id="microcart" :class="{ active: isOpen }">
      <div class="material-icons close" @click="isOpen = false">close</div>
      <ul>
        <li v-for='product in cartItems'>
          {{ product._source.name[0] }} - {{ product._source.price[0].price }}  - x{{ product.quantity }}
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
  mixins: [coreComponent('core/blocks/Microcart/Microcart')]
}
</script>

<style scoped>
#microcart {
    position: absolute;
    height: 100vh;
    width: 600px;
    background: black;
    top: 0;
    color: white;
    right: -600px;
}
#microcart.active {
    right: 0;
}
#microcart .close {
  cursor: pointer
}
</style>
