<template>
  <div class="payment">
    <div class="row">
      <div class="col-md-12 mb15">
        <h3>Payment</h3>
      </div>
    </div>
    <div class="row">
      <div v-for="(method, index) in paymentMethods" :key="index" class="col-md-6 mb15">
        <label><input type="radio" :value="method.code" name="paymentmethod" v-model="payment.paymentMethod" v-on:change="sendDataToCheckout"> {{ method.name }} | {{ method.cost | price }} </label>
      </div>
      <div class="col-md-12 my30">
        <button-full @click="sendDataToCheckout" text="Go review the order" color="dark" />
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'
import PaymentMethods from 'src/resource/payment_methods.json'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'

export default {
  props: ['isActive'],
  data () {
    return {
      isFilled: false,
      paymentMethods: PaymentMethods,
      payment: {
        paymentMethod: 'cod'
      }
    }
  },
  methods: {
    sendDataToCheckout () {
      EventBus.$emit('checkout.payment', this.payment)
    }
  },
  components: {
    ButtonFull
  },
  mixins: [coreComponent('core/blocks/Checkout/Payment')]
}
</script>

<style scoped>

</style>
