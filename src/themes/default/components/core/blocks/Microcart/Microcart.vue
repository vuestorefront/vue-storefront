<template>
  <div
    class="microcart mw-100 fixed cl-accent"
    :class="[items.length ? 'bg-cl-secondary' : 'bg-cl-primary', { active: isOpen }]"
  >
    <div class="row middle-xs bg-cl-primary top-sm">
      <div class="col-xs-10">
        <h2
          v-if="items.length"
          class="cl-accent mt60 mb35 ml40 heading"
        >
          {{ $t('Shopping cart') }}
        </h2>
      </div>
      <div class="col-xs-2 end-xs">
        <button type="button" class="p0 brdr-none bg-cl-transparent close" @click="closeMicrocart">
          <i class="material-icons p15 cl-accent">
            close
          </i>
        </button>
      </div>
    </div>

    <h4 v-if="!items.length" class="cl-accent ml30">
      {{ $t('Your shopping cart is empty.') }}
    </h4>
    <div v-if="!items.length" class="ml30" @click="closeMicrocart">
      {{ $t("Don't hesitate and") }}
      <router-link to="/">
        {{ $t('browse our catalog') }}
      </router-link>
      {{ $t('to find something beautiful for You!') }}
    </div>
    <ul v-if="items.length" class="bg-cl-primary m0 px40 pb40 products">
      <product v-for="product in items" :key="product.sku" :product="product" />
    </ul>
    <div v-if="items.length" class="summary px40 cl-accent serif">
      <h3 class="m0 pt40 mb30 weight-400 summary-heading">
        {{ $t('Shopping summary') }}
      </h3>
      <div v-for="(segment, index) in totals" :key="index" class="row py20" v-if="segment.code !== 'grand_total'">
        <div class="col-xs">
          {{ segment.title }}
          <button v-if="coupon && segment.code === 'discount'" type="button" class="p0 brdr-none bg-cl-transparent close delete-button ml10" @click="removeCoupon">
            <i class="material-icons cl-accent">
              close
            </i>
          </button>
        </div>
        <div v-if="segment.value != null" class="col-xs align-right">
          {{ segment.value | price }}
        </div>
        <div v-if="isOnline && segment.code === 'discount' && !addCouponPressed" class="col-xs-12 pt30">
          <a class="cl-secondary link" href="#" @click="addDiscountCoupon">
            {{ $t('Add a discount code') }}
          </a>
        </div>
        <div v-if="isOnline && segment.code === 'discount' && addCouponPressed" class="col-xs-12 pt30 coupon-wrapper">
          <div class="coupon-input">
            <label class="h6 cl-secondary">{{ $t('Discount code') }}</label>
            <base-input type="text" id="couponinput" :autofocus="true" v-model.trim="couponCode" @keyup="enterCoupon"/>
          </div>
          <button-outline color="dark" :disabled="!couponCode" @click.native="applyCoupon">{{ $t('Add discount code') }}</button-outline>
        </div>
      </div>

      <div class="row pt30 pb20 weight-700 middle-xs" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
        <div class="col-xs h4 total-price-label">
          {{ segment.title }}
        </div>
        <div class="col-xs align-right h2 total-price-value">
          {{ segment.value | price }}
        </div>
      </div>
    </div>
    <div
      class="row py20 px40 middle-xs actions"
      v-if="items.length && !isCheckoutMode"
    >
      <div class="col-xs-12 col-sm first-sm">
        <router-link to="/" class="no-underline cl-secondary link">
          <span @click="closeMicrocart">
            {{ $t('Return to shopping') }}
          </span>
        </router-link>
      </div>
      <div class="col-xs-12 first-xs col-sm-4 end-sm">
        <button-full
          :link="{ name: 'checkout' }"
          @click.native="closeMicrocart"
        >
          {{ $t('Go to checkout') }}
        </button-full>
      </div>
    </div>
  </div>
</template>

<script>
import Microcart from 'core/components/blocks/Microcart/Microcart'
import Product from './Product'
import ButtonFull from 'theme/components/theme/ButtonFull'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'

export default {
  components: {
    Product,
    ButtonFull,
    ButtonOutline,
    BaseInput
  },
  mixins: [Microcart]
}
</script>

<style lang="scss" scoped>
  @import "~theme/css/animations/transitions";

  .microcart {
    top: 0;
    right: 0;
    z-index: 3;
    height: 100%;
    width: 800px;
    min-width: 320px;
    transform: translateX(100%);
    transition: transform 300ms $motion-main;
    overflow-y: auto;
    overflow-x: hidden;
    &.active {
      transform: translateX(0)
    }
  }

  .close {
    i {
      opacity: 0.6;
    }
    &:hover,
    &:focus {
      i {
        opacity: 1;
      }
    }
  }

  .heading {
    @media (max-width: 767px) {
      margin: 12px 0 12px 15px;
      font-size: 24px;
    }
  }

  .products {
    @media (max-width: 767px) {
      padding: 30px 15px;
    }
  }

  .actions {
    @media (max-width: 767px) {
      padding: 0 15px;
    }
    .link {
      @media (max-width: 767px) {
        display: flex;
        justify-content: center;
        padding: 20px 70px;
        &.checkout {
          margin-top: 55px;
          padding: 0;
        }
      }
    }
  }

  .summary {
    @media (max-width: 767px) {
      padding:  0 15px;
      font-size: 12px;
    }
  }

  .summary-heading {
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }

  .total-price-label {
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }

  .total-price-value {
    @media (max-width: 767px) {
      font-size: 24px;
    }
  }

  .delete-button {
    vertical-align: middle;
  }

  .coupon-wrapper {
    display: flex;

    .button-outline {
      text-transform: inherit;
      width: 50%;
    }

    .coupon-input {
      margin-right: 20px;
      width: 100%;
    }
  }
</style>
