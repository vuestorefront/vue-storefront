<template>
  <div>
    <SfHeading
      title="3. Payment"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <SfCheckbox
        v-model="sameAsShipping"
        label="Copy address data from shipping"
        name="copyShippingAddress"
        class="form__element"
      />
      <SfInput
        v-model="firstName"
        label="First name"
        name="firstName"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="lastName"
        label="Last name"
        name="lastName"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="streetName"
        label="Street name"
        name="streetName"
        class="form__element"
        required
      />
      <SfInput
        v-model="apartment"
        label="House/Apartment number"
        name="apartment"
        class="form__element"
        required
      />
      <SfInput
        v-model="city"
        label="City"
        name="city"
        class="form__element form__element--half"
        required
      />
      <SfInput
        v-model="state"
        label="State/Province"
        name="state"
        class="form__element form__element--half form__element--half-even"
        required
      />
      <SfInput
        v-model="zipCode"
        label="Zip-code"
        name="zipCode"
        class="form__element form__element--half"
        required
      />
      <SfSelect
        v-model="country"
        label="Country"
        class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
        required
      >
        <SfSelectOption
          v-for="countryOption in countries"
          :key="countryOption"
          :value="countryOption"
        >
          {{ countryOption }}
        </SfSelectOption>
      </SfSelect>
      <SfInput
        v-model="phoneNumber"
        label="Phone number"
        name="phone"
        class="form__element"
        required
      />
    </div>
    <SfHeading
      title="Payment methods"
      subtitle="Choose your payment method"
      class="sf-heading--left sf-heading--no-underline title"
    />
    <div class="form">
      <div class="form__element payment-methods">
        <SfRadio
          v-for="item in paymentMethods"
          :key="item.value"
          v-model="paymentMethod"
          :label="item.label"
          :value="item.value"
          name="paymentMethod"
          :description="item.description"
          class="form__radio payment-method"
        >
          <template #label>
            <div class="sf-radio__label">
              <template
                v-if="
                  item.value !== 'debit' &&
                    item.value !== 'mastercard' &&
                    item.value !== 'electron'
                "
              >
                {{ item.label }}
              </template>
              <template v-else>
                <SfImage
                  :src="`/assets/storybook/checkout/${item.value}.png`"
                  class="payment-image"
                />
              </template>
            </div>
          </template>
        </SfRadio>
      </div>
      <transition name="fade">
        <div v-if="isCreditCard" class="credit-card-form">
          <div class="credit-card-form__group">
            <span
              class="credit-card-form__label credit-card-form__label--required"
              >Number</span
            >
            <div class="credit-card-form__element">
              <SfInput
                v-model="cardNumber"
                name="cardNumber"
                class=" credit-card-form__input"
              />
            </div>
          </div>
          <div class="credit-card-form__group">
            <span
              class="credit-card-form__label credit-card-form__label--required"
              >Card holder</span
            >
            <div class="credit-card-form__element">
              <SfInput
                v-model="cardHolder"
                name="cardHolder"
                class=" credit-card-form__input"
              />
            </div>
          </div>
          <div class="credit-card-form__group">
            <span
              class="credit-card-form__label credit-card-form__label--required"
              >Expiry date</span
            >
            <div class="credit-card-form__element">
              <SfInput
                v-model="cardMonth"
                label="Month"
                name="month"
                class="credit-card-form__input "
              />
              <SfInput
                v-model="cardYear"
                label="Year"
                name="year"
                class="credit-card-form__input"
              />
            </div>
          </div>
          <div class="credit-card-form__group">
            <span
              class="credit-card-form__label credit-card-form__label--required"
              >Code CVC</span
            >
            <div class="credit-card-form__element">
              <SfInput
                v-model="cardCVC"
                name="cardCVC"
                class=" credit-card-form__input credit-card-form__input--small"
              />
            </div>
          </div>
          <SfCheckbox
            v-model="cardKeep"
            name="keepcard"
            label="I want to keed this data for other purchases."
          />
        </div>
      </transition>
      <div class="form__action">
        <SfButton
          class="sf-button--full-width form__action-button"
          @click="toReview"
          >Review order</SfButton
        >
        <SfButton
          class="sf-button--full-width sf-button--text form__action-button form__action-button--secondary"
          @click="$emit('click:back')"
        >
          Go back to Personal details
        </SfButton>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SfHeading,
  SfInput,
  SfButton,
  SfSelect,
  SfRadio,
  SfImage,
  SfCheckbox
} from "@storefront-ui/vue";
export default {
  name: "Payment",
  components: {
    SfHeading,
    SfInput,
    SfButton,
    SfSelect,
    SfRadio,
    SfImage,
    SfCheckbox
  },
  props: {
    order: {
      type: Object,
      default: () => ({})
    },
    paymentMethods: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      sameAsShipping: false,
      firstName: "",
      lastName: "",
      streetName: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phoneNumber: "",
      paymentMethod: "",
      cardNumber: "",
      cardHolder: "",
      cardMonth: "",
      cardYear: "",
      cardCVC: "",
      cardKeep: false,
      countries: [
        "Austria",
        "Azerbaijan",
        "Belarus",
        "Belgium",
        "Bosnia and Herzegovina",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Estonia",
        "Finland",
        "France",
        "Georgia",
        "Germany",
        "Greece",
        "Hungary",
        "Iceland",
        "Ireland",
        "Italy",
        "Kosovo",
        "Latvia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Malta",
        "Moldova",
        "Monaco",
        "Montenegro",
        "The Netherlands",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "San Marino",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkey",
        "Ukraine",
        "United Kingdom",
        "Vatican City"
      ]
    };
  },
  computed: {
    isCreditCard() {
      return ["debit", "mastercard", "electron"].includes(this.paymentMethod);
    }
  },
  watch: {
    order: {
      handler(value) {
        this.sameAsShipping = value.payment.sameAsShipping;
        this.streetName = value.payment.streetName;
        this.apartment = value.payment.apartment;
        this.city = value.payment.city;
        this.state = value.payment.state;
        this.zipCode = value.payment.zipCode;
        this.country = value.payment.country;
        this.phoneNumber = value.payment.phoneNumber;
        this.paymentMethod = value.payment.paymentMethod;
        this.cardNumber = value.payment.card.number;
        this.cardHolder = value.payment.card.holder;
        this.cardMonth = value.payment.card.month;
        this.cardYear = value.payment.card.year;
        this.cardCVC = value.payment.card.cvc;
        this.cardKeep = value.payment.card.keep;
      },
      immediate: true
    },
    sameAsShipping: {
      handler(value) {
        if (value) {
          this.firstName = this.order.shipping.firstName;
          this.lastName = this.order.shipping.lastName;
          this.streetName = this.order.shipping.streetName;
          this.apartment = this.order.shipping.apartment;
          this.city = this.order.shipping.city;
          this.state = this.order.shipping.state;
          this.zipCode = this.order.shipping.zipCode;
          this.country = this.order.shipping.country;
          this.phoneNumber = this.order.shipping.phoneNumber;
          this.paymentMethod = this.order.shipping.paymentMethod;
        } else {
          this.streetName = "";
          this.apartment = "";
          this.city = "";
          this.state = "";
          this.zipCode = "";
          this.country = "";
          this.phoneNumber = "";
          this.paymentMethod = "";
        }
      }
    }
  },
  methods: {
    toReview() {
      const order = { ...this.order };
      const payment = { ...order.payment };
      const card = { ...payment.card };
      payment.sameAsShipping = this.sameAsShipping;
      payment.firstName = this.firstName;
      payment.lastName = this.lastName;
      payment.streetName = this.streetName;
      payment.streetName = this.streetName;
      payment.apartment = this.apartment;
      payment.city = this.city;
      payment.state = this.state;
      payment.zipCode = this.zipCode;
      payment.country = this.country;
      payment.phoneNumber = this.phoneNumber;
      payment.paymentMethod = this.paymentMethod;
      if (this.isCreditCard) {
        card.number = this.cardNumber;
        card.holder = this.cardHolder;
        card.month = this.cardMonth;
        card.year = this.cardYear;
        card.cvc = this.cardCVC;
        card.keep = this.cardKeep;
      }
      payment.card = card;
      order.payment = payment;
      this.$emit("update:order", order);
    }
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
@mixin for-mobile {
  @media screen and (max-width: $desktop-min) {
    @content;
  }
}
.title {
  margin-bottom: $spacer-extra-big;
}
.form {
  @include for-desktop {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  &__element {
    margin-bottom: $spacer-extra-big;
    @include for-desktop {
      flex: 0 0 100%;
    }
    &--half {
      @include for-desktop {
        flex: 1 1 50%;
      }
      &-even {
        @include for-desktop {
          padding-left: $spacer-extra-big;
        }
      }
    }
  }
  &__action {
    @include for-desktop {
      flex: 0 0 100%;
      display: flex;
    }
  }
  &__action-button {
    flex: 1;
    &--secondary {
      margin: $spacer-big 0;
      @include for-desktop {
        order: -1;
        margin: 0;
        text-align: left;
      }
    }
  }
  &__select {
    ::v-deep .sf-select__selected {
      padding: 5px 0;
    }
  }
  &__radio {
    white-space: nowrap;
  }
}
.payment-image {
  display: flex;
  align-items: center;
  height: 2.125rem;
  width: auto;
  ::v-deep > * {
    width: auto;
    max-width: unset;
  }
}
.payment-methods {
  @include for-desktop {
    display: flex;
    padding: $spacer-big 0;
    border-top: 1px solid $c-light;
    border-bottom: 1px solid $c-light;
  }
}
.payment-method {
  border-top: 1px solid $c-light;
  @include for-mobile {
    background-color: transparent;
  }
  @include for-desktop {
    border: 0;
    border-radius: 4px;
  }
  &:last-child {
    border-bottom: 1px solid $c-light;
    @include for-desktop {
      border-bottom: 0;
    }
  }
  ::v-deep {
    .sf-radio {
      &__container {
        align-items: center;
      }
      &__content {
        margin: 0 0 0 $spacer;
      }
    }
  }
}
.credit-card-form {
  margin-bottom: $spacer-big;
  @include for-desktop {
    flex: 0 0 66.666%;
    padding: 0 calc((100% - 66.666%) / 2);
  }
  &__group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 $spacer-big 0;
  }
  &__label {
    flex: unset;
  }
  &__element {
    display: flex;
    flex: 0 0 66.666%;
  }
  &__input {
    flex: 1;
    &--small {
      flex: 0 0 46.666%;
    }
    & + & {
      margin-left: $spacer-big;
    }
  }
}
</style>
