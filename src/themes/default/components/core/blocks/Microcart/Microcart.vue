<template>
  <div id="microcart" :class="{ active: isOpen }">
    <div class="row">
      <div class="col-md-12">
        <i class="material-icons p15" @click="closeMicrocart">close</i>
      </div>
    </div>

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
  cursor: pointer;
  ftext-align: right;
}
</style>
