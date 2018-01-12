<template>
  <div class="microcart bg-lightgray c-black" :class="{ active: isOpen }">
    <div class="row middle-xs bg-white top-sm">
      <div class="col-xs-10">
        <h2 v-if="items.length" class="c-black mt60 mb35 ml40 microcart-heading">
          Shopping cart
        </h2>
      </div>
      <div class="col-xs-2 end-xs">
        <button type="button" class="p0 close-button">
          <i class="material-icons p15 close c-black" @click="closeMicrocart">
            close
          </i>
        </button>
      </div>
    </div>

    <h4 v-if="!items.length" class="c-black ml30">
      Your shopping cart is empty.
    </h4>
    <div v-if="!items.length" class="ml30" @click="closeMicrocart">
      Don't hesitate and <router-link to="/">browse our catalog</router-link> to find something beatufiul for You!
    </div>
    <ul class="bg-white m0 products">
      <product v-for="product in items" :key="product.id" :product="product" />
    </ul>
    <div v-if="items.length" class="checkout pt10 serif">
      <h3 class="m40 c-black weight-400">
        Shopping summary
      </h3>
      <div class="row pt15 pb20 pl40 pr55">
        <div class="col-xs c-black">
          Subtotal inc. tax
        </div>
        <div class="col-xs align-right c-black">
          {{ subtotalInclTax | price }}
        </div>
      </div>
      <div class="row pt20 pb20 pl40 pr55">
        <div class="col-xs c-black">
          Shipping ({{ shipping.name }})
        </div>
        <div class="col-xs align-right c-black">
          {{ shipping.costInclTax | price }}
        </div>
      </div>
      <div class="row pt20 pb20 pl40 pr55">
        <div class="col-xs c-black">
          Payment ({{ payment.name }})
        </div>
        <div class="col-xs align-right c-black" v-if='payment.cost > 0'>
          {{ payment.costInclTax | price }}
        </div>
      </div>
      <div class="row pt20 pb20 pl40 pr55">
        <div class="col-xs weight-400 c-black">
          Total inc. tax
        </div>
        <div class="col-xs align-right weight-400 h3 c-black">
          {{ totalInclTax | price }}
        </div>
      </div>
      <div class="row pt20 pb20 pl40 pr55" v-if="!isCheckoutMode">
        <div class="col-xs align-right">
          <router-link class="no-underline" :to="{ name: 'checkout' }">
            <button class="ripple checkout-button bg-black brdr-none c-white pb20 pt20 pl70 pr70" @click="closeMicrocart">
              CHECKOUT
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import Product from './Product'

export default {
  created () {
  },
  components: {
    Product
  },
  mixins: [coreComponent('core/blocks/Microcart/Microcart')]
}
</script>

<style lang="scss" scoped>
  @import "../../../../css/transitions.scss";

  .microcart {
      height: 100vh;
      width: 800px;
      top: 0;
      right: 0;
      max-width: 100%;
      position: fixed;
      z-index: 3;
      transform: translateX(100%);
      transition: transform 300ms $motion-main;
      overflow-y: auto;
      overflow-x: hidden;
  }

  .microcart-heading {
    @media (max-width: 767px) {
      margin: 12px 0 12px 15px;
      font-size: 24px;
    }

    i {
      opacity: 0.6;
      &:hover {
        opacity: 1;
      }
    }
  }

  .close-button {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .microcart.active {
    transform: translateX(0)
  }
</style>
