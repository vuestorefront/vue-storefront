<template>
  <div class="personal-details">
    <div class="row">
      <div class="col-md-12 mb15">
        <h3>Personal Details</h3>
      </div>
    </div>
    <div class="row" v-show="isActive">
      <div class="col-md-6 mb25">
        <input type="text" name="first-name" placeholder="First name" v-model="personalDetails.firstName" v-on:change="sendDataToCheckout">
      </div>
      <div class="col-md-6 mb25">
        <input type="text" name="last-name" placeholder="Last name" v-model="personalDetails.lastName" v-on:change="sendDataToCheckout">
      </div>
      <div class="col-md-12 mb15">
        <input type="email" name="email-address" placeholder="Email address" v-model="personalDetails.emailAddress" v-on:change="sendDataToCheckout">
      </div>
      <!-- <div class="col-md-12 mb25">
        <input type="checkbox" name="create-account" value="create-account" v-model="personalDetails.createAccount">
        <label>I want to create an account</label>
      </div>
      <div class="col-md-12 mb25" v-show="personalDetails.createAccount">
        <input type="password" name="password" placeholder="Password *" v-model="personalDetails.emailAddress">
      </div>
      <div class="col-md-12 mb25" v-show="personalDetails.createAccount">
        <input type="password" name="password-confirmation" placeholder="Repeat password *" v-model="personalDetails.emailAddress">
      </div> -->
      <div class="col-md-12 my30">
        <button-full @click="sendDataToCheckout" text="Continue to shipping" color="dark" />
        <!-- <p>Or login to the existing account</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'

// https://monterail.github.io/vuelidate/#sub-contextified-validators

export default {
  props: ['isActive'],
  data () {
    return {
      isFilled: false,
      personalDetails: {
        firstName: '',
        lastName: '',
        emailAddress: ''
        // createAcount: false,
        // password: ''
      }
    }
  },
  methods: {
    sendDataToCheckout () {
      EventBus.$emit('checkout.personalDetails', this.personalDetails)
      this.isFilled = true
    }
  },
  components: {
    ButtonFull
  },
  mixins: [coreComponent('core/blocks/Checkout/PersonalDetails')]
}
</script>

<style scoped>

</style>
