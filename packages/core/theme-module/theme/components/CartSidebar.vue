<template>
  <div id="cart">
    <SfSidebar
      :visible="isCartSidebarOpen"
      headingTitle="My Cart"
      @close="toggleCartSidebar"
      class="sf-sidebar--right"
    >
      <transition name="fade" mode="out-in">
        <div v-if="totalItems" class="my-cart" key="my-cart">
          <h3 class="my-cart__total-items">Total items: {{ totalItems }}</h3>
          <div class="collected-product-list">
            <transition-group name="fade" tag="div">
              <SfCollectedProduct
                v-for="product in products"
                :key="product.id"
                :image="product.image"
                :title="product.title"
                :regular-price="product.price.regular"
                :special-price="product.price.special"
                :stock="99999"
                v-model="product.qty"
                @input="updateQuantity(product)"
                @click:remove="removeFromCart(product)"
                class="collected-product"
              >
                <template #configuration>
                  <div class="collected-product__properties">
                    <SfProperty
                      v-for="(property, key) in product.configuration"
                      :key="key"
                      :name="property.name"
                      :value="property.value"
                    />
                  </div>
                </template>
                <template #actions>
                  <div class="collected-product__actions">
                    <SfButton class="sf-button--text product__action">Save for later</SfButton>
                    <SfButton class="sf-button--text product__action">Add to compare</SfButton>
                  </div>
                </template>
              </SfCollectedProduct>
            </transition-group>
          </div>
          <SfProperty class="sf-property--full-width my-cart__total-price">
            <template #name>
              <span class="sf-property__name">TOTAL</span>
            </template>
            <template #value>
              <SfPrice :regular="totalPrice | price" class="sf-price--big" />
            </template>
          </SfProperty>
          <nuxt-link to="/checkout/personal-details">
            <SfButton class="sf-button--full-width">Go to checkout</SfButton>
          </nuxt-link>
        </div>
        <div v-else class="empty-cart" key="empty-cart">
          <div class="empty-cart__banner">
            <img src="@storefront-ui/shared/icons/empty_cart.svg" alt class="empty-cart__icon" />
            <h3 class="empty-cart__label">Your bag is empty</h3>
            <p class="empty-cart__description">
              Looks like you haven’t added any items to the bag yet. Start
              shopping to fill it in.
            </p>
          </div>
          <SfButton class="sf-button--full-width color-secondary">Start shopping</SfButton>
        </div>
      </transition>
    </SfSidebar>
  </div>
</template>
<script>
import {
  SfSidebar,
  SfButton,
  SfProperty,
  SfPrice,
  SfCollectedProduct
} from '@storefront-ui/vue'
import { computed } from '@vue/composition-api'
import { useCart } from '@vue-storefront/commercetools-composables'
import uiState from '~/assets/ui-state'
import {
  getCartProducts,
  getCartSubtotalPrice,
  getCartTotalItems
} from '@vue-storefront/commercetools-helpers'

const { isCartSidebarOpen, toggleCartSidebar } = uiState

export default {
  name: 'Cart',
  components: {
    SfSidebar,
    SfButton,
    SfProperty,
    SfPrice,
    SfCollectedProduct
  },
  setup() {
    const { cart, removeFromCart, updateQuantity } = useCart()
    const products = computed(() => getCartProducts(cart.value, ['color', 'size']))
    const totalPrice = computed(() => getCartSubtotalPrice(cart.value))
    const totalItems = computed(() => getCartTotalItems(cart.value))

    return {
      products,
      removeFromCart,
      updateQuantity,
      isCartSidebarOpen,
      toggleCartSidebar,
      totalPrice,
      totalItems
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/variables";
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
#cart {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
  }
}
.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    font-family: $body-font-family-secondary;
    font-size: $font-size-big-mobile;
    font-weight: $body-font-weight-secondary;
    @include for-desktop {
      font-size: $font-size-big-desktop;
    }
  }
  &__total-price {
    margin-bottom: $spacer-big;
  }
}
.collected-product-list {
  flex: 1;
  margin: $spacer-big -#{$spacer-big};
}
.collected-product {
  margin: $spacer-big 0;
  &__properties {
    margin-top: $spacer-big;
  }
  &__actions {
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    @at-root.collected-product:hover & {
      @include for-desktop {
        opacity: 1;
      }
    }
  }
}
.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__banner {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &__icon {
    width: 18.125rem;
    height: 12.3125rem;
    margin-left: 60%;
    @include for-desktop {
      margin-left: 50%;
    }
  }
  &__label,
  &__description {
    line-height: 1.6;
    text-align: center;
  }
  &__label {
    margin-top: $spacer-extra-big;
    font-size: $font-size-big-desktop;
  }
  &__description {
    margin-top: $spacer-big;
  }
}
</style>
