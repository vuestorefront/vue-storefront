<template>
  <div
    class="microcart cl-accent"
    :class="[productsInCart.length ? 'bg-cl-secondary' : 'bg-cl-primary']"
    data-testid="microcart"
  >
    <div class="row bg-cl-primary px40 actions">
      <div class="col-xs end-xs">
        <button
          type="button"
          class="p0 brdr-none bg-cl-transparent close"
          @click="closeMicrocartExtend"
          data-testid="closeMicrocart"
        >
          <i class="material-icons py20 cl-accent">
            close
          </i>
        </button>
      </div>
    </div>
    <div class="row middle-xs bg-cl-primary top-sm px40 actions">
      <div class="col-xs-12 col-sm">
        <h2
          v-if="productsInCart.length"
          class="cl-accent mt35 mb35"
        >
          {{ $t('Shopping cart') }}
        </h2>
      </div>
      <div class="col-xs-12 col-sm mt35 mb35 mt0 end-sm clearcart-col">
        <clear-cart-button
          v-if="productsInCart.length"
          @click.native="clearCart"
        />
      </div>
    </div>

    <h4 v-if="!productsInCart.length" class="cl-accent ml30">
      {{ $t('Your shopping cart is empty.') }}
    </h4>
    <div v-if="!productsInCart.length" class="ml30" @click="closeMicrocartExtend">
      {{ $t("Don't hesitate and") }}
      <router-link :to="localizedRoute('/')">
        {{ $t('browse our catalog') }}
      </router-link>
      {{ $t('to find something beautiful for You!') }}
    </div>
    <ul v-if="productsInCart.length" class="bg-cl-primary m0 px40 pb40 products">
      <product v-for="product in productsInCart" :key="product.sku" :product="product" />
    </ul>
    <div v-if="productsInCart.length" class="summary px40 cl-accent serif">
      <h3 class="m0 pt40 mb30 weight-400 summary-heading">
        {{ $t('Shopping summary') }}
      </h3>
      <div v-for="(segment, index) in totals" :key="index" class="row py20" v-if="segment.code !== 'grand_total'">
        <div class="col-xs">
          {{ segment.title }}
          <button v-if="appliedCoupon && segment.code === 'discount'" type="button" class="p0 brdr-none bg-cl-transparent close delete-button ml10" @click="clearCoupon">
            <i class="material-icons cl-accent">
              close
            </i>
          </button>
        </div>
        <div v-if="segment.value != null" class="col-xs align-right">
          {{ segment.value | price }}
        </div>
      </div>
      <div class="row py20">
        <div v-if="OnlineOnly && !addCouponPressed" class="col-xs-12">
          <button
            class="p0 brdr-none serif fs-medium-small cl-accent bg-cl-transparent"
            type="button"
            @click="addDiscountCoupon"
          >
            {{ $t('Add a discount code') }}
          </button>
        </div>
        <div v-if="OnlineOnly && addCouponPressed" class="col-xs-12 pt30 coupon-wrapper">
          <div class="coupon-input">
            <label class="h6 cl-secondary">{{ $t('Discount code') }}</label>
            <base-input type="text" id="couponinput" :autofocus="true" v-model.trim="couponCode" @keyup.enter="setCoupon" />
          </div>
          <button-outline color="dark" :disabled="!couponCode" @click.native="setCoupon">
            {{ $t('Add discount code') }}
          </button-outline>
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
      v-if="productsInCart.length && !isCheckoutMode"
    >
      <div class="col-xs-12 col-sm first-sm">
        <router-link :to="localizedRoute('/')" class="no-underline cl-secondary link">
          <span @click="closeMicrocartExtend">
            {{ $t('Return to shopping') }}
          </span>
        </router-link>
      </div>
      <div class="col-xs-12 first-xs col-sm-4 end-sm">
        <button-full
          :link="{ name: 'checkout' }"
          @click.native="closeMicrocartExtend"
        >
          {{ $t('Go to checkout') }}
        </button-full>
        <instant-checkout v-if="isInstantCheckoutRegistered" class="no-outline button-full block brdr-none w-100 px10 py20 bg-cl-mine-shaft :bg-cl-th-secondary ripple weight-400 h4 cl-white sans-serif fs-medium mt20" />
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import { isModuleRegistered } from '@vue-storefront/core/lib/module'

import Microcart from '@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart'
import VueOfflineMixin from 'vue-offline/mixin'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import InstantCheckout from 'src/modules/instant-checkout/components/InstantCheckout.vue'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ClearCartButton from 'theme/components/core/blocks/Microcart/ClearCartButton'
import ButtonFull from 'theme/components/theme/ButtonFull'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import Product from 'theme/components/core/blocks/Microcart/Product'

export default {
  components: {
    Product,
    ClearCartButton,
    ButtonFull,
    ButtonOutline,
    BaseInput,
    InstantCheckout
  },
  mixins: [
    Microcart,
    VueOfflineMixin,
    onEscapePress
  ],
  data () {
    return {
      addCouponPressed: false,
      couponCode: '',
      componentLoaded: false,
      isInstantCheckoutRegistered: isModuleRegistered('instant-checkout')
    }
  },
  props: {
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  },
  methods: {
    addDiscountCoupon () {
      this.addCouponPressed = true
    },
    clearCoupon () {
      this.removeCoupon()
      this.addCouponPressed = false
    },
    async setCoupon () {
      const couponApplied = await this.applyCoupon(this.couponCode)
      this.addCouponPressed = false
      this.couponCode = ''
      if (!couponApplied) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t("You've entered an incorrect coupon code. Please try again."),
          action1: { label: i18n.t('OK') }
        })
      }
    },
    closeMicrocartExtend () {
      this.closeMicrocart()
      this.$store.commit('ui/setSidebar', false)
      this.addCouponPressed = false
    },
    onEscapePress () {
      this.closeMicrocart()
    },
    clearCart () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: i18n.t('Are you sure you would like to remove all the items from the shopping cart?'),
        action1: { label: i18n.t('Cancel'), action: 'close' },
        action2: { label: i18n.t('OK'),
          action: async () => {
            await this.$store.dispatch('cart/clear', { recreateAndSyncCart: false }) // just clear the items without sync
            await this.$store.dispatch('cart/sync', { forceClientState: true })
          }
        },
        hasNoTimeout: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~theme/css/animations/transitions";

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

  .mt0 {
    @media (max-width: 767px) {
      margin-top: 0;
    }
  }

  .clearcart {
    &-col {
      display: flex;
      align-self: center;
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
