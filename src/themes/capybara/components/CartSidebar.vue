<template>
  <SfSidebar
    :visible="isOpen"
    @close="onClose"
    class="cart-sidebar sf-sidebar--right"
  >
    <template v-if="productsInCart.length">
      <div class="cart-sidebar__header">
        <SfHeading title="My Cart" class="sf-heading--left sf-heading--no-underline" />
        <div class="cart-sidebar__labeled-item">
          <span>Products in cart</span>
          <span>{{ productsInCart.length }}</span>
        </div>
      </div>
      <div class="cart-sidebar__content">
        {{ productsInCart }}
      </div>
      <!-- todo change to sfproperty -->
      <div class="cart-sidebar__footer">
        <div class="cart-sidebar__totals">
          <div class="cart-sidebar__labeled-item" v-for="total in totals" :key="total.title">
            <span>{{ total.title }}</span>
            <span>{{ formatPrice(total.value) }}</span>
          </div>
        </div>
        <SfButton class="sf-button--full-width">
          Checkout
        </SfButton>
      </div>
    </template>
    <div class="cart-sidebar__empty" v-else>
      <img src="/assets/sad-bag.svg" alt="empty cart"/>
      <span class="empty-cart-heading">Your cart is empty</span>
      <p>Looks like you haven’t added any items to the bag yet. Start shopping to fill it in.</p>
    </div>
  </SfSidebar>
</template>

<script>
import { SfSidebar, SfButton, SfHeading, SfProperty } from '@storefrontui/vue'

export default {
  name: 'CartSidebar',
  computed: {
    productsInCart () {
      return this.$store.state.cart.cartItems
    },
    appliedCoupon () {
      return this.$store.getters['cart/getCoupon']
    },
    totals () {
      return this.$store.getters['cart/getTotals']
    },
    isOpen () {
      return this.$store.getters['ui/isCartSidebarOpen']
    }
  },
  methods: {
    formatPrice (price) {
      return this.$options.filters.price(price)
    },
    applyCoupon (code) {
      return this.$store.dispatch('cart/applyCoupon', code)
    },
    removeCoupon () {
      return this.$store.dispatch('cart/removeCoupon')
    },
    onClose () {
      this.$store.dispatch('ui/toggleCartSidebar')
    }
  },
  components: {
    SfSidebar,
    SfButton,
    SfHeading,
    SfProperty
  }
}
</script>

<style lang="scss">
@import "~@storefrontui/vue/src/css/variables";

.cart-sidebar {
  .sf-sidebar__content {
    display: flex;
    flex-direction: column;
    & > * {
      width: 100%;
    }
  }
  &__content {
    flex-grow: 1;
    padding: $spacer-big 0;
    &--empty {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
    }
  }
  &__totals {
    background-color: $c-light-primary;
    padding: $spacer $spacer-big;
    margin-bottom: $spacer-big;
  }
  &__footer {
    align-self: flex-end;
  }
  &__empty {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    .empty-cart-heading {
      margin-top: $spacer-big;
      font-weight: 400;
      font-size: $font-size-big-mobile;
      @media (min-width: $desktop-min) {
        font-size: $font-size-big-desktop;
      }
    }
  }
  &__labeled-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: $spacer 0;
    font-size: $font-size-big-mobile;
    @media (min-width: $desktop-min) {
      font-size: $font-size-big-desktop;
    }
    span:nth-child(1) {
      color: $c-gray-primary;
    }
  }
}
</style>
