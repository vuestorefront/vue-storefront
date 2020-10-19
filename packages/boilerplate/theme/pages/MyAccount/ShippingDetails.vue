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
          <form id="shipping-details-form" class="form" @submit.prevent="handleSubmit(processAddress)">
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  data-cy="shipping-details-input_firstName"
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
                  data-cy="shipping-details-input_lastName"
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
                data-cy="shipping-details-input_streetName"
                v-model="currentAddress.streetName"
                name="streetName"
                label="Street Name"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <SfInput
              data-cy="shipping-details-input_apartment"
              v-model="currentAddress.apartment"
              name="apartment"
              label="House/Apartment number"
              required
              class="form__element"
            />
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  data-cy="shipping-details-input_city"
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
                  data-cy="shipping-details-input_state"
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
                  data-cy="shipping-details-input_zipCode"
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
                  data-cy="shipping-details-select_country"
                  class="form__select sf-select--underlined"
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
                data-cy="shipping-details-input_phoneNumber"
                v-model="currentAddress.phoneNumber"
                name="phone"
                label="Phone number"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <SfCheckbox
              data-cy="shipping-details-checkbox_isDefault"
              v-model="currentAddress.isDefault"
              name="isDefault"
              label="Set as default"
              class="form__checkbox-isDefault"
            />
            <SfButton
              data-cy="shipping-details-btn_update"
              class="form__button"
            >
              {{ editedAddress === -1 ? 'Add the address' : 'Update the address' }}
            </SfButton>
          </form>
        </ValidationObserver>
      </SfTab>
    </SfTabs>
    <SfTabs v-else key="address-list" :open-tab="1" class="tab-orphan">
      <SfTab data-cy="shipping-details-tab_details" title="Shipping details">
        <p class="message">
          Manage all the shipping addresses you want (work place, home address
          ...) This way you won"t have to enter the shipping address manually
          with each order.
        </p>
        <transition-group tag="div" name="fade" class="shipping-list">
          <div
            v-for="(shipping, key) in shippingAddresses"
            :key="userShippingGetters.getId(shipping)"
            class="shipping"
          >
            <div class="shipping__content">
              <p class="shipping__address">
                <span class="shipping__client-name"
                  >{{ userShippingGetters.getFirstName(shipping) }} {{ userShippingGetters.getLastName(shipping) }}</span
                ><br />
                {{ userShippingGetters.getStreetName(shipping) }} {{ userShippingGetters.getStreetNumber(shipping) }} {{ userShippingGetters.getApartmentNumber(shipping) }}<br />{{
                  userShippingGetters.getPostCode(shipping)
                }}
                {{ userShippingGetters.getCity(shipping) }},<br />{{ userShippingGetters.getCountry(shipping) }}
              </p>
              <p class="shipping__address">
                {{ userShippingGetters.getPhone(shipping) }}
              </p>
            </div>
            <div class="shipping__actions">
              <SfIcon
                data-cy="shipping-details-icon_delete"
                icon="cross"
                color="gray"
                size="14px"
                role="button"
                class="smartphone-only"
                @click="removeAddress(key)"
              />
              <SfButton data-cy="shipping-details-btn_change" @click="changeAddress(key)">Change</SfButton>
              <SfButton data-cy="shipping-details-btn_delete"
                class="shipping__button-delete desktop-only"
                @click="removeAddress(key)"
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
  SfIcon,
  SfCheckbox
} from '@storefront-ui/vue';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, oneOf } from 'vee-validate/dist/rules';
import { useUserShipping, userShippingGetters } from '@vue-storefront/boilerplate';
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
  name: 'ShippingDetails',
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
    const { shipping, load: loadShipping, addAddress, deleteAddress, updateAddress } = useUserShipping();

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
        const shippingAddress = userShippingGetters.getAddresses(shipping.value)[index];
        currentAddress.id = userShippingGetters.getId(shippingAddress);
        currentAddress.firstName = userShippingGetters.getFirstName(shippingAddress);
        currentAddress.lastName = userShippingGetters.getLastName(shippingAddress);
        currentAddress.streetName = userShippingGetters.getStreetName(shippingAddress);
        currentAddress.apartment = userShippingGetters.getApartmentNumber(shippingAddress);
        currentAddress.city = userShippingGetters.getCity(shippingAddress);
        currentAddress.state = userShippingGetters.getProvince(shippingAddress);
        currentAddress.zipCode = userShippingGetters.getPostCode(shippingAddress);
        currentAddress.country = userShippingGetters.getCountry(shippingAddress);
        currentAddress.phoneNumber = userShippingGetters.getPhone(shippingAddress);
        currentAddress.isDefault = userShippingGetters.isDefault(shippingAddress);
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
    const removeAddress = index => deleteAddress(userShippingGetters.getAddresses(shipping.value)[index]);
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
    onSSR(loadShipping);
    return {
      changeAddress,
      updateAddress,
      removeAddress,
      processAddress,
      userShippingGetters,
      shippingAddresses: computed(() => userShippingGetters.getAddresses(shipping.value)),
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
.form {
  &__checkbox {
    &-isDefault {
      margin: var(--spacer-xl) 0;
    }
  }

  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      margin: 0;
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  &__element {
    display: block;
    margin-bottom: var(--spacer-lg);
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
  font-family: var(--font-family--primary);
  line-height: 1.6;
  font-size: var(--font-size--base);
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
    font-size: var(--font-size--base);
    font-weight: 300;
    line-height: 1.6;
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
    font-size: var(--font-size--base);
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
