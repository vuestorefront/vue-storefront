<template>
  <div>
    <SfHeading
      :level="3"
      title="Order details"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <SfAccordion first-open class="accordion mobile-only">
      <SfAccordionItem class="accordion-header" header="Personal Details">
        <div class="accordion__item">
          <div class="accordion__content">
            <p class="content">
              {{ personalDetails.firstName }} {{ personalDetails.lastName }}<br />
            </p>
            <p class="content">
              {{ personalDetails.email }}
            </p>
          </div>
          <SfButton class="sf-button--text color-secondary accordion__edit" @click="$emit('click:edit', 0)">Edit</SfButton>
        </div>
      </SfAccordionItem>
      <SfAccordionItem class="accordion-header" header="Shipping address">
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
          <SfButton class="sf-button--text color-secondary accordion__edit" @click="$emit('click:edit', 1)">Edit</SfButton
          >
        </div>
      </SfAccordionItem>
      <SfAccordionItem class="accordion-header" header="Billing address">
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
          <SfButton class="sf-button--text color-secondary accordion__edit" @click="$emit('click:edit', 2)">Edit</SfButton>
        </div>
      </SfAccordionItem>
      <SfAccordionItem header="Payment method">
        <div class="accordion__item">
          <div class="accordion__content">
            <p class="content">{{ chosenPaymentMethod.label }}</p>
          </div>
          <SfButton class="sf-button--text color-secondary accordion__edit" @click="$emit('click:edit', 2)">Edit</SfButton>
        </div>
      </SfAccordionItem>
    </SfAccordion>
    <SfTable class="sf-table--bordered table desktop-only">
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
            icon="cross"
            size="xxs"
            color="#BEBFC4"
            role="button"
            class="button"
            @click="removeFromCart(product)"
          />
        </SfTableData>
      </SfTableRow>
    </SfTable>
    <div class="summary">
      <div class="summary__group">
        <div class="summary__total">
             <SfHeading
              title="Totals"
              :level="3"
              class="sf-heading--left sf-heading--no-underline title"
            />
          <SfProperty
            name="Subtotal"
            :value="totals.subtotal"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Shipping"
            :value="checkoutGetters.getShippingMethodPrice(chosenShippingMethod)"
            class="sf-property--full-width property"
          />
          <SfProperty
            name="Total price"
            :value="totals.total"
            class="sf-property--full-width summary__property-total"
          />
          <SfCheckbox v-model="terms" name="terms" class="summary__terms">
          <template #label>
            <div class="sf-checkbox__label">
              I agree to <a href="#">Terms and conditions</a>
            </div>
          </template>
        </SfCheckbox>
        </div>
      </div>
    </div>
    <div class="info mobile-only">
      <SfCharacteristic
        v-for="characteristic in characteristics"
        :key="characteristic.title"
        :title="characteristic.title"
        :description="characteristic.description"
        :icon="characteristic.icon"
        class="characteristic"
      />
    </div>
    <div class="summary__action">
      <!-- TODO: add nuxt link for navigating back and forward -->
      <SfButton class="summary__action-button">
        Place my order
      </SfButton>
      <SfButton class="sf-button--text mobile-only">
        Go back
      </SfButton>
    </div>
  </div>
</template>

<script>
import {
  SfHeading,
  SfTable,
  SfCheckbox,
  SfButton,
  SfImage,
  SfIcon,
  SfPrice,
  SfProperty,
  SfAccordion,
  SfCharacteristic
} from '@storefront-ui/vue';
import { ref, computed } from '@vue/composition-api';
import { useCheckout, useCart, cartGetters, checkoutGetters } from '@vue-storefront/commercetools';

export default {
  name: 'ReviewOrder',
  components: {
    SfHeading,
    SfTable,
    SfCheckbox,
    SfButton,
    SfImage,
    SfIcon,
    SfPrice,
    SfProperty,
    SfAccordion,
    SfCharacteristic
  },
  setup(props, context) {
    context.emit('changeStep', 3);
    const billingSameAsShipping = ref(false);
    const terms = ref(false);
    const { cart, removeFromCart } = useCart();
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
      checkoutGetters,
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
@import "~@storefront-ui/vue/styles";

.title {
  margin: var(--spacer-xl) 0 var(--spacer-base) 0;
  @include for-desktop {
    margin: var(--spacer-2xl) 0 var(--spacer-base) 0;
  }
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  &__element {
    margin: 0 0 var(--spacer-xl) 0;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding: 0 0 0 var(--spacer-xl);
        }
      }
    }
  }
  &__group {
    display: flex;
    align-items: center;
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    &--secondary {
      --button-margin: var(--spacer-xl) 0;
      @include for-desktop {
        order: -1;
        --button-margin: 0;
        text-align: left;
      }
    }
  }
  &__button {
    --button-width: 100%;
    @include for-desktop {
      --button-width: auto;
    }
  }
  &__radio-group {
    flex: 0 0 100%;
    margin: 0 0 var(--spacer-2xl) 0;
  }
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
  font-size: var(--font-xs);
}
.product-price {
  --price-font-size: var(--font-sm);
}
.button {
  cursor: pointer;
}
.summary {
  background: var(--c-light);
  @include for-desktop {
    background: transparent;
  }
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
    padding: var(--spacer-xs) var(--spacer-xl) var(--spacer-lg) var(--spacer-xl);
    flex: 0 0 16.875rem;
    @include for-desktop {
      padding: 0;
    }
  }
  &__action {
    display: flex;
    flex-direction: column;
    margin: var(--spacer-base) 0 var(--spacer-sm) 0;
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
      flex-direction: row;
    }
  }

  &__action-button {
    margin: 0 0 var(--spacer-sm) 0;
    @include for-desktop {
      margin: 0;
    }
  }
  &__back-button {
    margin: 0 var(--spacer-xl) 0 0;
  }
  &__property-total {
    padding: var(--spacer-base) 0;
    margin: var(--spacer-xl) 0 0 0;
    border: 2px solid var(--c-white);
    border-width: 2px 0 0 0;
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

.accordion-header {
  background: transparent !important;
}

.info {
  margin: var(--spacer-base) 0 0 0;
}
.characteristic {
  margin: 0 0 var(--spacer-xl) 0;
  &:last-child {
    margin: 0;
  }
}
.content {
  margin: 0 0 var(--spacer-xl) 0;
  color: var(--c-text);
  &:last-child {
    margin: 0;
  }
  &__label {
    font-weight: 400;
  }
}

a {
  color: var(--c-text-muted);
  text-decoration: none;
  &:hover {
    color: var(--c-text);
  }
}
</style>
