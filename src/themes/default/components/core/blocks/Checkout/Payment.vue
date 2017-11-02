<template>
  <div class="payment">
    <div class="row">
      <div class="col-md-12">
        <h3>Payment</h3>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mb25">
        <input type="text" name="first-name" placeholder="First name"v-model="payment.firstName"> 
      </div>
      <div class="col-md-6 mb25">
        <input type="text" name="first-name" placeholder="First name"v-model="payment.firstName"> 
      </div>
      <div class="col-md-6 mb25">
        <input type="text" name="first-name" placeholder="First name"v-model="payment.firstName"> 
      </div>
      <div class="col-md-12">
        <button @click="sendDataToCheckout">Go review the order</button>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

export default {
  props: ['isActive'],
  data () {
    return {
      isActive: true,
      isFilled: false,
      payment: {
        firstName: '',
        lastName: '',
        emailAddress: '',
        paymentMethod: ''
      }
    }
  },
  methods: {
    sendDataToCheckout () {
      EventBus.$emit('checkout.payment', this.payment)
    }
  },
  mixins: [coreComponent('core/blocks/Checkout/Payment')]
}
</script>

<style scoped>

</style>
