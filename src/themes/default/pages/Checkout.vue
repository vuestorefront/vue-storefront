<template>
  <div id="checkout">
    <div class="container">
      <div class="row" v-show="!orderPlaced">
        <div class="col-sm-7 col-xs-12 pb70">
          <div class="checkout-title py5 px20">
            <h1>
              {{ $t('Checkout') }}
            </h1>
          </div>
          <personal-details class="line relative" :is-active="activeSection.personalDetails"/>
          <shipping class="line relative" :is-active="activeSection.shipping"/>
          <payment class="line relative" :is-active="activeSection.payment"/>
          <order-review class="line relative" :is-active="activeSection.orderReview"/>
        </div>
        <div class="hidden-xs col-sm-5 bg-cl-secondary">
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
import { corePage } from 'core/lib/themes'

import PersonalDetails from 'theme/components/core/blocks/Checkout/PersonalDetails.vue'
import Shipping from 'theme/components/core/blocks/Checkout/Shipping.vue'
import Payment from 'theme/components/core/blocks/Checkout/Payment.vue'
import OrderReview from 'theme/components/core/blocks/Checkout/OrderReview.vue'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary.vue'
import ThankYouPage from 'theme/components/core/blocks/Checkout/ThankYouPage.vue'

export default {
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    OrderReview,
    CartSummary,
    ThankYouPage
  },
  mixins: [corePage('Checkout')]
}
</script>

<style lang="scss">
@import '~theme/css/base/text';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$bg-secondary: color(secondary, $colors-background);
$color-tertiary: color(tertiary);
$color-secondary: color(secondary);
$color-error: color(error);
$color-white: color(white);
$color-black: color(black);

#checkout {
  input[type=text], input[type=email], input[type=tel], select {
    @extend .h4;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid $color-tertiary;
    width: calc(100% - 35px);

    @media (max-width: 767px) {
      width: calc(100% - 20px);
    }
  }
  input::-webkit-input-placeholder {
    color: $color-tertiary;
  }
input:-moz-placeholder {
    color: $color-tertiary;
  }
  input:focus, select:focus {
    outline: none;
    border-color: $color-black;
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
    color: $color-error;
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
      background-color: $bg-secondary;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .checkout-title {
    @media (max-width: 767px) {
      background-color: $bg-secondary;
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
      background: $color-white;
      border: 1px solid $color-secondary;

      &:after {
        content: '';
        position: absolute;
        width: 11px;
        height: 5px;
        background: transparent;
        top: 6px;
        left: 5px;
        border: 3px solid $color-white;
        border-top: none;
        border-right: none;
        transform: rotate(-45deg);
      }
    }

    input[type=checkbox]:checked + label {
      background: $color-secondary;
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
      border: 1px solid $bg-secondary;

      &:after {
        content: "";
        position: absolute;
        display: none;
        top: 3px;
        left: 3px;
        width: 19px;
        height: 19px;
        border-radius: 50%;
        background: $color-secondary;
      }
    }

    input:checked ~ .checkmark:after {
      display: block;
    }
  }
}
</style>
