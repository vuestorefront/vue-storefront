<template>
  <div class="payment">
    <div class="row">
      <div class="col-xs-2 col-md-1">
        <div class="number-circle lh35 c-white brdr-circle align-center weight-700" :class="{ 'bg-black' : isActive || isFilled, 'bg-gray' : !isFilled && !isActive }">3</div>
      </div>
      <div class="col-xs-9 col-md-11">
        <div class="row mb15">
          <div class="col-xs-12 col-md-6" :class="{ 'c-gray' : !isFilled && !isActive }">
            <h3 class="m0 mb5">Payment</h3>
          </div>
          <div class="col-xs-12 col-md-6 pr30">
            <div class="lh30 flex end-md" v-if="isFilled && !isActive">
              <a href="#" class="c-lightgray-secondary flex" @click.prevent="edit">
                <span class="pr5">Edit payment</span>
                <i class="material-icons c-lightgray-secondary">edit</i>
              </a>
            </div>
          </div>
        </div>
        <div class="row" v-show="this.isActive">
          <div v-for="(method, index) in paymentMethods" :key="index" class="col-md-6 mb15">
            <label><input type="radio" :value="method.code" name="paymentmethod" v-model="payment.paymentMethod"> {{ method.name }} | {{ method.cost | price }} </label>
          </div>
          <span class="validation-error" v-if="!$v.payment.paymentMethod.required">Field is required</span>

          <div class="col-xs-12 my30">
            <button-full @click.native="sendDataToCheckout" text="Go review the order" :class="{ 'ripple': true, 'button-disabled' : $v.payment.$invalid}"/>
          </div>
        </div>
        <div class="row fs16 mb35" v-show="isFilled">
          <div class="col-md-6 h4">
            <h4>Payment method</h4>
            <p>
              Cash on delivery
            </p>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
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
      this.$bus.$emit('checkout.payment', this.payment, this.$v)
      this.isFilled = true
    },
    edit () {
      if (this.isFilled) {
        this.$bus.$emit('checkout.edit', 'payment')
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
