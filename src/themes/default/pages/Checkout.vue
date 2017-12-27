<template>
  <div id="checkout">
    <div class="container">
      <div class="row" v-show="!orderPlaced">
        <div class="col-sm-7 col-xs-12 pb70 pl40">
          <header>
            <h1 class="mb55">Checkout</h1>
          </header>
          <personal-details class="line relative" :is-active="activeSection.personalDetails"/>
          <shipping class="line relative" :is-active="activeSection.shipping"/>
          <payment class="line relative" :is-active="activeSection.payment"/>
          <order-review class="line relative" :is-active="activeSection.orderReview"/>
        </div>
        <div class="col-sm-5 col-xs-12 bg-lightgray">
            <cart-summary />
        </div>
      </div>
      <div class="row" v-show="orderPlaced">
        <div class="col-xs-12">
          <thank-you-page />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { corePage } from 'lib/themes'

import PersonalDetails from 'theme/components/core/blocks/Checkout/PersonalDetails.vue'
import Shipping from 'theme/components/core/blocks/Checkout/Shipping.vue'
import Payment from 'theme/components/core/blocks/Checkout/Payment.vue'
import OrderReview from 'theme/components/core/blocks/Checkout/OrderReview.vue'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary.vue'

export default {
  name: 'Checkout',
  beforeMount () {
    if (this.$store.state.cart.cartItems.length === 0) {
      this.$bus.$emit('notification', {
        type: 'warning',
        message: 'Shopping cart is empty. Please add some products before entering Checkout',
        action1: { label: 'OK', action: 'close' }
      })
      this.$router.push('/')
    } else {
      this.stockCheckCompleted = false
      for (let product of this.$store.state.cart.cartItems) { // check the results of online stock check
        const checkPromises = []
        if (product.onlineStockCheckid) {
          checkPromises.push(new Promise((resolve, reject) => {
            global.db.syncTaskCollection.getItem(product.onlineStockCheckid, function (err, item) {
              if (err) {
                console.error(err)
                resolve(null)
              } else {
                product.stock = item.result
                resolve(product)
              }
            })
          }))
          Promise.all(checkPromises).then(checkedProducts => {
            this.stockCheckCompleted = true
            this.stockCheckOK = true
            for (let chp of checkedProducts) {
              if (chp && chp.stock) {
                if (!chp.stock.is_in_stock) {
                  this.stockCheckOK = false
                  chp.warning_message = 'Out of stock!'
                  this.$bus.$emit('notification', {
                    type: 'error',
                    message: chp.name + ' is out of the stock!',
                    action1: { label: 'OK', action: 'close' }
                  })
                }
              }
            }
          })
        }
      }
    }
  },
  created () {
    // TO-DO: Dont use event bus ad use v-on at components (?)
    this.$bus.$on('network.status', (status) => { this.checkConnection(status) })
    // TO-DO: Use one event with name as apram
    this.$bus.$on('checkout.personalDetails', (receivedData, validationResult) => {
      this.personalDetails = receivedData
      this.validationResults.personalDetails = validationResult
      this.activateSection('shipping')
      this.savePersonalDetails()
    })
    this.$bus.$on('checkout.shipping', (receivedData, validationResult) => {
      this.shipping = receivedData
      this.validationResults.shipping = validationResult
      global.__TAX_COUNTRY__ = this.shipping.country
      this.activateSection('payment')
      this.saveShippingDetails()
    })
    this.$bus.$on('checkout.payment', (receivedData, validationResult) => {
      this.payment = receivedData
      this.validationResults.payment = validationResult
      this.activateSection('orderReview')
    })
    this.$bus.$on('checkout.cartSummary', (receivedData) => {
      this.cartSummary = receivedData
    })
    this.$bus.$on('checkout.placeOrder', () => this.placeOrder())
    this.$bus.$on('checkout.edit', (section) => {
      this.activateSection(section)
    })
  },
  destroyed () {
    this.$bus.$off('network.status')
    this.$bus.$off('checkout.personalDetails')
    this.$bus.$off('checkout.shipping')
    this.$bus.$off('checkout.payment')
    this.$bus.$off('checkout.cartSummary')
    this.$bus.$off('checkout.placeOrder')
    this.$bus.$off('checkout.edit')
  },
  computed: {
    isValid () {
      let isValid = true
      for (let child of this.$children) {
        console.log('Child: ', child)
        if (child.hasOwnProperty('$v')) {
          if (child.$v.$invalid) {
            // Check if child component is Personal Details.
            // If so, then ignore validation of account creation fields.
            if (child.$v.hasOwnProperty('personalDetails')) {
              if (child.$v.personalDetails.$invalid) {
                isValid = false
                break
              }
            } else {
              isValid = false
              break
            }
          }
        }
      }

      if (navigator.onLine) {
        if (this.stockCheckCompleted) {
          if (!this.stockCheckOK) {
            isValid = false
            this.$bus.$emit('notification', {
              type: 'error',
              message: 'Some of the ordered products are not available!',
              action1: { label: 'OK', action: 'close' }
            })
          }
        } else {
          this.$bus.$emit('notification', {
            type: 'warning',
            message: 'Stock check in progress, please wait while available stock quantities are checked',
            action1: { label: 'OK', action: 'close' }
          })
          isValid = false
        }
      }
      return isValid
    }
  },
  data () {
    return {
      stockCheckCompleted: false,
      stockCheckOK: false,
      orderPlaced: false,
      activeSection: {
        personalDetails: true,
        shipping: false,
        payment: false,
        orderReview: false
      },
      order: {},
      personalDetails: {},
      shipping: {},
      payment: { paymentMethod: 'cashondelivery' },
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
        this.$bus.$emit('notification', {
          type: 'warning',
          message: 'There is no Internet connection. You can still place your order. We will notify you if any of ordered products is not avaiable because we cannot check it right now.',
          action1: { label: 'OK', action: 'close' }
        })
      }
    },
    activateSection (sectionToActivate) {
      for (let section in this.activeSection) {
        this.activeSection[section] = false
      }
      this.activeSection[sectionToActivate] = true
    },
    prepareOrder () {
      this.order = {
        products: this.$store.state.cart.cartItems,
        addressInformation: {
          shippingAddress: {
            region: this.shipping.state,
            region_id: 0,
            country_id: this.shipping.country,
            street: [this.shipping.streetAddress, this.shipping.apartmentNumber],
            company: 'NA', // TODO: Fix me! https://github.com/DivanteLtd/vue-storefront/issues/224
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
            country_id: this.shipping.country,
            street: [this.shipping.streetAddress, this.shipping.apartmentNumber],
            company: 'NA',
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
        this.orderPlaced = true
        console.log(this.order)
      } else {
        this.$bus.$emit('notification', {
          type: 'error',
          message: 'Please do correct validation errors',
          action1: { label: 'OK', action: 'close' }
        })
      }
    },
    savePersonalDetails () {
      this.$store.dispatch('checkout/savePersonalDetails', this.personalDetails)
    },
    saveShippingDetails () {
      this.$store.dispatch('checkout/saveShippingDetails', this.shipping)
    }
  },
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    OrderReview,
    CartSummary
  },
  mixins: [corePage('Checkout')]
}
</script>

<style lang="scss">
@import '../css/text.scss';
@import '~theme/css/global_vars';
$lightgray: map-get($colors, lightgray);

#checkout {
  input[type=text], input[type=email], input[type=tel], select {
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
  input:focus, select:focus {
    outline: none;
    border-color: black;
    transition: 0.3s all;
  }
  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    background-color: transparent;
  }
  h4 {
    @extend .weight-200;
  }
  .button-disabled {
    opacity: 0.3;
    pointer-events: none;
  }
  .validation-error{
    color: red;
    display: block;
  }
  .number-circle {
    width: 35px;
    height: 35px;
  }
  .line {
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 17px;
      z-index: -1;
      width: 1px;
      height: 100%;
      background-color: $lightgray;
    }
  }
}
</style>
