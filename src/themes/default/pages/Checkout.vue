<template>
  <div id="checkout">
    <div class="container">
      <div class="row">
        <div class="col-md-7 pb70">
          <header>
            <h1>Checkout</h1>
          </header>
          <personal-details :is-active="activeSection.personalDetails"/>
          <shipping :is-active="activeSection.shipping"/>
          <payment :is-active="activeSection.payment"/>
          <order-review :is-active="activeSection.orderReview"/>
          <button @click="placeOrder" color="dark">Place order</button> <!-- FIX ME: button-full doesn't properly support @click -->
        </div>
        <div class="col-md-5 bg-lightgray">
            <cart-summary />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * TODO: Regarding Figma.com design this page should have different layout than App.vue - how to apply it?
 * Make new template, please make an issue - Filip
 */
import { corePage } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

import PersonalDetails from 'theme/components/core/blocks/Checkout/PersonalDetails.vue'
import Shipping from 'theme/components/core/blocks/Checkout/Shipping.vue'
import Payment from 'theme/components/core/blocks/Checkout/Payment.vue'
import OrderReview from 'theme/components/core/blocks/Checkout/OrderReview.vue'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary.vue'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'

export default {
  name: 'Checkout',
  created () {
    // TO-DO: Dont use event bus ad use v-on at components (?)
    EventBus.$on('network.status', (status) => { this.checkConnection(status) })

    EventBus.$on('checkout.personalDetails', (receivedData, validationResult) => { this.personalDetails = receivedData; this.validationResults.personalDetails = validationResult })
    EventBus.$on('checkout.shipping', (receivedData, validationResult) => { this.shipping = receivedData; this.validationResults.shipping = validationResult })
    EventBus.$on('checkout.orderHistory', (receivedData) => { this.orderHistory = receivedData })
    EventBus.$on('checkout.payment', (receivedData, validationResult) => { this.payment = receivedData; this.validationResults.payment = validationResult })
    EventBus.$on('checkout.cartSummary', (receivedData) => { this.cartSummary = receivedData })
  },
  computed: {
    isValid () {
      let isValid = true
      for (let child of this.$children) {
        console.log(child)
        if (child.hasOwnProperty('$v')) {
          if (child.$v.$invalid) {
            isValid = false
            break
          }
        }
      }
      return isValid
    }
  },
  data () {
    return {
      activeSection: {
        personalDetails: true,
        shipping: true,
        payment: true,
        orderReview: true
      },
      order: {},
      personalDetails: {},
      shipping: {},
      payment: {},
      orderReview: {},
      cartSummary: {},
      validationResults: {
        personalDetails: { $invalid: true },
        shipping: { $invalid: true },
        payment: { $invalid: true }
      }
    }
  },
  methods: {
    checkConnection (status) {
      if (!status.online) {
        EventBus.$emit('notification', {
          type: 'warning',
          message: 'There is no Internet connection. You can still place your order. We will notify you if any of ordered products is not avaiable because we cannot check it right now.',
          action1: { label: 'OK', action: 'close' }
        })
      }
    },
    activateSection (activeSection) {
      for (let section in this.activeSection) {
        this.activeSection[section] = false
      }
      activeSection = true
    },
    prepareOrder () {
      this.order = {
        products: this.$store.state.cart.cartItems,
        addressInformation: {
          shippingAddress: {
            region: this.shipping.state,
            region_id: 0,
            country_id: 'US', // TODO: translate country name to country id it should be = PL, US ... => http://www.nextbits.eu/blog/magento-country-codes-for-shipping-methods-table-rate/
            street: [this.shipping.streetAddress, this.shipping.apartmentNumber],
            company: 'Company name', // TODO: Fix me! https://github.com/DivanteLtd/vue-storefront/issues/224
            telephone: this.shipping.phoneNumber,
            postcode: this.shipping.zipCode,
            city: this.shipping.city,
            firstname: this.shipping.firstName,
            lastname: this.shipping.lastName,
            email: this.personalDetails.emailAddress,
            region_code: ''
          },
          billingAddress: {
            region: this.shipping.state,
            region_id: 0,
            country_id: 'US',
            street: [this.shipping.streetAddress, this.shipping.apartmentNumber],
            company: 'Company name',
            telephone: this.shipping.phoneNumber,
            postcode: this.shipping.zipCode,
            city: this.shipping.city,
            firstname: this.personalDetails.firstName,
            lastname: this.personalDetails.lastName,
            email: this.personalDetails.emailAddress,
            region_code: ''
          },
          shipping_method_code: this.shipping.shippingMethod,
          shipping_carrier_code: this.shipping.shippingMethod,
          payment_method_code: this.payment.paymentMethod
        }
      }
      return this.order
    },
    placeOrder () {
      this.checkConnection({ online: navigator.onLine })
      if (this.isValid) {
        this.$store.dispatch('checkout/placeOrder', { order: this.prepareOrder() })
        console.log(this.order)
      } else {
        EventBus.$emit('notification', {
          type: 'error',
          message: 'Please do correct validation errors',
          action1: { label: 'OK', action: 'close' }
        })
      }
    }
  },
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    OrderReview,
    CartSummary,
    ButtonFull
  },
  mixins: [corePage('Checkout')]
}
</script>

<style lang="scss">
@import '../css/text.scss';

#checkout {
  input[type=text], input[type=email], input[type=tel] {
    @extend .h4;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid #BDBDBD;
    width: calc(100% - 35px);
  }
  input::-webkit-input-placeholder {
    color: #BDBDBD;
  }
  input:-moz-placeholder {
    color: #BDBDBD;
  }
  input:focus {
    outline: none;
    border-color: black;
    transition: 0.3s all;
  }
  h4 {
    @extend .weight-200;
  }
}
</style>
