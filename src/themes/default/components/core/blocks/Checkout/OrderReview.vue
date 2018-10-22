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
        <div id="checkout-order-review-additional-container">
          <div id="checkout-order-review-additional">&nbsp;</div>
        </div>
        <div class="row mb15 mt20">
          <div class="col-xs-12">
            <p class="h4">
              {{ $t('Please check if all data are correct') }}
            </p>
            <div class="row">
              <div class="cartsummary-wrapper">
                <cart-summary />
              </div>
              <base-checkbox
                class="col-xs-11 col-sm-12 col-md-8 bg-cl-secondary p15 mb35 ml10"
                id="acceptTermsCheckbox"
                @click="orderReview.terms = !orderReview.terms"
                @blur="$v.orderReview.terms.$touch()"
                v-model="orderReview.terms"
                :validation="{
                  condition: !$v.orderReview.terms.required && $v.orderReview.terms.$error,
                  text: $t('Field is required')
                }"
              >
                {{ $t('I agree to') }}
                <span
                  class="link pointer"
                  @click.prevent="$bus.$emit('modal-toggle', 'modal-terms')"
                >
                  {{ $t('Terms and conditions') }}
                </span>
              </base-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1"/>
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row">
          <div class="col-xs-12 col-md-8 px20">
            <slot name="placeOrderButton">
              <button-full
                @click.native="placeOrder"
                data-testid="orderReviewSubmit"
                class="place-order-btn"
                :disabled="$v.orderReview.$invalid"
              >
                {{ $t('Place the order') }}
              </button-full>
            </slot>
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
import Composite from '@vue-storefront/core/mixins/composite'

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import ButtonFull from 'theme/components/theme/ButtonFull'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary'
import Modal from 'theme/components/core/Modal'
import OrderReview from '@vue-storefront/core/components/blocks/Checkout/OrderReview'
import ValidationError from 'theme/components/core/ValidationError'

export default {
  components: {
    BaseCheckbox,
    ButtonFull,
    CartSummary,
    Modal,
    ValidationError
  },
  mixins: [OrderReview, Composite],
  validations: {
    orderReview: {
      terms: {
        required
      }
    }
  }
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
