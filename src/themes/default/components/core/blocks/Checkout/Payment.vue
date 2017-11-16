<template>
  <div class="payment">
    <div class="row">
      <div class="col-md-1 col-xs-2">
        <div class="number-circle lh40 c-white brdr-circle align-center weight-700" :class="{ 'bg-black' : isActive || isFilled, 'bg-gray' : !isFilled && !isActive }">3</div> 
      </div>
      <div class="col-md-11 col-xs-10">
        <div class="row">
          <div class="col-md-12 mb15" :class="{ 'c-gray' : !isFilled && !isActive }">
            <h3 @click="edit" class="mt5" :class="{'section-editable' : isFilled && !isActive, 'section-disabled' : !isFilled && !isActive }">Payment</h3>
          </div>
        </div>
        <div class="row" v-show="this.isActive">
          <div v-for="(method, index) in paymentMethods" :key="index" class="col-md-6 mb15">
            <label><input type="radio" :value="method.code" name="paymentmethod" v-model="payment.paymentMethod"> {{ method.name }} | {{ method.cost | price }} </label>
          </div>
          <span class="validation-error" v-if="!$v.payment.paymentMethod.required">Field is required</span>
          
          <div class="col-xs-12 my30">
            <button-full @click.native="sendDataToCheckout" text="Go review the order" :class="{ 'button-disabled' : $v.payment.$invalid}"/>
          </div>
        </div>
        <div class="row fs16 mb35" v-show="isFilled">
          <div class="col-md-6">
            <strong>Payment method</strong><br>
            Cash on delivery
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'
import PaymentMethods from 'src/resource/payment_methods.json'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { required } from 'vuelidate/lib/validators'

export default {
  props: ['isActive'],
  validations: {
    payment: {
      paymentMethod: {
        required
      }
    }
  },
  data () {
    return {
      isFilled: false,
      paymentMethods: PaymentMethods,
      payment: {
        paymentMethod: 'cashondelivery'
      }
    }
  },
  methods: {
    sendDataToCheckout () {
      EventBus.$emit('checkout.payment', this.payment, this.$v)
      this.isFilled = true
    },
    edit () {
      if (this.isFilled) {
        EventBus.$emit('checkout.edit', 'payment')
        this.isFilled = false
      }
    }
  },
  components: {
    ButtonFull
  },
  mixins: [coreComponent('core/blocks/Checkout/Payment')]
}
</script>
