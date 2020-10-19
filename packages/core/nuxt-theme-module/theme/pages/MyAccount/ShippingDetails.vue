<template>
  <transition name="fade">
    <SfTabs
      v-if="editAddress"
      key="edit-address"
      :open-tab="1"
      class="tab-orphan"
    >
      <SfTab
        data-cy="shipping-details-tab_change"
        :title="isNewAddress ? 'Add the address' : 'Update the address'">
        <p class="message">
          Keep your addresses and contact details updated.
        </p>

        <ValidationObserver v-slot="{ handleSubmit }">
          <form id="shipping-details-form" class="form" @submit.prevent="handleSubmit(processAddress)">
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  data-cy="shipping-details-input_firstName"
                  v-model="address.firstName"
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
                  v-model="address.lastName"
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
                v-model="address.streetName"
                name="streetName"
                label="Street Name"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <SfInput
              data-cy="shipping-details-input_apartment"
              v-model="address.apartment"
              name="apartment"
              label="House/Apartment number"
              required
              class="form__element"
            />
            <div class="form__horizontal">
              <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
                <SfInput
                  data-cy="shipping-details-input_city"
                  v-model="address.city"
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
                  v-model="address.state"
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
                  v-model="address.zipCode"
                  name="zipCode"
                  label="Zip-code"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]"
                />
              </ValidationProvider>
              <ValidationProvider
                :rules="`required|oneOf:${ countries.map(c => c.name).join(',') }`"
                v-slot="{ errors }"
                class="form__element">
                <SfSelect
                  data-cy="shipping-details-select_country"
                  v-model="address.country"
                  name="country"
                  label="Country"
                  required
                  :valid="!errors[0]"
                  :errorMessage="errors[0]">
                  <SfSelectOption
                    v-for="{ name, label } in countries"
                    :key="name"
                    :value="name">
                    {{ label }}
                  </SfSelectOption>
                </SfSelect>
              </ValidationProvider>
            </div>
            <ValidationProvider rules="required|min:8" v-slot="{ errors }" class="form__element">
              <SfInput
                data-cy="shipping-details-input_phoneNumber"
                v-model="address.phoneNumber"
                name="phone"
                label="Phone number"
                required
                :valid="!errors[0]"
                :errorMessage="errors[0]"
              />
            </ValidationProvider>
            <SfCheckbox
              data-cy="shipping-details-checkbox_isDefault"
              v-model="address.isDefault"
              name="isDefault"
              label="Set as default"
              class="form__checkbox-isDefault"
            />
            <SfButton
              data-cy="shipping-details-btn_update"
              class="form__button"
            >
              {{ isNewAddress ? 'Add the address' : 'Update the address' }}
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
            v-for="(address, key) in userShippingGetters.getAddresses(shipping)"
            :key="userShippingGetters.getId(address)"
            class="shipping">
            <div class="shipping__content">
              <div class="shipping__address">
                <p class="shipping__client-name">
                  {{ userShippingGetters.getFirstName(address) }}
                  {{ userShippingGetters.getLastName(address) }}
                </p>
                <p>
                  {{ userShippingGetters.getStreetName(address) }}
                  {{ userShippingGetters.getApartmentNumber(address) }}
                </p>
                <p>
                  {{ userShippingGetters.getPostCode(address) }}
                  {{ userShippingGetters.getCity(address) }}
                </p>
                <p>{{ countries.find(c => c.name === userShippingGetters.getCountry(address)).label }}</p>
                <p>{{ userShippingGetters.getPhone(address) }}</p>
              </div>
            </div>
            <div class="shipping__actions">
              <SfIcon
                data-cy="shipping-details-icon_delete"
                icon="cross"
                color="gray"
                size="14px"
                role="button"
                class="mobile-only"
                @click="removeAddress(key)"
              />
              <SfButton
                data-cy="shipping-details-btn_change"
                @click="changeAddress(key)">
                Change
              </SfButton>

              <SfButton
                data-cy="shipping-details-btn_delete"
                class="shipping__button-delete desktop-only"
                @click="removeAddress(key)">
                Delete
              </SfButton>
            </div>
          </div>
        </transition-group>
        <SfButton
          data-cy="shipping-details-btn_add"
          class="action-button"
          @click="changeAddress(-1)">
          Add new address
        </SfButton>
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
import { getSettings } from '@vue-storefront/commercetools-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min, oneOf } from 'vee-validate/dist/rules';
import { useUserShipping, userShippingGetters } from '<%= options.generate.replace.composables %>';
import { ref, computed } from '@vue/composition-api';
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
  setup() {
    const resetForm = () => ({
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

    const { shipping, load: loadShipping, addAddress, deleteAddress, updateAddress } = useUserShipping();
    const address = ref(resetForm());
    const editAddress = ref(false);
    const editedAddress = ref(-1);
    const isNewAddress = computed(() => editedAddress.value === -1);

    const getFormById = (index) => {
      const shippingAddress = userShippingGetters.getAddresses(shipping.value)[index];

      return {
        id: userShippingGetters.getId(shippingAddress),
        firstName: userShippingGetters.getFirstName(shippingAddress),
        lastName: userShippingGetters.getLastName(shippingAddress),
        streetName: userShippingGetters.getStreetName(shippingAddress),
        apartment: userShippingGetters.getApartmentNumber(shippingAddress),
        city: userShippingGetters.getCity(shippingAddress),
        state: userShippingGetters.getProvince(shippingAddress),
        zipCode: userShippingGetters.getPostCode(shippingAddress),
        country: userShippingGetters.getCountry(shippingAddress),
        phoneNumber: userShippingGetters.getPhone(shippingAddress),
        isDefault: userShippingGetters.isDefault(shippingAddress)
      };
    };

    const changeAddress = async (index) => {
      editedAddress.value = index;
      address.value = isNewAddress.value ? resetForm() : getFormById(index);
      editAddress.value = true;
    };

    const removeAddress = index => deleteAddress(userShippingGetters.getAddresses(shipping.value)[index]);

    const processAddress = async () => {
      const actionMethod = isNewAddress.value ? addAddress : updateAddress;
      const { id, ...rest } = address.value;

      await actionMethod({
        ...(isNewAddress.value ? {} : { id }),
        ...rest
      });
      editAddress.value = false;
      editedAddress.value = -1;
    };

    onSSR(async () => {
      await loadShipping();
    });

    return {
      changeAddress,
      updateAddress,
      removeAddress,
      processAddress,
      userShippingGetters,
      shipping,
      editAddress,
      editedAddress,
      isNewAddress,
      countries: getSettings().countries,
      address
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
    margin: 0;

    p {
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
