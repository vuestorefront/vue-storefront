<template>
  <div class="shipping">
    <div class="row">
      <div class="col-md-12 mb15">
        <h3>Shipping</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb25">
        <input type="text" name="first-name" placeholder="First name" v-model="shipping.firstName" v-on:change="sendDataToCheckout">
      </div>
      <div class="col-md-6 mb25">
        <input type="text" name="last-name" placeholder="Last name" v-model="shipping.lastName" v-on:change="sendDataToCheckout">
      </div>
      <div class="col-md-12 mb25">
        <input type="text" name="street-address" placeholder="Street address" v-model="shipping.streetAddress" v-on:change="sendDataToCheckout">
      </div>
      <div class="col-md-12 mb25">
        <input type="text" name="apartment-number" placeholder="Apartment number" v-model="shipping.apartmentNumber" v-on:change="sendDataToCheckout">
      </div>
      <div class="col-md-6 mb25">
        <input type="text" name="city" placeholder="City" v-model="shipping.city" v-on:change="sendDataToCheckout">
      </div>
      <div class="col-md-6 mb25">
        <input type="text" name="state" placeholder="State / Province" v-model="shipping.state" v-on:change="sendDataToCheckout">
      </div>
      <div class="col-md-6 mb25">
        <input type="text" name="country" placeholder="Country" v-model="shipping.zipCode" v-on:change="sendDataToCheckout">
      </div>
      <div class="col-md-12 mb25">
        <input type="text" name="zip-code" placeholder="Phone Number" v-model="shipping.phoneNumber" v-on:change="sendDataToCheckout">
      </div>
      <div class="col-md-12">
        <h4>Shipping method</h4>
      </div>
      <div v-for="(method, index) in shippingMethods" :key="index" class="col-md-6 mb15">
        <label><input type="radio" :value="method.code" name="shipping-method" v-model="shipping.shippingMethod" v-on:change="sendDataToCheckout"> {{ method.name }} | {{ method.cost | price }} </label>
      </div>
      <div class="col-md-12 my30">
        <button-full @click="sendDataToCheckout" text="Continue to payment" color="dark" />
      </div>
    </div>

  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'
import ShippingMethods from 'src/resource/shipping_methods.json'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'

// https://monterail.github.io/vuelidate/#sub-contextified-validators

export default {
  props: ['isActive'],
  data () {
    return {
      isFilled: false,
      shippingMethods: ShippingMethods,
      shipping: {
        firstName: '',
        lastName: '',
        streetAdress: '',
        shippingMethod: 'dpd'
      }
    }
  },
  methods: {
    sendDataToCheckout () {
      EventBus.$emit('checkout.shipping', this.shipping)
      this.isFilled = true
    }
  },
  components: {
    ButtonFull
  },
  mixins: [coreComponent('core/blocks/Checkout/Shipping')]
}
</script>

<style scoped>

</style>
