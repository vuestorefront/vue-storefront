<template>
  <div class="microcart bg-white c-black" :class="{ active: isOpen }">
    <div class="row">
      <div class="col-md-12 end-xs">
        <i class="material-icons p15 close c-black" @click="closeMicrocart">close</i>
      </div>
    </div>
    <h2 v-if="items.length" class="c-black ml30">Shopping cart</h2>
    <h2 v-if="!items.length" class="c-black ml30">Your shopping cart is empty</h2>
    <ul class="products">
      <product v-for="product in items" :key="product.id" :product="product" />
    </ul>
    <div v-if="items.length" class="checkout bg-lightgray pt10">
      <h3 class="ml30 c-black">Shopping summary</h3>
      <div class="row pt15 pb20 pl30 pr55">
        <div class="col-xs c-black">
          Subtotal
        </div>
        <div class="col-xs align-right c-black">
          {{ subtotal | price }}
        </div>
      </div>
      <div class="row pt20 pb20 pl30 pr55">
        <div class="col-xs c-black">
          Shipping ({{ shipping.name }})
        </div>
        <div class="col-xs align-right c-black">
          {{ shipping.cost | price }}
        </div>
      </div>
      <div class="row pt20 pb20 pl30 pr55">
        <div class="col-xs c-black">
          Payment ({{ payment.name }})
        </div>
        <div class="col-xs align-right c-black" v-if='payment.cost > 0'>
          {{ payment.cost | price }}
        </div>
      </div>
      <div class="row pt20 pb20 pl30 pr55">
        <div class="col-xs weight-400 c-black">
          Total
        </div>
        <div class="col-xs align-right weight-400 h3 c-black">
          {{ total | price }}
        </div>
      </div>
      <div class="row pt20 pb20 pl30 pr55" v-if="!isCheckoutMode">
        <div class="col-xs align-right">
              <router-link :to="{ name: 'checkout' }"><button class="checkout-button bg-black brdr-none c-white pb20 pt20 pl70 pr70">CHECKOUT</button></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import Product from '../Microcart/Product'

export default {
  components: {
    Product
  },
  mixins: [coreComponent('core/blocks/Checkout/CartSummary')]
}
</script>

<style lang="scss" scoped>
@import "../../../../css/transitions.scss";

  .microcart {
      height: 100vh;
      width: 800px;
      right: 0;
      max-width: 100%;
      position: fixed;
      top: 0;
      z-index: 2;
      transform: translateX(100%);
      transition: transform 500ms $motion-main;
      overflow-y: auto;
      overflow-x: hidden;
  }
  .microcart.active {
      transform: translateX(0)
  }
  .close {
    cursor: pointer;
  }
  i {
    opacity: 0.6;
  }
  i:hover {
    opacity: 1;
  }
</style>
