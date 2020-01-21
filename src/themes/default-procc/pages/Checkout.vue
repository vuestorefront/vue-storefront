<template>
  <div id="checkout" ref="checkout">
    <div class="container">
      <div class="row" v-show="!isThankYouPage">
<!--        // Edited By Dan-->
        <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12 mt20" style="">
          <div class="box-left">
          <!--    // Edited by Dan 02-01-2020-->
          <div class="checkout-title py5 px20">
            <h3>
              {{ $t('Checkout') }}
            </h3>
          </div>
          <personal-details
            class="line relative"
            :is-active="activeSection.personalDetails"
            :focused-field="focusedField"
          />
          <shipping class="line relative" :is-active="activeSection.shipping" v-if="!isVirtualCart" />
          <payment class="line relative" :is-active="activeSection.payment" />
          <order-review class="line relative" :is-active="activeSection.orderReview" />

          <div id="custom-steps" />
          </div>
          <div class="box-left mt20">
            <cart-summary />
          </div>
        </div>
<!--        <div class="hidden-xs col-sm-5 bg-cl-secondary">-->
<!--        // TODO: Need to make sure the cart summary shows in mobile version -> 'xs'-->
        <div class="col-lg-4 col-md-12 col-sm-12 mt20" style="z-index: 2">
          <div class="box-right">
            <order-summary />
          </div>
        </div>
      </div>
    </div>
    <thank-you-page v-show="isThankYouPage" />
  </div>
</template>

<script>
import Checkout from '@vue-storefront/core/pages/Checkout'

import PersonalDetails from 'theme/components/core/blocks/Checkout/PersonalDetails'
import Shipping from 'theme/components/core/blocks/Checkout/Shipping'
import Payment from 'theme/components/core/blocks/Checkout/Payment'
import OrderReview from 'theme/components/core/blocks/Checkout/OrderReview'
import CartSummary from 'theme/components/core/blocks/Checkout/CartSummary'
import OrderSummary from 'theme/components/core/blocks/Checkout/OrderSummary'
import ThankYouPage from 'theme/components/core/blocks/Checkout/ThankYouPage'
import { registerModule } from '@vue-storefront/core/lib/modules'
import { OrderModule } from '@vue-storefront/core/modules/order'

export default {
  components: {
    PersonalDetails,
    Shipping,
    Payment,
    OrderSummary,
    OrderReview,
    CartSummary,
    ThankYouPage
  },
  mixins: [Checkout],
  beforeCreate () {
    registerModule(OrderModule)
  },
  methods: {
    notifyEmptyCart () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Shopping cart is empty. Please add some products before entering Checkout'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyOutStock (chp) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: chp.name + this.$t(' is out of stock!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyNotAvailable () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('Some of the ordered products are not available!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyStockCheck () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Stock check in progress, please wait while available stock quantities are checked'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyNoConnection () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('There is no Internet connection. You can still place your order. We will notify you if any of ordered products is not available because we cannot check it right now.'),
        action1: { label: this.$t('OK') }
      })
    }
  }
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
    .number-circle {
      margin-top: 6px; // Added By Dan
      width: 35px;
      height: 35px;

      @media (max-width: 768px) {
        width: 25px;
        height: 25px;
        line-height: 25px;
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
        border: 1px solid $color-black;

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
  @media screen and (min-width:1200px){
  #checkout .container {max-width: 1200px;margin:0 auto;}
  }
  #app {background: #f2f2f2;}
  .box-left, .box-right {background: #fff;    border-radius: 8px;}
  .checkout-title h3, h3.order-sum{font-size: 24px;
    color: #000;
    font-weight: 700;
    margin-bottom: 24px;
    margin-top: 8px;
    line-height: 1.1;}
  #checkout .number-circle {    float: left;    margin-top: 0px;margin-right: 12px;width: 26px;
    height: 26px;
    line-height: 27px;}
  .store-info p {font-size: 16px;font-weight: 500;float: left;    margin-top: 0;margin-bottom: 8px;}
  .store-info .store-contact {float: left;margin-left: 15px;padding-left: 30px;
    position: relative;}
  .store-info .store-contact i {    position: absolute;
    left: 0;
    top: -3px;}
  #checkout .row {clear: left;}
  button.normal-icon-btn {    background: none;
    border: none;}
  .qty-add-dlt button{background: #f2f2f2;
    border: none;
    width: 28px;
    height: 28px;}
  .qty-add-dlt button i {    font-size: 18px;
    line-height: 28px;}
  .qty-add-dlt span{line-height: 28px;
    padding: 0 10px;
    display: inline-block;
    vertical-align: top;}
  .static-available {font-size: 14px;color: #da7b05;}
  .text-c-dt {text-align: center;}
  .dt-float-l {float: left;}
  .dt-float-r {float: right;}
  @media screen and (max-width: 575px){
    .text-c-dt {text-align: left;}
    .shipping-text{text-align: left !important;}
  }

</style>
