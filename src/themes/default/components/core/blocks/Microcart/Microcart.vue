<template>
  <div class="microcart bg-white c-black" :class="{ active: isOpen }">
    <div class="row">
      <div class="col-md-12 end-xs">
        <i class="material-icons p15 close c-lightgray" @click="closeMicrocart">close</i>
      </div>
    </div>
    <h2 class="ml30">Shopping cart</h2>
    <ul>
      <product-row v-for="product in items" :key="product.id" :product="product" />
    </ul>
    <div class="checkout bg-lightgray pt10">
      <h3 class="ml30">Shopping summary</h3>
      <div class="row pt15 pb20 pl30 pr55">
        <div class="col-xs">
          Subtotal
        </div>
        <div class="col-xs align-right">
          <!-- {{ total.subtotal | price }} -->
        </div>
      </div>
      <div class="row pt20 pb20 pl30 pr55">
        <div class="col-xs">
          Shipping ({{ shipping.name }})
        </div>
        <div class="col-xs align-right">
          {{ shipping.cost | price }}
        </div>
      </div>
        <div class="col-xs">
          Payment ({{ payment.name }})
        </div>
        <div class="col-xs align-right" v-if='payment.cost > 0'>
          {{ payment.cost | price }}
        </div>
      </div>

      <div class="row pt20 pb20 pl30 pr55">
        <div class="col-xs weight-400">
          Total
        </div>
        <div class="col-xs align-right weight-400 h3">
          <!-- {{ (total.subtotal + shipping.cost + payment.cost) | price }} -->
        </div>
      </div>
      <div class="row pt20 pb20 pl30 pr55">
        <div class="col-xs align-right">
          <button class="checkout-button bg-black brdr-none c-white pb20 pt20 pl70 pr70">CHECKOUT</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'
import ProductRow from '../../ProductRow'

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
    console.log('CI  ' + self.cartItems)
  },
  methods: {
    closeMicrocart () {
      this.isOpen = false
      EventBus.$emit('toggle-overlay')
    }
  },
  components: {
    ProductRow
  },
  mixins: [coreComponent('core/blocks/Microcart/Microcart')]
}
</script>

<style scoped>
.microcart {
    height: 100vh;
    width: 600px;
    right: -600px;
    position: fixed;
    top: 0;
}
.microcart.active {
    right: 0;
}
.close {
  cursor: pointer;
}
.checkout-button {
  
}
</style>
