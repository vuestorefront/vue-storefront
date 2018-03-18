<template>
  <div class="order-review pt20">
    <div class="row pl20">
      <div class="col-xs-1 col-sm-2 col-md-1">
        <div
          class="number-circle lh35 cl-white brdr-circle align-center weight-700"
          :class="{ 'bg-cl-th-accent' : isActive || isFilled, 'bg-cl-tertiary' : !isFilled && !isActive }"
        >
          4
        </div>
      </div>
      <div class="col-xs-11 col-sm-9 col-md-11">
        <div class="row">
          <div class="col-md-12" :class="{ 'cl-bg-tertiary' : !isFilled && !isActive }">
            <h3 class="m0">
              {{ $t('Review order') }}
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row pl20 pr20" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1"/>
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row mb15 mt20" v-show="isActive">
          <div class="col-xs-12">
            <p class="h4">
              {{ $t('Please check if all data are correct') }}
            </p>
            <div class="row">
              <div class="cartsummary-wrapper">
                <cart-summary />
              </div>
              <div class="col-xs-11 col-sm-12 col-md-8 bg-cl-secondary p15 mb35 ml10">
                <div class="checkboxStyled relative">
                  <input type="checkbox" v-model="orderReview.terms" id="acceptTermsCheckbox" @blur="$v.orderReview.terms.$touch()">
                  <label class="absolute brdr-gray bg-cl-secondary pointer" for="acceptTermsCheckbox"/>
                </div>
                <div class="checkboxText ml15 lh25 pointer">
                  <span class="fs16 cl-accent" @click="orderReview.terms = !orderReview.terms">
                    {{ $t('I agree to') }}
                    <span class="link pointer" @click.stop="$bus.$emit('modal-toggle', 'modal-terms')">
                      {{ $t('Terms and conditions') }}
                    </span>
                  </span>
                </div>
                <span
                  class="validation-error"
                  v-if="!$v.orderReview.terms.required && $v.orderReview.terms.$error"
                >
                  {{ $t('Field is required') }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1"/>
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row">
          <div class="col-xs-12 col-md-8 col-md-offset-4 px20">
            <button-full
              @click.native="placeOrder"
              :class="{ 'button-disabled' : $v.orderReview.$invalid }"
            >
              {{ $t('Place the order') }}
            </button-full>
          </div>
        </div>
      </div>
    </div>

    <modal name="modal-terms" static-data="terms">
      <p slot="header">
        {{ $t('Terms and conditions') }}
      </p>
    </modal>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { coreComponent } from 'core/lib/themes'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import ValidationError from 'theme/components/core/ValidationError.vue'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary.vue'
import Modal from 'theme/components/core/Modal.vue'

export default {
  validations: {
    orderReview: {
      terms: {
        required
      }
    }
  },
  components: {
    ButtonFull,
    ValidationError,
    CartSummary,
    Modal
  },
  mixins: [coreComponent('blocks/Checkout/OrderReview')]
}
</script>

<style lang="scss" scoped>
  .link {
    text-decoration: underline;
  }

  .cartsummary-wrapper {
    @media (min-width: 767px) {
      display: none;
    }
  }
</style>
