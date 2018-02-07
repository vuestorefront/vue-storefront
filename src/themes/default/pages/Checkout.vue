<template>
  <div id="checkout">
    <div class="container">
      <div class="row" v-show="!orderPlaced">
        <div class="col-sm-7 col-xs-12 pb70">
          <div class="checkout-title py5 px20">
            <h1>Checkout</h1>
          </div>
          <personal-details class="line relative" :is-active="activeSection.personalDetails"/>
          <shipping class="line relative" :is-active="activeSection.shipping"/>
          <payment class="line relative" :is-active="activeSection.payment"/>
          <order-review class="line relative" :is-active="activeSection.orderReview"/>
        </div>
        <div class="hidden-xs col-sm-5 bg-lightgray">
          <cart-summary />
        </div>
      </div>
      <div class="row" v-show="orderPlaced">
        <div class="col-xs-12">
          <thank-you-page />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { corePage } from 'lib/themes'

import PersonalDetails from 'theme/components/core/blocks/Checkout/PersonalDetails.vue'
import Shipping from 'theme/components/core/blocks/Checkout/Shipping.vue'
import Payment from 'theme/components/core/blocks/Checkout/Payment.vue'
import OrderReview from 'theme/components/core/blocks/Checkout/OrderReview.vue'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary.vue'
import Meta from 'src/lib/meta'

export default {
  meta () {
    return {
      title: 'Checkout'
    }
  },
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    OrderReview,
    CartSummary
  },
  mixins: [corePage('Checkout'), Meta]
}
</script>

<style lang="scss">
@import '../css/text.scss';
@import '~theme/css/global_vars';
$lightgray: map-get($colors, lightgray);
$lightgray-secondary: map-get($colors, lightgray-secondary);
$gray-secondary: map-get($colors, gray-secondary);
$red: map-get($colors, red);
$white: map-get($colors, white);
$gray: map-get($colors, gray);
$black: map-get($colors, black);

#checkout {
  input[type=text], input[type=email], input[type=tel], select {
    @extend .h4;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid $lightgray-secondary;
    width: calc(100% - 35px);

    @media (max-width: 767px) {
      width: calc(100% - 20px);
    }
  }
  input::-webkit-input-placeholder {
    color: $lightgray-secondary;
  }
  input:-moz-placeholder {
    color: $lightgray-secondary;
  }
  input:focus, select:focus {
    outline: none;
    border-color: $black;
    transition: 0.3s all;
  }
  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    background-color: transparent;
  }
  h4 {
    @extend .weight-200;
  }
  .button-disabled {
    opacity: 0.3;
    pointer-events: none;
  }
  .validation-error{
    color: $red;
    display: block;
  }
  .number-circle {
    width: 35px;
    height: 35px;

    @media (max-width: 768px) {
      width: 25px;
      height: 25px;
      line-height: 25px;
    }
  }
  h3 {
    @media (max-width: 767px) {
      font-size: 18px;
      padding-left: 10px;
    }
  }
  .line {
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 37px;
      z-index: -1;
      width: 1px;
      height: 100%;
      background-color: $lightgray;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .checkout-title {
    @media (max-width: 767px) {
      background-color: $lightgray;
      margin-bottom: 25px;

      h1 {
        font-size: 36px;
      }
    }
  }

  .checkboxStyled {
    width: 23px;
    position: relative;
    display: table-cell;

    label {
      cursor: pointer;
      position: absolute;
      width: 23px;
      height: 23px;
      top: 0;
      left: 0;
      background: $white;
      border: 1px solid $gray-secondary;

      &:after {
        content: '';
        position: absolute;
        width: 11px;
        height: 5px;
        background: transparent;
        top: 6px;
        left: 5px;
        border: 3px solid $white;
        border-top: none;
        border-right: none;
        transform: rotate(-45deg);
      }
    }

    input[type=checkbox]:checked + label {
      background: $gray-secondary;
    }
  }

  .checkboxText {
    display: table-cell;
    cursor: pointer;
    padding-left: 10px;

    span {
      vertical-align: middle;
      font-size: 18px;
    }
  }

  .container {
    height: 100%;
  }

  .bottom-button {
    @media (max-width: 767px) {
      text-align: center;
      padding-left: 0px;
      padding-right: 0px;
    }

    a {
      font-size: 18px;
    }
  }

  .radioStyled {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 16px;
    line-height: 30px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      border-radius: 50%;
      border: 1px solid $lightgray;

      &:after {
        content: "";
        position: absolute;
        display: none;
        top: 3px;
        left: 3px;
        width: 19px;
        height: 19px;
        border-radius: 50%;
        background: $gray-secondary;
      }
    }

    input:checked ~ .checkmark:after {
      display: block;
    }
  }
}
</style>
