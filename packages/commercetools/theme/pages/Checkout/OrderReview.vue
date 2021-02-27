<template>
  <div>
    <SfHeading
      :level="3"
      title="Order details"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfAccordion first-open class="accordion smartphone-only">
      <SfAccordionItem header="Personal Details">
        <div class="accordion__item">
          <div class="accordion__content">
            <p class="content">
              {{ personalDetails.firstName }} {{ personalDetails.lastName }}<br />
            </p>
            <p class="content">
              {{ personalDetails.email }}
            </p>
          </div>
          <SfButton class="sf-button--text color-secondary accordion__edit" @click="$emit('click:edit', 0)">
            {{ $t('Edit') }}
          </SfButton>
        </div>
      </SfAccordionItem>
      <SfAccordionItem header="Shipping address">
        <div class="accordion__item">
          <div class="accordion__content">
            <p class="content">
              <span class="content__label">{{ chosenShippingMethod.name }}</span><br />
              {{ shippingDetails.streetName }} {{ shippingDetails.apartment }},
              {{ shippingDetails.zipCode }}<br />
              {{ shippingDetails.city }}, {{ shippingDetails.country }}
            </p>
            <p class="content">{{ shippingDetails.phoneNumber }}</p>
          </div>
          <SfButton class="sf-button--text color-secondary accordion__edit" @click="$emit('click:edit', 1)">
            {{ $t('Edit') }}
          </SfButton>
        </div>
      </SfAccordionItem>
      <SfAccordionItem header="Billing address">
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
          <SfButton class="sf-button--text color-secondary accordion__edit" @click="$emit('click:edit', 2)">
            {{ $t('Edit') }}
          </SfButton>
        </div>
      </SfAccordionItem>
      <SfAccordionItem header="Payment method">
        <div class="accordion__item">
          <div class="accordion__content">
            <p class="content">{{ chosenPaymentMethod.label }}</p>
          </div>
          <SfButton class="sf-button--text color-secondary accordion__edit" @click="$emit('click:edit', 2)">
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
            name="Subtotal"
            :value="$n(totals.special > 0 ? totals.special : totals.subtotal, 'currency')"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Shipping"
            v-if="chosenShippingMethod && chosenShippingMethod.zoneRates"
            :value="$n(getShippingMethodPrice(chosenShippingMethod), 'currency')"
            class="sf-property--full-width property"
          />
        </div>
        <SfDivider />
        <SfProperty
          name="Total price"
          :value="totals.total"
          class="sf-property--full-width sf-property--large summary__property-total"
        />
        <SfCheckbox v-model="terms" name="terms" class="summary__terms">
          <template #label>
            <div class="sf-checkbox__label">
              {{ $t('I agree to') }} <SfLink href="#"> {{ $t('Terms and conditions') }}</SfLink>
            </div>
          </template>
        </SfCheckbox>
          <div class="summary__action">
          <nuxt-link to="/checkout/payment" class="sf-button color-secondary summary__back-button">
            {{ $t('Go back') }}
          </nuxt-link>
          <SfButton class="summary__action-button" @click="processOrder" :disabled="loading.order">
            {{ $t('Make an order') }}
          </SfButton>
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
import { useCheckout, useMakeOrder, useCart, cartGetters } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
import getShippingMethodPrice from '@/helpers/Checkout/getShippingMethodPrice';

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
    SfLink
  },
  setup(props, context) {
    const billingSameAsShipping = ref(false);
    const terms = ref(false);
    const { cart, removeItem } = useCart();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const {
      personalDetails,
      shippingDetails,
      billingDetails,
      chosenShippingMethod,
      chosenPaymentMethod,
      loadShippingMethods,
      loading,
      loadDetails,
      clean
    } = useCheckout();
    const { order, make } = useMakeOrder();

    onSSR(async () => {
      await loadDetails();
      await loadShippingMethods();
    });
    const processOrder = async () => {
      await make();
      context.root.$router.push(`/checkout/thank-you?order=${order.value.id}`);
      clean();
    };
    return {
      loading,
      products,
      personalDetails,
      shippingDetails,
      billingDetails,
      chosenShippingMethod,
      chosenPaymentMethod,
      billingSameAsShipping,
      terms,
      totals,
      removeItem,
      processOrder,
      tableHeaders: ['Description', 'Colour', 'Size', 'Quantity', 'Amount'],
      cartGetters,
      getShippingMethodPrice
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
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
    margin: var(--spacer-sm) 0 0 0;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    &--secondary {
      @include for-desktop {
        text-align: right;
      }
    }
  }
  &__back-button {
    margin: var(--spacer-xl) 0 0 0;
    width: 100%;
    @include for-desktop {
      margin: 0 var(--spacer-xl) 0 0;
      width: auto;
    }
    color:  var(--c-white);
    &:hover {
      color:  var(--c-white);
    }
  }
  &__property-total {
    margin: var(--spacer-xl) 0 0 0;
  }
}
.property {
  margin: 0 0 var(--spacer-sm) 0;
  &__name {
    color: var(--c-text-muted);
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
</style>
