<template>
  <div id="microcart" :class="{ active: isOpen }">
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
      isOpen: true
    }
  },
  created () {
    const self = this
    EventBus.$on('toggle-microcart', function () {
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
    width: 200px;
    background: black;
    top: 0;
    color: white;
    right: -200px;
}
#microcart.active {
    right: 0;

}
</style>
