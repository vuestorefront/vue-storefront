<template>
  <div class="payment">
    <div class="row">
      <div class="col-md-12">
        <h3>Payment</h3>
      </div>
    </div>
    <div class="row">
      <div v-for="(method, index) in paymentMethods" :key="index" class="col-md-6 mb25">
        <input type="radio" :value="method.code" name="paymentmethod" v-model="payment.paymentMethod">
        <label> {{ method.name }} | {{ method.cost | price }} </label>
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

import PaymentMethods from 'src/resource/payment_methods.json'

export default {
  props: ['isActive'],
  data () {
    return {
      isActive: true,
      isFilled: false,
      paymentMethods: PaymentMethods,
      payment: {
        paymentNethod: ''
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
