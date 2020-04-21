<template>
  <div>
    <div class="highlighted">
      <SfHeading
        :level="3"
        title="Order summary"
        class="sf-heading--left sf-heading--no-underline title"
      />
      <!-- <div class="total-items">
        <h3>Total items: {{ totalItems }}</h3>
        <SfButton class="sf-button--text" @click="listIsHidden = !listIsHidden">
          {{ listIsHidden ? "Show" : "Hide" }} items list
        </SfButton>
      </div>
      <transition name="fade">
        <div v-if="!listIsHidden" class="collected-product-list">
          <SfCollectedProduct
            v-for="(product, index) in products"
            :key="index"
            :qty="cartGetters.getItemQty(product)"
            :image="cartGetters.getItemImage(product)"
            :title="cartGetters.getItemName(product)"
            :regular-price="cartGetters.getItemPrice(product).regular"
            class="collected-product"
            @click:remove="removeFromCart(product)"
            @input="updateQuantity(product, $event)"
          >
            <template #configuration>
              <div class="product__properties">
                <SfProperty
                  v-for="(value, key) in cartGetters.getItemAttributes(product, ['color', 'size'])"
                  :key="key"
                  :name="key"
                  :value="value"
                  class="product__property"
                />
              </div>
            </template>
            <template #actions>
              <div>
                <div class="product__action">{{ cartGetters.getItemSku(product) }}</div>
                <div class="product__action">
                  Quantity: <span class="product__qty">{{ cartGetters.getItemQty(product) }}</span>
                </div>
              </div>
            </template>
          </SfCollectedProduct>
        </div>
      </transition> -->
    </div>
    <div class="highlighted highlighted--total">
      <SfProperty
        name="Products"
        :value="totalItems"
        class="sf-property--full-width sf-property--large property"
      />
      <SfProperty
        name="Subtotal"
        :value="totals.subtotal"
        class="sf-property--full-width sf-property--large property"
      />
      <SfProperty
        name="Shipping"
        :value="checkoutGetters.getShippingMethodPrice(chosenShippingMethod)"
        class="sf-property--full-width sf-property--large property"
      />
      <SfProperty
        name="Total"
        :value="totals.total + checkoutGetters.getShippingMethodPrice(chosenShippingMethod)"
        class="sf-property--full-width sf-property--large property-total"
      />
    </div>
    <div class="highlighted promo-code">
      <SfButton class="promo-code__button" @click="showPromoCode = !showPromoCode">
        {{ showPromoCode ? "-" : "+" }} Promo Code</SfButton>
      <transition name="fade">
        <div v-if="showPromoCode">
          <SfInput
            v-model="promoCode"
            name="promoCode"
            label="Enter promo code"
            class="promo-code__input"
          />
          <SfButton class="sf-button--full-width">Apply code</SfButton>
        </div>
      </transition>
    </div>
    <div class="highlighted">
      <SfCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="characteristic.title"
        :description="characteristic.description"
        :icon="characteristic.icon"
        class="characteristic"
      />
    </div>
  </div>
</template>
<script>

import {
  SfHeading,
  SfButton,
  SfCollectedProduct,
  SfProperty,
  SfCharacteristic,
  SfInput
} from '@storefront-ui/vue';
import { computed, ref } from '@vue/composition-api';
import { useCart, useCheckout, checkoutGetters, cartGetters } from '<%= options.composables %>';

export default {
  name: 'CartPreview',
  components: {
    SfHeading,
    SfButton,
    SfCollectedProduct,
    SfProperty,
    SfCharacteristic,
    SfInput
  },
  setup() {
    const { chosenShippingMethod } = useCheckout();
    const { cart, removeFromCart, updateQuantity } = useCart();
    const listIsHidden = ref(false);
    const promoCode = ref('');
    const showPromoCode = ref(false);
    const products = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));

    return {
      totalItems,
      listIsHidden,
      products,
      chosenShippingMethod,
      totals,
      promoCode,
      showPromoCode,
      removeFromCart,
      updateQuantity,
      checkoutGetters,
      cartGetters,
      characteristics: [
        {
          title: 'Safety',
          description: 'It carefully packaged with a personal touch',
          icon: 'safety'
        },
        {
          title: 'Easy shipping',
          description:
            'You’ll receive dispatch confirmation and an arrival date',
          icon: 'shipping'
        },
        {
          title: 'Changed your mind?',
          description: 'Rest assured, we offer free returns within 30 days',
          icon: 'return'
        }
      ]
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
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: #f1f2f3;
  padding: var(--spacer-xl);
  &:last-child {
    margin-bottom: 0;
  }
  &--total {
    margin-bottom: 1px;
  }
}
.total-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacer-xl);
}
.property {
  margin-bottom: var(--spacer-sm);
  ::v-deep .sf-property__name {
    text-transform: unset;
  }
}
.property-total {
  margin-top: var(--spacer-2xl);
  font-size: var(--font-size-extra-big-desktop);
  font-weight: 500;
  ::v-deep .sf-property__name {
    color: var(--c-text);
  }
}
.collected-product-list {
  margin: 0 -20px;
}
.collected-product {
  &:not(:last-child) {
    margin-bottom: var(--spacer-xl);
  }
}
.characteristic {
  &:not(:last-child) {
    margin-bottom: var(--spacer-xl);
  }
}
.promo-code {
  &__button {
    padding: 0;
    background-color: transparent;
    color: var(--c-primary);
    font-size: var(--font-lg-desktop);
  }
  &__input {
    margin: var(--spacer-xl) 0;
    ::v-deep input {
      border-color: var(--c-gray-variant);
    }
  }
}
.product {
  &__properties {
    margin: var(--spacer-xl) 0 0 0;
  }
  &__property,
  &__action {
    font-size: var(--font-xs-desktop);
  }
  &__action {
    color: var(--c-gray-variant);
    font-size: var(--font-xs-desktop);
    margin: 0 0 var(--spacer-sm) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__qty {
    color: var(--c-text);
  }
}
</style>
