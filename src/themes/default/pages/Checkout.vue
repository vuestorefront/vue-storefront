<template>
  <div id="checkout">
    <div class="container">
      <div class="row" v-show="!orderPlaced">
        <div class="col-sm-7 col-xs-12 pb70 pl40">
          <header>
            <h1 class="mb55">Checkout</h1>
          </header>
          <personal-details class="line relative" :is-active="activeSection.personalDetails"/>
          <shipping class="line relative" :is-active="activeSection.shipping"/>
          <payment class="line relative" :is-active="activeSection.payment"/>
          <order-review class="line relative" :is-active="activeSection.orderReview"/>
        </div>
        <div class="col-sm-5 col-xs-12 bg-lightgray">
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

export default {
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    OrderReview,
    CartSummary
  },
  mixins: [corePage('Checkout')]
}
</script>

<style lang="scss">
@import '../css/text.scss';
@import '~theme/css/global_vars';
$lightgray: map-get($colors, lightgray);

#checkout {
  input[type=text], input[type=email], input[type=tel], select {
    @extend .h4;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid #BDBDBD;
    width: calc(100% - 35px);
  }
  input::-webkit-input-placeholder {
    color: #BDBDBD;
  }
  input:-moz-placeholder {
    color: #BDBDBD;
  }
  input:focus, select:focus {
    outline: none;
    border-color: black;
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
    color: red;
    display: block;
  }
  .number-circle {
    width: 35px;
    height: 35px;
  }
  .line {
    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 17px;
      z-index: -1;
      width: 1px;
      height: 100%;
      background-color: $lightgray;
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
      background: #FFF;
      border:1px solid #8E8E8E;

      &:after {
        content: '';
        position: absolute;
        width: 11px;
        height: 5px;
        background: transparent;
        top: 6px;
        left: 5px;
        border: 3px solid #FFF;
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
    display: table-cell;
    cursor: pointer;
    padding-left: 10px;
    
    span {
      vertical-align: middle;
    }
  }
}
</style>
