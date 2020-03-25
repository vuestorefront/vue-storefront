<template>
  <div id="cart">
    <SfSidebar
      :visible="isCartSidebarOpen"
      title="My Cart"
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
                :key="getCartProductName(product)"
                :image="getCartProductImage(product)"
                :title="getCartProductName(product)"
                :regular-price="getCartProductPrice(product)"
                :stock="99999"
                :qty="getCartProductQty(product)"
                @input="updateQuantity(product, $event)"
                @click:remove="removeFromCart(product)"
                class="collected-product"
              >
                <template #configuration>
                  <div class="collected-product__properties">
                    <SfProperty
                      v-for="(value, key) in getCartProductAttributes(product, ['color', 'size'])"
                      :key="key"
                      :name="key"
                      :value="value"
                    />
                  </div>
                </template>
                <template #actions>
                  <div class="collected-product__actions">
                    <SfButton class="sf-button--text color-secondary collected-product__action">Save for later</SfButton>
                    <SfButton class="sf-button--text color-secondary collected-product__action">Add to compare</SfButton>
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
              <SfPrice :regular="totals.subtotal" />
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
} from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import { useCart } from '<%= options.composables %>';
import uiState from '~/assets/ui-state';
import {
  getCartProducts,
  getCartTotalItems,
  getCartTotals,
  getCartProductName,
  getCartProductImage,
  getCartProductPrice,
  getCartProductQty,
  getCartProductAttributes
} from '<%= options.helpers %>';

const { isCartSidebarOpen, toggleCartSidebar } = uiState;

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
    const { cart, removeFromCart, updateQuantity } = useCart();
    const products = computed(() => getCartProducts(cart.value));
    const totals = computed(() => getCartTotals(cart.value));
    const totalItems = computed(() => getCartTotalItems(cart.value));

    return {
      products,
      removeFromCart,
      updateQuantity,
      isCartSidebarOpen,
      toggleCartSidebar,
      totals,
      totalItems,
      getCartProductName,
      getCartProductImage,
      getCartProductPrice,
      getCartProductQty,
      getCartProductAttributes
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/vue/styles";
.my-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  &__total-items {
    font: 400 var(--font-size-big) / 1.6 var(--body-font-family-secondary);
    margin: 0;
  }
  &__total-price {
    margin: 0 0 var(--spacer-big) 0;
  }
}
.empty-cart {
  display: flex;
  flex: 1;
  flex-direction: column;
  &__banner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__label,
  &__description {
    text-align: center;
  }
  &__label {
    margin: var(--spacer-extra-big) 0 0 0;
    font: 400 var(--font-size-big) / 1.6 var(--body-font-family-secondary);
  }
  &__description {
    margin: var(--spacer-big) 0 0 0;
    font: 300 var(--font-size-regular) / 1.6 var(--body-font-family-primary);
  }
  &__icon {
    width: 18.125rem;
    height: 12.3125rem;
    margin-left: 60%;
    @include for-desktop {
      margin-left: 50%;
    }
  }
}
.collected-product-list {
  flex: 1;
  margin: var(--spacer-big) calc(var(--spacer-big) * -1);
}
.collected-product {
  margin: var(--spacer-big) 0;
  font: 300 var(--font-size-extra-small) / 1.6 var(--body-font-family-secondary);
  &__properties {
    margin: var(--spacer-big) 0 0 0;
  }
  &__actions {
    transition: opacity 150ms ease-in-out;
    opacity: var(--cp-actions-opacity, 0);
  }
  &__action {
    --button-padding: 0;
  }
  &:hover {
    --cp-actions-opacity: 1;
  }
}
</style>
