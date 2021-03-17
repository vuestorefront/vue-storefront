<template>
  <div>
    <SfHeading
      :level="3"
      :title="$t('Payment')"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfAccordion :open="$t('Shipping address')" class="accordion smartphone-only">
      <SfAccordionItem :header="$t('Shipping address')">
        <div class="accordion__item">
          <div class="accordion__content">
            <p class="content">
              <span class="content__label" v-if="chosenShippingMethod">{{ chosenShippingMethod.name }}</span><br />
              {{ shippingDetails.streetName }} {{ shippingDetails.apartment }},
              {{ shippingDetails.zipCode }}<br />
              {{ shippingDetails.city }}, {{ shippingDetails.country }}
            </p>
            <p class="content">{{ shippingDetails.phoneNumber }}</p>
          </div>
          <SfButton class="sf-button--text accordion__edit" @click="$emit('click:edit', 1)">
            {{ $t('Edit') }}
          </SfButton>
        </div>
      </SfAccordionItem>
      <SfAccordionItem :header="$t('Billing address')">
        <div class="accordion__item">
          <div class="accordion__content">
            <p v-if="billingSameAsShipping" class="content">
              {{ $t('Same as shipping address') }}
            </p>
            <template v-else>
              <p class="content">
                <span class="content__label">{{ chosenPaymentMethod.label }}</span><br />
                {{ billingDetails.streetName }} {{ billingDetails.apartment }},
                {{ billingDetails.zipCode }}<br />
                {{ billingDetails.city }}, {{ billingDetails.country }}
              </p>
              <p class="content">{{ billingDetails.phoneNumber }}</p>
            </template>
          </div>
          <SfButton class="sf-button--text accordion__edit" @click="$emit('click:edit', 2)">
            {{ $t('Edit') }}
          </SfButton>
        </div>
      </SfAccordionItem>
    </SfAccordion>
    <SfTable class="sf-table--bordered table desktop-only">
      <SfTableHeading class="table__row">
        <SfTableHeader class="table__header table__image">{{ $t('Item') }}</SfTableHeader>
        <SfTableHeader
          v-for="tableHeader in tableHeaders"
          :key="tableHeader"
          class="table__header"
          :class="{ table__description: tableHeader === 'Description' }"
        >
          {{ tableHeader }}
        </SfTableHeader>
      </SfTableHeading>
      <SfTableRow
        v-for="(product, index) in products"
        :key="index"
        class="table__row"
      >
        <SfTableData class="table__image">
          <SfImage :src="cartGetters.getItemImage(product)" :alt="cartGetters.getItemName(product)" />
        </SfTableData>
        <SfTableData class="table__data table__description table__data">
          <div class="product-title">{{ cartGetters.getItemName(product) }}</div>
          <div class="product-sku">{{ cartGetters.getItemSku(product) }}</div>
        </SfTableData>
        <SfTableData
          class="table__data" v-for="(value, key) in cartGetters.getItemAttributes(product, ['size', 'color'])"
          :key="key"
        >
          {{ value }}
        </SfTableData>
        <SfTableData class="table__data">{{ cartGetters.getItemQty(product) }}</SfTableData>
        <SfTableData class="table__data price">
          <SfPrice
            :regular="$n(cartGetters.getItemPrice(product).regular, 'currency')"
            :special="cartGetters.getItemPrice(product).special && $n(cartGetters.getItemPrice(product).special, 'currency')"
            class="product-price"
          />
        </SfTableData>
      </SfTableRow>
    </SfTable>
    <div class="summary">
      <div class="summary__group">
        <div class="summary__total">
          <SfProperty
            :name="$t('Subtotal')"
            :value="$n(totals.special > 0 ? totals.special : totals.subtotal, 'currency')"
            class="sf-property--full-width property"
          />
          <SfProperty
            :name="$t('Shipping')"
            v-if="chosenShippingMethod && chosenShippingMethod.zoneRates"
            :value="$n(getShippingMethodPrice(chosenShippingMethod, totals.total), 'currency')"
            class="sf-property--full-width property"
          />
        </div>
        <SfDivider class="divider"/>
        <SfProperty
          :name="$t('Total price')"
          :value="$n(totals.total, 'currency')"
          class="sf-property--full-width sf-property--large property summary__property-total"
        />
        <VsfPaymentProviderMock @status="paymentReady = $event"/>
        <SfCheckbox v-model="terms" name="terms" class="summary__terms">
          <template #label>
            <div class="sf-checkbox__label">
              {{ $t('I agree to') }} <SfLink href="#"> {{ $t('Terms and conditions') }}</SfLink>
            </div>
          </template>
        </SfCheckbox>
          <div class="summary__action">
          <SfButton class="summary__action-button" @click="processOrder" :disabled="loading || !paymentReady || !terms">
            {{ $t('Make an order') }}
          </SfButton>
          <nuxt-link to="/checkout/billing" class="sf-button sf-button--underlined summary__back-button smartphone-only">
            {{ $t('Go back') }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  SfHeading,
  SfTable,
  SfCheckbox,
  SfButton,
  SfDivider,
  SfImage,
  SfIcon,
  SfPrice,
  SfProperty,
  SfAccordion,
  SfLink
} from '@storefront-ui/vue';
import { ref, computed } from '@vue/composition-api';
import { useMakeOrder, useCart, useBilling, useShipping, useShippingProvider, cartGetters } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
import getShippingMethodPrice from '@/helpers/Checkout/getShippingMethodPrice';
import VsfPaymentProviderMock from '@/components/Checkout/VsfPaymentProviderMock';

export default {
  name: 'ReviewOrder',
  components: {
    SfHeading,
    SfTable,
    SfCheckbox,
    SfButton,
    SfDivider,
    SfImage,
    SfIcon,
    SfPrice,
    SfProperty,
    SfAccordion,
    SfLink,
    VsfPaymentProviderMock
  },
  setup(_, context) {
    const paymentReady = ref(false);
    const terms = ref(false);
    const { cart, removeItem, load, setCart } = useCart();
    const { shipping: shippingDetails, load: loadShippingDetails } = useShipping();
    const { load: loadShippingProvider, state } = useShippingProvider();
    const { billing: billingDetails, load: loadBillingDetails } = useBilling();
    const billingSameAsShipping = computed(() => Object.keys(shippingDetails.value).every(shippingDetailsKey => shippingDetails.value[shippingDetailsKey] === billingDetails.value[shippingDetailsKey]));
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const { order, make, loading } = useMakeOrder();

    onSSR(async () => {
      await load();
      await loadShippingDetails();
      await loadBillingDetails();
      await loadShippingProvider();
    });

    const processOrder = async () => {
      await make();
      context.root.$router.push(`/checkout/thank-you?order=${order.value.id}`);
      setCart(null);
    };
    return {
      loading,
      products,
      shippingDetails,
      billingDetails,
      chosenShippingMethod: computed(() => state.value && state.value.response && state.value.response.shippingMethod),
      chosenPaymentMethod: {},
      billingSameAsShipping,
      terms,
      totals,
      removeItem,
      processOrder,
      tableHeaders: ['Description', 'Colour', 'Size', 'Quantity', 'Amount'],
      cartGetters,
      getShippingMethodPrice,
      paymentReady
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  --heading-title-font-weight: var(--font-weight--bold);
}
.table {
  margin: 0 0 var(--spacer-base) 0;
  &__row {
    justify-content: space-between;
  }
  @include for-desktop {
    &__header {
      text-align: center;
      &:last-child {
        text-align: right;
      }
    }
    &__data {
      text-align: center;
    }
    &__description {
      text-align: left;
      flex: 0 0 12rem;
    }
    &__image {
      --image-width: 5.125rem;
      text-align: left;
      margin: 0 var(--spacer-xl) 0 0;
    }
  }
}
.product-sku {
  color: var(--c-text-muted);
  font-size: var(--font-size--sm);
}
.price {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
.product-price {
  --price-font-size: var(--font-size--base);
}
.property {
  margin: 0 0 var(--spacer-sm) 0;
  --property-name-font-weight: var(--font-weight--medium);
  --property-name-font-size: var(--font-size--lg);
  --property-value-font-weight: var(--font-weight--bold);
  --property-value-font-size: var(--h4-font-size);
}
.summary {
  &__terms {
    margin: var(--spacer-base) 0 0 0;
  }
  &__total {
    margin: 0 0 var(--spacer-sm) 0;
    flex: 0 0 16.875rem;
  }
  &__action {
    @include for-desktop {
      display: flex;
      margin: var(--spacer-xl) 0 0 0;
    }
  }
  &__action-button {
    margin: 0;
    width: 100%;
    margin: var(--spacer-xl) 0 0 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: 25rem;
    }
  }
  &__back-button {
    margin: var(--spacer-sm) 0 var(--spacer-xl);
    width: 100%;
  }
  &__property-total {
    margin: var(--spacer-xl) 0 0 0;
    --property-name-color: var(--c-text);
    --property-name-font-size: var(--h4-font-size);
    @include for-desktop {
      --property-name-font-weight: var(--font-weight--bold);
    }
  }
}
.accordion {
  margin: 0 0 var(--spacer-xl) 0;
  &__item {
    display: flex;
    align-items: flex-start;
  }
  &__content {
    flex: 1;
  }
  &__edit {
    flex: unset;
  }
}
.content {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-text);
  &:last-child {
    margin: 0;
  }
  &__label {
    font-weight: var(--font-weight--normal);
  }
}
.divider {
  --divider-border-color: var(--c-primary);
  --divider-width: 100%;
  --divider-margin: 0 0 var(--spacer-base) 0;
}
</style>
