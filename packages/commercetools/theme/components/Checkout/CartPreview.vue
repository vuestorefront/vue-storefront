<template>
  <div>
    <div class="highlighted">
      <SfHeading
        :level="3"
        :title="$t('Order summary')"
        class="sf-heading--left sf-heading--no-underline title"
      />
    </div>
    <div class="highlighted">
      <SfProperty
        :name="$t('Products')"
        :value="totalItems"
        class="sf-property--full-width sf-property--large property"
      />
      <SfProperty
        :name="$t('Subtotal')"
        :value="$n(totals.subtotal, 'currency')"
        :class="['sf-property--full-width', 'sf-property--large property', { discounted: hasSpecialPrice }]"
      />
      <SfProperty
        v-if="hasSpecialPrice"
        :value="$n(totals.special, 'currency')"
        class="sf-property--full-width sf-property--small property special-price"
      />
      <div class="discounts">
        <SfProperty
          v-for="discount in discounts"
          :key="discount.id"
          :name="discount.name"
          :value="'-' + $n(discount.value, 'currency')"
          class="sf-property--full-width sf-property--small discount"
        />
      </div>
      <SfProperty
        :name="$t('Shipping')"
        v-if="selectedShippingMethod && selectedShippingMethod.zoneRates"
        :value="$n(getShippingMethodPrice(selectedShippingMethod, totals.total), 'currency')"
        class="sf-property--full-width sf-property--large property"
      />
      <SfProperty
        :name="$t('Total')"
        :value="$n(totals.total, 'currency')"
        class="sf-property--full-width sf-property--large property-total"
      />
    </div>
    <div class="highlighted">
      <div class="coupons">
        <SfProperty
          v-for="coupon in coupons"
          :key="coupon.id"
          :name="coupon.name"
          class="sf-property--full-width sf-property--small coupon"
        >
          <template #value>
            <SfButton
              class="sf-button--text desktop-only"
              style="margin: 0 0 1rem auto; display: block;"
              @click="removeCoupon({ coupon: coupon })"
            >
              {{ $t('Remove coupon') }}
            </SfButton>
          </template>
        </SfProperty>
      </div>
      <div class="promo-code">
        <SfInput
          :value="promoCode"
          @input="onPromoCodeInput"
          name="promoCode"
          :label="$t('Enter promo code')"
          class="sf-input--filled promo-code__input"
          :valid="!cartError.applyCoupon"
          :errorMessage="$t('This promo code is invalid')"
        />
        <SfButton class="promo-code__button" @click="applyCartCoupon(promoCode)">{{ $t('Apply') }}</SfButton>
      </div>
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
  SfInput,
  SfCircleIcon
} from '@storefront-ui/vue';
import { computed, ref } from '@vue/composition-api';
import { useCart, useShippingProvider, cartGetters } from '@vue-storefront/commercetools';
import getShippingMethodPrice from '@/helpers/Checkout/getShippingMethodPrice';

export default {
  name: 'CartPreview',
  components: {
    SfHeading,
    SfButton,
    SfCollectedProduct,
    SfProperty,
    SfCharacteristic,
    SfInput,
    SfCircleIcon
  },
  setup () {
    const { cart, removeItem, updateItemQty, applyCoupon, removeCoupon, error: cartError } = useCart();
    const { state } = useShippingProvider();

    const listIsHidden = ref(false);
    const promoCode = ref('');

    const products = computed(() => cartGetters.getItems(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const coupons = computed(() => cartGetters.getCoupons(cart.value));
    const discounts = computed(() => cartGetters.getDiscounts(cart.value).filter(discount => !discount.isGiftLineItem));

    const onPromoCodeInput = (input) => {
      promoCode.value = input;
      cartError.value.applyCoupon = null;
    };

    const applyCartCoupon = async (couponCode) => {
      await applyCoupon({ couponCode });
      if (!cartError.value.applyCoupon) {
        promoCode.value = '';
      }
    };

    return {
      discounts,
      totalItems,
      listIsHidden,
      products,
      totals,
      coupons,
      promoCode,
      removeItem,
      updateItemQty,
      cartGetters,
      applyCoupon,
      removeCoupon,
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
      ],
      selectedShippingMethod: computed(() => state.value && state.value.response && state.value.response.shippingMethod),
      hasSpecialPrice: computed(() => totals.value.special > 0 && totals.value.special < totals.value.subtotal),
      getShippingMethodPrice,
      onPromoCodeInput,
      applyCartCoupon,
      cartError
    };
  }
};
</script>

<style lang="scss" scoped>
.highlighted {
  box-sizing: border-box;
  width: 100%;
  background-color: var(--c-light);
  padding: var(--spacer-xl) var(--spacer-xl) 0;
  &:last-child {
    padding-bottom: var(--spacer-xl);
  }
}
.total-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacer-xl);
}
.property {
  margin-bottom: var(--spacer-base);
}
.property-total {
  margin-top: var(--spacer-xl);
  padding-top: var(--spacer-lg);
  font-size: var(--font-size-xl);
  border-top: var(--c-white) 1px solid;
  --property-name-font-weight: var(--font-weight--semibold);
  --property-name-color: var(--c-text);
}
.discounts {
  margin-bottom: var(--spacer-base);
}

.discount {
  margin-bottom: var(--spacer-2xs);
}

.coupon {
  .sf-property__name::after {
    content: none;
  }
}

.characteristic {
  &:not(:last-child) {
    margin-bottom: var(--spacer-base);
  }
}
.promo-code {
  display: flex;
  align-items: flex-start;
  &__button {
    --button-width: 6.3125rem;
    --button-height: var(--spacer-lg);
  }
  &__input {
    --input-background: var(--c-white);
    flex: 1;
  }
}

.discounted {
  &::v-deep .sf-property__value {
    color: var(--c-danger);
    text-decoration: line-through;
  }
}

.special-price {
  justify-content: flex-end;

  &::v-deep .sf-property__name {
    display: none;
  }
}

</style>
