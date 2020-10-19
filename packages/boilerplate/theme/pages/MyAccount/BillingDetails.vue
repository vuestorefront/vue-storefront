<template>
  <transition name="fade">
    <SfTabs
      v-if="editAddress"
      key="edit-address"
      :open-tab="1"
      class="tab-orphan"
    >
      <SfTab data-cy="billing-details-tab_change" title="Change the address">
        <p class="message">
          Keep your addresses and contact details updated.
        </p>

        <ValidationObserver v-slot="{ handleSubmit }">
          <form id="billing-details-form" class="form" @submit.prevent="handleSubmit(processAddress)">
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  data-cy="billing-details-input_firstName"
                  v-model="currentAddress.firstName"
                  name="firstName"
                  label="First Name"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  data-cy="billing-details-input_lastName"
                  v-model="currentAddress.lastName"
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
                data-cy="billing-details-input_streetName"
                v-model="currentAddress.streetName"
                name="streetName"
                label="Street Name"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <SfInput
              data-cy="billing-details-input_apartment"
              v-model="currentAddress.apartment"
              name="apartment"
              label="House/Apartment number"
              required
              class="form__element"
            />
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  data-cy="billing-details-input_city"
                  v-model="currentAddress.city"
                  name="city"
                  label="City"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  data-cy="billing-details-input_state"
                  v-model="currentAddress.state"
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
                  data-cy="billing-details-input_zipCode"
                  v-model="currentAddress.zipCode"
                  name="zipCode"
                  label="Zip-code"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider :rules="`required|oneOf:${countries.join(',')}`" v-slot="{ errors }" class="form__element">
                <SfSelect
                  data-cy="billing-details-select_country"
                  v-model="currentAddress.country"
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
                data-cy="billing-details-input_phoneNumber"
                v-model="currentAddress.phoneNumber"
                name="phone"
                label="Phone number"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <SfCheckbox
              data-cy="billing-details-checkbox_isDefault"
              v-model="currentAddress.isDefault"
              name="isDefault"
              label="Set as default"
              class="form__checkbox-isDefault"
            />
            <SfButton
              data-cy="billing-details-btn_update"
              class="form__button"
            >
              {{ editedAddress === -1 ? 'Add the address' : 'Update the address' }}
            </SfButton>
          </form>
        </ValidationObserver>
      </SfTab>
    </SfTabs>
    <SfTabs v-else key="address-list" :open-tab="1" class="tab-orphan">
      <SfTab data-cy="billing-details-tab_details" title="Billing details">
        <p class="message">
          Manage all the billing addresses you want (work place, home address
          ...) This way you won"t have to enter the billing address manually
          with each order.
        </p>
        <transition-group tag="div" name="fade" class="billing-list">
          <div
            v-for="(billing, key) in billingAddresses"
            :key="userBillingGetters.getId(billing)"
            class="billing"
          >
            <div class="billing__content">
              <p class="billing__address">
                <span class="billing__client-name"
                  >{{ userBillingGetters.getFirstName(billing) }} {{ userBillingGetters.getLastName(billing) }}</span
                ><br />
                {{ userBillingGetters.getStreetName(billing) }} {{ userBillingGetters.getApartmentNumber(billing) }}<br />{{
                  userBillingGetters.getPostCode(billing)
                }}
                {{ userBillingGetters.getCity(billing) }},<br />{{ userBillingGetters.getCountry(billing) }}
              </p>
              <p class="billing__address">
                {{ userBillingGetters.getPhone(billing) }}
              </p>
            </div>
            <div class="billing__actions">
              <SfIcon
                data-cy="billing-details-icon_delete"
                icon="cross"
                color="gray"
                size="14px"
                role="button"
                class="mobile-only"
                @click="removeAddress(key)"
              />
              <SfButton data-cy="billing-details-btn_change" @click="changeAddress(key)">Change</SfButton>
              <SfButton data-cy="billing-details-btn_delete"
                class="billing__button-delete desktop-only"
                @click="removeAddress(key)"
                >Delete</SfButton
              >
            </div>
          </div>
        </transition-group>
        <SfButton data-cy="billing-details-btn_add" class="action-button" @click="changeAddress(-1)"
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
  SfIcon,
  SfCheckbox
} from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, oneOf } from 'vee-validate/dist/rules';
import { useUserBilling, userBillingGetters } from '@vue-storefront/boilerplate';
import { ref, reactive, computed } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';

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
  name: 'BillingDetails',
  components: {
    SfTabs,
    SfInput,
    SfButton,
    SfSelect,
    SfIcon,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },
  setup () {
    const { billing, load: loadBilling, addAddress, deleteAddress, updateAddress } = useUserBilling();

    const editAddress = ref(false);
    const editedAddress = ref(-1);

    const currentAddress = reactive({
      id: '',
      firstName: '',
      lastName: '',
      streetName: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phoneNumber: '',
      isDefault: false
    });

    const changeAddress = async (index) => {
      if (index > -1) {
        const billingAddress = userBillingGetters.getAddresses(billing.value)[index];
        currentAddress.id = userBillingGetters.getId(billingAddress);
        currentAddress.firstName = userBillingGetters.getFirstName(billingAddress);
        currentAddress.lastName = userBillingGetters.getLastName(billingAddress);
        currentAddress.streetName = userBillingGetters.getStreetName(billingAddress);
        currentAddress.apartment = userBillingGetters.getApartmentNumber(billingAddress);
        currentAddress.city = userBillingGetters.getCity(billingAddress);
        currentAddress.state = userBillingGetters.getProvince(billingAddress);
        currentAddress.zipCode = userBillingGetters.getPostCode(billingAddress);
        currentAddress.country = userBillingGetters.getCountry(billingAddress);
        currentAddress.phoneNumber = userBillingGetters.getPhone(billingAddress);
        currentAddress.isDefault = userBillingGetters.isDefault(billingAddress);
        editedAddress.value = index;
      } else {
        currentAddress.id = '';
        currentAddress.firstName = '';
        currentAddress.lastName = '';
        currentAddress.streetName = '';
        currentAddress.apartment = '';
        currentAddress.city = '';
        currentAddress.state = '';
        currentAddress.zipCode = '';
        currentAddress.country = '';
        currentAddress.phoneNumber = '';
        currentAddress.isDefault = false;
        editedAddress.value = -1;
      }
      editAddress.value = true;
    };
    const removeAddress = index => deleteAddress(userBillingGetters.getAddresses(billing.value)[index]);
    const processAddress = async () => {
      const actionMethod = editedAddress.value > -1 ? updateAddress : addAddress;
      await actionMethod({
        ...(editedAddress.value > -1 ? { id: currentAddress.id } : {}),
        firstName: currentAddress.firstName,
        lastName: currentAddress.lastName,
        streetName: currentAddress.streetName,
        apartment: currentAddress.apartment,
        city: currentAddress.city,
        state: currentAddress.state,
        zipCode: currentAddress.zipCode,
        country: currentAddress.country,
        phoneNumber: currentAddress.phoneNumber,
        isDefault: currentAddress.isDefault
      });
      editAddress.value = false;
      editedAddress.value = -1;
    };
    onSSR(loadBilling);
    return {
      changeAddress,
      updateAddress,
      removeAddress,
      processAddress,
      userBillingGetters,
      billingAddresses: computed(() => userBillingGetters.getAddresses(billing.value)),
      editAddress,
      editedAddress,
      currentAddress,
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
  &__checkbox {
    &-isDefault {
      margin-bottom: var(--spacer-2xl);
    }
  }
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
.billing-list {
  margin-bottom: var(--spacer-2xl);
}
.billing {
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
