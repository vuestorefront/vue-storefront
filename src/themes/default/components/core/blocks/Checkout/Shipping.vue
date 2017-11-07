<template>
  <div class="shipping">
    <div class="row">
      <div class="col-md-12 mb15">
        <h3>Shipping</h3>
      </div>
    </div>
    <div class="row" v-show="this.isActive">
      <div class="col-md-6 mb25">
        <input type="text" name="first-name" placeholder="First name" v-model="shipping.firstName">
        <span class="validation-error" v-if="!$v.shipping.firstName.required">Field is required</span>
        <span class="validation-error" v-if="!$v.shipping.firstName.minLength">Name must have at least {{$v.shipping.firstName.$params.minLength.min}} letters.</span>
      </div>
      <div class="col-md-6 mb25">
        <input type="text" name="last-name" placeholder="Last name" v-model="shipping.lastName">
        <span class="validation-error" v-if="!$v.shipping.lastName.required">Field is required</span>
      </div>
      <div class="col-md-12 mb25">
        <input type="text" name="street-address" placeholder="Street address" v-model="shipping.streetAddress">
        <span class="validation-error" v-if="!$v.shipping.streetAddress.required">Field is required</span>
      </div>
      <div class="col-md-12 mb25">
        <input type="text" name="apartment-number" placeholder="Apartment number" v-model="shipping.apartmentNumber">
      </div>
      <div class="col-md-6 mb25">
        <input type="text" name="city" placeholder="City" v-model="shipping.city">
        <span class="validation-error" v-if="!$v.shipping.city.required">Field is required</span>

      </div>
      <div class="col-md-6 mb25">
        <input type="text" name="state" placeholder="State / Province" v-model="shipping.state">
      </div>
      <div class="col-md-6 mb25">
        <input type="text" name="country" placeholder="Zip-code" v-model="shipping.zipCode">
        <span class="validation-error" v-if="!$v.shipping.zipCode.required">Field is required</span>
        <span class="validation-error" v-if="!$v.shipping.zipCode.minLength">Zip-code must have at least {{$v.shipping.zipCode.$params.minLength.min}} letters.</span>        
      </div>
      <div class="col-md-12 mb25">
        <input type="text" name="phone number" placeholder="Phone Number" v-model="shipping.phoneNumber">
      </div>
      <div class="col-md-12">
        <h4>Shipping method</h4>
      </div>
      <div v-for="(method, index) in shippingMethods" :key="index" class="col-md-6 mb15">
        <label><input type="radio" :value="method.code" name="shipping-method" v-model="shipping.shippingMethod"> {{ method.name }} | {{ method.cost | price }} </label>
      </div>
      <span class="validation-error" v-if="!$v.shipping.shippingMethod.required">Field is required</span>
      <div class="col-md-12 my30">
        <button-full @click.native="sendDataToCheckout" text="Continue to payment"/>
      </div>
    </div>

  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'
import ShippingMethods from 'src/resource/shipping_methods.json'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { required, minLength } from 'vuelidate/lib/validators'

// https://monterail.github.io/vuelidate/#sub-contextified-validators

export default {
  props: ['isActive'],
  created () {
    EventBus.$on('checkout.personalDetails', (receivedData) => {
      if (!this.isFilled) {
        this.shipping.firstName = receivedData.firstName
        this.shipping.lastName = receivedData.lastName
      }
    })
  },
  validations: {
    shipping: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required
      },
      streetAddress: {
        required
      },
      shippingMethod: {
        required
      },
      zipCode: {
        required,
        minLength: minLength(5)
      },
      city: {
        required
      }
    }
  },
  data () {
    return {
      isFilled: false,
      shippingMethods: ShippingMethods,
      shipping: {
        firstName: '',
        lastName: '',
        streetAdress: '',
        shippingMethod: 'flatrate'
      }
    }
  },
  methods: {
    sendDataToCheckout () {
      EventBus.$emit('checkout.shipping', this.shipping, this.$v)
      this.isFilled = true
      console.log('Shipping data sent to checkout')
    }
  },
  components: {
    ButtonFull
  },
  mixins: [coreComponent('core/blocks/Checkout/Shipping')]
}
</script>

<style scoped>
.validation-error{
  color: red;
  display: block;
}
</style>
