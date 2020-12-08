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
          <SfButton data-cy="order-review-btn_personal-edit" class="sf-button--text color-secondary accordion__edit" @click="$emit('click:edit', 0)">Edit</SfButton>
        </div>
      </SfAccordionItem>
      <SfAccordionItem header="Shipping address">
        <div class="accordion__item">
          <div class="accordion__content">
            <p class="content">
              <span class="content__label">{{ checkoutGetters.getShippingMethodName(chosenShippingMethod) }}</span><br />
              {{ shippingDetails.streetName }} {{ shippingDetails.apartment }},
              {{ shippingDetails.zipCode }}<br />
              {{ shippingDetails.city }}, {{ shippingDetails.country }}
            </p>
            <p class="content">{{ shippingDetails.phoneNumber }}</p>
          </div>
          <SfButton data-cy="order-review-btn_shippin-edit" class="sf-button--text color-secondary accordion__edit" @click="$emit('click:edit', 1)">Edit</SfButton
          >
        </div>
      </SfAccordionItem>
      <SfAccordionItem header="Billing address">
        <div class="accordion__item">
          <div class="accordion__content">
            <p v-if="billingSameAsShipping" class="content">
              Same as shipping address
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
          <SfButton data-cy="order-review-btn_billing-edit" class="sf-button--text color-secondary accordion__edit" @click="$emit('click:edit', 2)">Edit</SfButton>
        </div>
      </SfAccordionItem>
      <SfAccordionItem header="Payment method">
        <div class="accordion__item">
          <div class="accordion__content">
            <p class="content">{{ chosenPaymentMethod.label }}</p>
          </div>
          <SfButton data-cy="order-review-btn_payment-edit2" class="sf-button--text color-secondary accordion__edit" @click="$emit('click:edit', 2)">Edit</SfButton>
        </div>
      </SfAccordionItem>
    </SfAccordion>
    <SfTable class="sf-table--bordered table desktop-only">
      <thead>
        <SfTableHeading class="table__row">
          <SfTableHeader class="table__header table__image">Item</SfTableHeader>
          <SfTableHeader
            v-for="tableHeader in tableHeaders"
            :key="tableHeader"
            class="table__header"
          >
            {{ tableHeader }}
          </SfTableHeader>
          <SfTableHeader class="table__action"></SfTableHeader>
        </SfTableHeading>
      </thead>
      <tbody>
        <SfTableRow
          v-for="(product, index) in products"
          :key="index"
          class="table__row"
        >
          <SfTableData class="table__image">
            <SfImage :src="cartGetters.getItemImage(product)" />
          </SfTableData>
          <SfTableData class="table__data table__data--left">
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
          <SfTableData class="table__data">
            <SfPrice
              :regular="cartGetters.getFormattedPrice(cartGetters.getItemPrice(product).regular)"
              :special="cartGetters.getFormattedPrice(cartGetters.getItemPrice(product).special)"
              class="product-price"
            />
          </SfTableData>
          <SfTableData class="table__action">
            <SfIcon
              data-cy="order-review-icon_remove-from-cart"
              icon="cross"
              size="xxs"
              color="#BEBFC4"
              role="button"
              class="button"
              @click="removeFromCart(product)"
            />
          </SfTableData>
        </SfTableRow>
      </tbody>
    </SfTable>
    <div class="summary">
      <div class="summary__group">
        <div class="summary__total">
          <SfProperty
            name="Subtotal"
            :value="cartGetters.getFormattedPrice(totals.subtotal)"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Shipping"
            :value="cartGetters.getFormattedPrice(checkoutGetters.getShippingMethodPrice(chosenShippingMethod))"
            class="sf-property--full-width property"
          />
        </div>
        <SfDivider />
        <SfProperty
          name="Total price"
          :value="cartGetters.getFormattedPrice(totals.total)"
          class="sf-property--full-width sf-property--large summary__property-total"
        />
        <SfCheckbox v-model="terms" name="terms" class="summary__terms">
          <template #label>
            <div class="sf-checkbox__label">
              I agree to <SfLink href="#">Terms and conditions</SfLink>
            </div>
          </template>
        </SfCheckbox>
          <div class="summary__action">
          <!-- TODO: add nuxt link for navigating back and forward -->
          <SfButton data-cy="order-review-btn_summary-back" class="color-secondary summary__back-button">
            Go back
          </SfButton>
          <SfButton data-cy="order-review-btn_summary-conitnue" class="summary__action-button" @click="$emit('nextStep')">
            Continue to shipping
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
import { onSSR } from '@vue-storefront/core';
import { useCheckout, useCart, cartGetters, checkoutGetters } from '<%= options.generate.replace.composables %>';

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
    context.emit('changeStep', 3);
    const billingSameAsShipping = ref(false);
    const terms = ref(false);
    const { cart, removeFromCart, load: loadCart } = useCart();
    const products = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const {
      personalDetails,
      shippingDetails,
      billingDetails,
      chosenShippingMethod,
      chosenPaymentMethod,
      placeOrder
    } = useCheckout();

    onSSR(async () => {
      await loadCart();
    });

    const processOrder = async () => {
      await placeOrder();
      context.emit('nextStep');
    };

    return {
      products,
      personalDetails,
      shippingDetails,
      billingDetails,
      chosenShippingMethod,
      chosenPaymentMethod,
      billingSameAsShipping,
      terms,
      totals,
      removeFromCart,
      processOrder,
      tableHeaders: ['Description', 'Colour', 'Size', 'Quantity', 'Amount'],
      cartGetters,
      checkoutGetters
    };
  }
};

</script>

<style lang="scss" scoped>
.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
}
.table {
  margin: 0 0 var(--spacer-xl) 0;
  &__header {
    @include for-desktop {
      text-align: center;
    }
  }
  &__data {
    @include for-desktop {
      text-align: center;
    }
  }
  &__image {
    @include for-desktop {
      flex: 0 0 5.125rem;
    }
  }
  &__action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    @include for-desktop {
      flex: 0 0 2.5rem;
    }
  }
}

.product-sku {
  color: var(--c-text-muted);
  font-size: var(--font-size--sm);
}
.product-price {
  --price-font-size: var(--font-size--base);
}
.summary {
  &__group {
    @include for-desktop {
      margin: 0 0 var(--spacer-2xl) 0;
    }
  }
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
