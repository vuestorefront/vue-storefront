<template>
  <div id="checkout">
    <div class="container">
      <div class="row">
        <div class="col-md-7 pb70">
          <header>
            <h1>Checkout</h1>
          </header>
          <personal-details :is-active="true"/>
          <shipping :is-active="true"/>
          <payment />
          <order-review />
          <button-full text="Place order" @click="placeOrder" />
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
    EventBus.$on('checkout.personalDetails', (receivedData) => { this.personalDetails = receivedData })
    EventBus.$on('checkout.shipping', (receivedData) => { this.shipping = receivedData })
    EventBus.$on('checkout.orderHistory', (receivedData) => { this.orderHistory = receivedData })
    EventBus.$on('checkout.cartSummary', (receivedData) => { this.cartSummary = receivedData })
    EventBus.$emit('notification', {
      a: 'b'
    })
  },
  data () {
    return {
      order: {},
      personalDetails: {},
      shipping: {},
      payment: {},
      orderReview: {},
      cartSummary: {}
    }
  },
  methods: {
    prepareOrder () {
      this.order = {
        products: this.cartSummary,
        addressInformation: {
          shippingAddress: {
            region: 'MH',
            region_id: 0,
            country_id: 'PL',
            street: [this.shipping.streetAddress, this.shipping.apartmentNumber],
            company: 'Company name',
            telephone: this.shipping.phoneNumber,
            postcode: this.shipping.zipCode,
            city: this.shipping.city,
            firstname: this.shipping.firstName,
            lastname: this.shipping.lastName,
            email: this.personalDetails.emailAddress,
            region_code: 'MH'
          },
          billingAddress: {
            region: 'MH',
            region_id: 0,
            country_id: 'PL',
            street: [this.shipping.streetAddress, this.shipping.apartmentNumber],
            company: 'Company name',
            telephone: this.shipping.phoneNumber,
            postcode: this.shipping.zipCode,
            city: this.shipping.city,
            firstname: this.personalDetails.firstName,
            lastname: this.personalDetails.lastName,
            email: this.personalDetails.emailAddress,
            region_code: 'MH'
          },
          shipping_method_code: this.shipping.shippingMethod,
          shipping_carrier_code: this.shipping.shippingMethod,
          payment_method_code: 'cashondelivery'
        }
      }
    },
    placeOrder () {
      this.prepareOrder()
      console.log(this.order)
      // TO-DO: Perform Vuex action to send order
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
