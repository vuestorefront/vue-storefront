<template>
  <transition name="fade">
    <SfTabs
      v-if="editAddress"
      key="edit-address"
      :open-tab="1"
      class="tab-orphan"
    >
      <SfTab data-cy="shipping-details-tab_change" title="Change the address">
        <p class="message">
          Keep your addresses and contact details updated.
        </p>

        <ValidationObserver v-slot="{ handleSubmit }">
          <form id="shipping-details-form" class="form" @submit.prevent="handleSubmit(updateAddress)">
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  data-cy="shipping-details-input_firstName"
                  v-model="firstName"
                  name="firstName"
                  label="First Name"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  data-cy="shipping-details-input_lastName"
                  v-model="lastName"
                  name="lastName"
                  label="Last Name"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
            </div>
            <ValidationProvider rules="required|min:5" v-slot="{ errors }" class="form__element">
              <SfInput
                data-cy="shipping-details-input_streetName"
                v-model="streetName"
                name="streetName"
                label="Street Name"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <SfInput
              data-cy="shipping-details-input_apartment"
              v-model="apartment"
              name="apartment"
              label="House/Apartment number"
              required
              class="form__element"
            />
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  data-cy="shipping-details-input_city"
                  v-model="city"
                  name="city"
                  label="City"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
              <SfInput
                data-cy="shipping-details-input_state"
                  v-model="state"
                  name="state"
                  label="State/Province"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:4" v-slot="{ errors }" class="form__element">
                <SfInput
                  data-cy="shipping-details-input_zipCode"
                  v-model="zipCode"
                  name="zipCode"
                  label="Zip-code"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider :rules="`required|oneOf:${countries.join(',')}`" v-slot="{ errors }" class="form__element">
                <SfSelect
                  data-cy="shipping-details-select_country"
                  v-model="country"
                  name="country"
                  label="Country"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                >
                  <SfSelectOption
                    v-for="countryOption in countries"
                    :key="countryOption"
                    :value="countryOption"
                  >
                    {{ countryOption }}
                  </SfSelectOption>
                </SfSelect>
              </ValidationProvider>
            </div>
            <ValidationProvider rules="required|min:8" v-slot="{ errors }" class="form__element">
              <SfInput
                data-cy="shipping-details-input_phoneNumber"
                v-model="phoneNumber"
                name="phone"
                label="Phone number"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <SfButton data-cy="shipping-details-btn_update" class="form__button">Update the address</SfButton>
          </form>
        </ValidationObserver>
      </SfTab>
    </SfTabs>
    <SfTabs v-else key="address-list" :open-tab="1" class="tab-orphan">
      <SfTab data-cy="shipping-details-tab_details" title="Shipping details">
        <p class="message">
          Manage all the billing addresses you want (work place, home address
          ...) This way you won"t have to enter the shipping address manually
          with each order.
        </p>
        <transition-group tag="div" name="fade" class="shipping-list">
          <div
            v-for="(shipping, key) in account.shipping"
            :key="shipping.streetName + shipping.apartment"
            class="shipping"
          >
            <div class="shipping__content">
              <p class="shipping__address">
                <span class="shipping__client-name"
                  >{{ shipping.firstName }} {{ shipping.lastName }}</span
                ><br />
                {{ shipping.streetName }} {{ shipping.apartment }}<br />{{
                  shipping.zipCode
                }}
                {{ shipping.city }},<br />{{ shipping.country }}
              </p>
              <p class="shipping__address">
                {{ shipping.phoneNumber }}
              </p>
            </div>
            <div class="shipping__actions">
              <SfIcon
                data-cy="shipping-details-icon_delete"
                icon="cross"
                color="gray"
                size="14px"
                role="button"
                class="mobile-only"
                @click="deleteAddress(key)"
              />
              <SfButton data-cy="shipping-details-btn_change" @click="changeAddress(key)">Change</SfButton>
              <SfButton data-cy="shipping-details-btn_delete"
                class="shipping__button-delete desktop-only"
                @click="deleteAddress(key)"
                >Delete</SfButton
              >
            </div>
          </div>
        </transition-group>
        <SfButton data-cy="shipping-details-btn_add" class="action-button" @click="changeAddress(-1)"
          >Add new address</SfButton
        >
      </SfTab>
    </SfTabs>
  </transition>
</template>
<script>
import {
  SfTabs,
  SfInput,
  SfButton,
  SfSelect,
  SfIcon
} from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, oneOf } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

extend('oneOf', {
  ...oneOf,
  message: 'Invalid country'
});

export default {
  name: 'ShippingDetails',
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfSelect,
    SfIcon,
    ValidationProvider,
    ValidationObserver
  },
  props: {
    account: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      editAddress: false,
      editedAddress: -1,
      firstName: '',
      lastName: '',
      streetName: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phoneNumber: '',
      countries: [
        'Austria',
        'Azerbaijan',
        'Belarus',
        'Belgium',
        'Bosnia and Herzegovina',
        'Bulgaria',
        'Croatia',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Estonia',
        'Finland',
        'France',
        'Georgia',
        'Germany',
        'Greece',
        'Hungary',
        'Iceland',
        'Ireland',
        'Italy',
        'Kosovo',
        'Latvia',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Macedonia',
        'Malta',
        'Moldova',
        'Monaco',
        'Montenegro',
        'The Netherlands',
        'Norway',
        'Poland',
        'Portugal',
        'Romania',
        'Russia',
        'San Marino',
        'Serbia',
        'Slovakia',
        'Slovenia',
        'Spain',
        'Sweden',
        'Switzerland',
        'Turkey',
        'Ukraine',
        'United Kingdom',
        'Vatican City'
      ]
    };
  },
  methods: {
    changeAddress(index) {
      const account = this.account;
      const shipping = account.shipping[index];
      if (index > -1) {
        this.firstName = account.firstName;
        this.lastName = account.lastName;
        this.streetName = shipping.streetName;
        this.apartment = shipping.apartment;
        this.city = shipping.city;
        this.state = shipping.state;
        this.zipCode = shipping.zipCode;
        this.country = shipping.country;
        this.phoneNumber = shipping.phoneNumber;
        this.editedAddress = index;
      }
      this.editAddress = true;
    },
    updateAddress() {
      const account = { ...this.account };
      const shipping = {
        firstName: this.firstName,
        lastName: this.lastName,
        apartment: this.apartment,
        streetName: this.streetName,
        city: this.city,
        state: this.state,
        zipCode: this.zipCode,
        country: this.country,
        phoneNumber: this.phoneNumber
      };
      const index = this.editedAddress;
      if (index > -1) {
        account.shipping[index] = shipping;
        this.editedAddress = -1;
      } else {
        account.shipping.push(shipping);
      }
      this.editAddress = false;
      this.$emit('update:shipping', account);
    },
    deleteAddress(index) {
      const account = { ...this.account };
      account.shipping.splice(index, 1);
      this.$emit('update:shipping', account);
    }
  }
};
</script>
<style lang='scss' scoped>
@import '~@storefront-ui/vue/styles';
@mixin for-mobile {
  @media screen and (max-width: $desktop-min) {
    @content;
  }
}
@mixin for-desktop {
  @media screen and (min-width: $desktop-min) {
    @content;
  }
}
.form {
  &__element {
    display: block;
    margin-bottom: var(--spacer-2xl);
  }

  &__button {
    display: block;
  }

  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-2xl);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.message {
  margin: 0 0 var(--spacer-2xl) 0;
  font-family: var(--font-family-primary);
  line-height: 1.6;
  font-size: var(--font-base-mobile);
  @include for-desktop {
    font-size: var(--font-base-desktop);
  }
}
.shipping-list {
  margin-bottom: var(--spacer-2xl);
}
.shipping {
  display: flex;
  padding: var(--spacer-xl) 0;
  border-top: 1px solid var(--c-light);
  &:last-child {
    border-bottom: 1px solid var(--c-light);
  }
  &__content {
    flex: 1;
    color: var(--c-text);
    font-size: var(--font-sm-mobile);
    font-weight: 300;
    line-height: 1.6;
    @include for-desktop {
      font-size: var(--font-sm-desktop);
    }
  }
  &__actions {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @include for-desktop {
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
  }
  &__button-delete {
    background-color: var(--c-light);
    color: var(--c-text-muted);
    @include for-desktop {
      margin-left: var(--spacer-xl);
    }
  }
  &__address {
    margin: 0 0 var(--spacer-xl) 0;
    &:last-child {
      margin: 0;
    }
  }
  &__client-name {
    font-size: var(--font-base-desktop);
    font-weight: 500;
  }
}
.action-button {
  width: 100%;
  @include for-desktop {
    width: auto;
  }
}
.tab-orphan {
  @include for-mobile {
    ::v-deep .sf-tabs {
      &__title {
        display: none;
      }
      &__content {
        border: 0;
        padding: 0;
      }
    }
  }
}
</style>
