<template>
  <div class='order-review'>
    <div class="row">
      <div class="col-md-1 col-xs-2">
        <div class="number-circle lh40 c-white brdr-circle align-center weight-700" :class="{ 'bg-black' : isActive || isFilled, 'bg-gray' : !isFilled && !isActive }">4</div>
      </div>
      <div class="col-md-11 col-xs-10">
        <div class="row">
          <div class="col-md-12 mb15" :class="{ 'c-gray' : !isFilled && !isActive }">
            <h3 class="mt5" :class="{'section-editable' : isFilled && !isActive, 'section-disabled' : !isFilled && !isActive }">Review order</h3>
          </div>
        </div>
        <div class="row mb35" v-show="isActive">
          <div class="col-xs-12">
            <p>Please check if all data are correct</p>
            <div class="row">
              <div class="col-md-8  bg-lightgray p15 mb35 ml10">
                <label><input type="checkbox" name="checkbox" v-model="orderReview.terms" value="value">I agree for terms and conditions</label>
                <span class="validation-error" v-if="!$v.orderReview.terms.required">Field is required</span>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12">
                <button-full text="Place the order" @click.native="placeOrder"  :class="{ 'button-disabled' : $v.orderReview.$invalid}"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import EventBus from 'src/event-bus/event-bus'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { required } from 'vuelidate/lib/validators'

export default {
  props: ['isActive'],
  validations: {
    orderReview: {
      terms: {
        required
      }
    }
  },
  data () {
    return {
      isFilled: false,
      orderReview: {
        terms: ''
      }
    }
  },
  methods: {
    placeOrder () {
      EventBus.$emit('checkout.placeOrder')
    }
  },
  components: {
    ButtonFull
  },
  mixins: [coreComponent('core/blocks/Checkout/OrderReview')]
}
</script>

<style scoped>

</style>
