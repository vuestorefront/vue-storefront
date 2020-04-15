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
                :key="cartGetters.getItemSku(product)"
                :image="cartGetters.getItemImage(product)"
                :title="cartGetters.getItemName(product)"
                :regular-price="cartGetters.getItemPrice(product).regular"
                :stock="99999"
                :qty="cartGetters.getItemQty(product)"
                @input="updateQuantity(product, $event)"
                @click:remove="removeFromCart(product)"
                class="collected-product"
              >
                <template #configuration>
                  <div class="collected-product__properties">
                    <SfProperty
                      v-for="(value, key) in cartGetters.getItemAttributes(product, ['color', 'size'])"
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
import { useCart, cartGetters } from '<%= options.composables %>';
import uiState from '~/assets/ui-state';

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
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));

    return {
      products,
      removeFromCart,
      updateQuantity,
      isCartSidebarOpen,
      toggleCartSidebar,
      totals,
      totalItems,
      cartGetters
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
    font: 400 var(--font-lg) / 1.6 var(--font-family-secondary);
    margin: 0;
  }
  &__total-price {
    margin: 0 0 var(--spacer-xl) 0;
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
    margin: var(--spacer-2xl) 0 0 0;
    font: 400 var(--font-lg) / 1.6 var(--font-family-secondary);
  }
  &__description {
    margin: var(--spacer-xl) 0 0 0;
    font: 300 var(--font-base) / 1.6 var(--font-family-primary);
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
  margin: var(--spacer-xl) calc(var(--spacer-xl) * -1);
}
.collected-product {
  margin: var(--spacer-xl) 0;
  font: 300 var(--font-xs) / 1.6 var(--font-family-secondary);
  &__properties {
    margin: var(--spacer-xl) 0 0 0;
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
