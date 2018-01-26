<template>
  <div class="order-review pt20">
    <div class="row pl20">
      <div class="col-xs-1 col-sm-2 col-md-1">
        <div class="number-circle lh35 c-white brdr-circle align-center weight-700" :class="{ 'bg-black' : isActive || isFilled, 'bg-gray' : !isFilled && !isActive }">4</div>
      </div>
      <div class="col-xs-11 col-sm-9 col-md-11">
        <div class="row">
          <div class="col-md-12" :class="{ 'c-gray' : !isFilled && !isActive }">
            <h3 class="m0">Review order</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="row pl20 pr20" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1"></div>
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row mb15 mt20" v-show="isActive">
          <div class="col-xs-12">
            <p class="h4">Please check if all data are correct</p>
            <div class="row">
              <div class="cartsummary-wrapper">
                <cart-summary />
              </div>
              <div class="col-xs-11 col-sm-12 col-md-8 bg-lightgray p15 mb35 ml10">
                <div class="checkboxStyled">
                  <input type="checkbox" v-model="orderReview.terms" id="acceptTermsCheckbox">
                  <label for="acceptTermsCheckbox"></label>
                </div>
                <div class="checkboxText ml15 lh25">
                  <span class="fs16 c-darkgray" @click="orderReview.terms = !orderReview.terms">I agree to <span class="link" @click.stop="$bus.$emit('modal.toggle', 'modal-terms')">terms and conditions</span></span>
                </div>
                <span class="validation-error" v-if="!$v.orderReview.terms.required">Field is required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-show="isActive">
      <div class="hidden-xs col-sm-2 col-md-1"></div>
      <div class="col-xs-12 col-sm-9 col-md-11">
        <div class="row">
          <div class="col-xs-12 bottom-button">
            <button-full text="Place the order" @click.native="placeOrder"  :class="{ 'ripple': true, 'button-disabled' : $v.orderReview.$invalid}"/>
          </div>
        </div>
      </div>
    </div>

    <modal name="modal-terms" static="terms">
      <p slot="header">Terms and conditions</p>
    </modal>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { coreComponent } from 'lib/themes'
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
  mixins: [coreComponent('core/blocks/Checkout/OrderReview')]
}
</script>

<style lang="scss" scoped>

  .link {
    cursor: pointer;
    text-decoration: underline;
  }

  .checkboxStyled {
    width: 23px;
    position: relative;
    display: inline-block;

    label {
      cursor: pointer;
      position: absolute;
      width: 23px;
      height: 23px;
      top: 0;
      left: 0;
      background: #F2F2F2;
      border:1px solid #8E8E8E;

      &:after {
        content: '';
        position: absolute;
        width: 11px;
        height: 5px;
        background: transparent;
        top: 6px;
        left: 5px;
        border: 3px solid #F2F2F2;
        border-top: none;
        border-right: none;
        transform: rotate(-45deg);
      }
    }

    input[type=checkbox]:checked + label {
      background: #8E8E8E;
    }
  }

  .checkboxText {
    display: inline-block;
    cursor: pointer;
    
    span {
      vertical-align: middle;
    }
  }

  .cartsummary-wrapper {
    @media (min-width: 767px) {
      display: none;
    }
  }
</style>
