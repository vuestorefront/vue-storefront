<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form
      id="billing-details-form"
      class="form"
      @submit.prevent="handleSubmit(submitForm)"
    >
      <div class="form__horizontal">
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            v-model="form.firstName"
            name="firstName"
            :label="$t('First Name')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            v-model="form.lastName"
            name="lastName"
            :label="$t('Last Name')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <ValidationProvider
        rules="required"
        v-slot="{ errors }"
        class="form__element"
      >
        <SfInput
          v-model="form.streetName"
          name="streetName"
          :label="$t('Street Name')"
          required
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>
      <ValidationProvider
        rules="required"
        v-slot="{ errors }"
        class="form__element"
      >
        <SfInput
          v-model="form.streetNumber"
          name="apartment"
          :label="$t('House/Apartment number')"
          required
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>
      <div class="form__horizontal">
        <ValidationProvider
          rules="required"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            v-model="form.city"
            name="city"
            :label="$t('City')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <ValidationProvider
          :rules="validationRules.country"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfSelect
            class="form__select sf-select--underlined"
            v-model="form.country"
            name="country"
            :label="$t('Country')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          >
            <SfSelectOption
              v-for="{ name, label } in countries"
              :key="name"
              :value="name"
            >
              {{ $t(label) }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
      </div>
      <div class="form__horizontal">
        <ValidationProvider
          name="state"
          :rules="validationRules.state"
          v-slot="{ errors }"
          slim
        >
          <SfSelect
            v-model="form.state"
            :label="$t('State/Province')"
            name="state"
            class="form__element form__element--half form__element--half-even form__select sf-select--underlined"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            :disabled="!statesInSelectedCountry"
          >
            <SfSelectOption
              v-for="state in statesInSelectedCountry"
              :key="state"
              :value="state"
            >
              {{ state }}
            </SfSelectOption>
          </SfSelect>
        </ValidationProvider>
        <ValidationProvider
          rules="required|min:2"
          v-slot="{ errors }"
          class="form__element"
        >
          <SfInput
            v-model="form.postalCode"
            name="zipCode"
            :label="$t('Zip-code')"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
      </div>
      <ValidationProvider
        rules="required|phone"
        v-slot="{ errors }"
        class="form__element"
      >
        <SfInput
          v-model="form.phone"
          name="phone"
          :label="$t('Phone number')"
          required
          :valid="!errors[0]"
          :errorMessage="errors[0]"
        />
      </ValidationProvider>
      <SfCheckbox
        v-model="form.isDefault"
        name="isDefault"
        :label="$t('Set as default')"
        class="form__checkbox-isDefault"
      />
      <SfButton class="form__button">
        {{ isNew ? $t('Add the address') : $t('Update the address') }}
      </SfButton>
    </form>
  </ValidationObserver>
</template>

<script>
import {
  SfInput,
  SfButton,
  SfSelect,
  SfCheckbox
} from '@storefront-ui/vue';
import { required, min, oneOf } from 'vee-validate/dist/rules';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { reactive, computed, watch } from '@nuxtjs/composition-api';
import { useVSFContext } from '@vue-storefront/core';
import '@/helpers/validators/phone';

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
  name: 'BillingAddressForm',

  components: {
    SfInput,
    SfButton,
    SfSelect,
    SfCheckbox,
    ValidationProvider,
    ValidationObserver
  },

  props: {
    address: {
      type: Object,
      default: () => ({
        id: undefined,
        firstName: '',
        lastName: '',
        streetName: '',
        streetNumber: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phone: '',
        isDefault: false
      })
    },
    isNew: {
      type: Boolean,
      required: true
    }
  },

  setup(props, { emit }) {
    const { $ct: { config } } = useVSFContext();
    const form = reactive({
      id: props.address.id,
      firstName: props.address.firstName,
      lastName: props.address.lastName,
      streetName: props.address.streetName,
      streetNumber: props.address.streetNumber,
      city: props.address.city,
      state: props.address.state,
      postalCode: props.address.postalCode,
      country: props.address.country,
      phone: props.address.phone,
      isDefault: props.address.isDefault
    });

    const submitForm = () => {
      emit('submit', {
        form,
        onComplete: () => {},
        // TODO: Handle Error
        onError: () => {}
      });
    };

    const statesInSelectedCountry = computed(() => {
      if (!form.country) {
        return null;
      }
      const selectedCountry = config.countries.find(country => country.name === form.country);
      return selectedCountry && selectedCountry.states;
    });

    const validationRules = {
      contry: `required|oneOf:${config.countries.map(c => c.name).join(',')}`,
      state: !statesInSelectedCountry ? null : 'required|min:2'
    };

    watch(statesInSelectedCountry, statesInSelectedCountry => {
      const countryHasStates = statesInSelectedCountry && statesInSelectedCountry.length;
      if (!countryHasStates && form.state) {
        form.state = null;
      }
    });

    return {
      form,
      validationRules,
      submitForm,
      countries: config.countries,
      statesInSelectedCountry
    };
  }
};
</script>

<style lang='scss' scoped>
.form {
  &__element {
    display: block;
    margin-bottom: var(--spacer-base);
  }
  &__select {
    display: flex;
    align-items: center;
    --select-option-font-size: var(--font-size--lg);
    flex-wrap: wrap;
    ::v-deep .sf-select__dropdown {
      font-size: var(--font-size--lg);
      // margin: 0;
      font-family: var(--font-family--secondary);
      font-weight: var(--font-weight--normal);
    }
  }
  &__button {
    display: block;
    margin-top: var(--spacer-lg);
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
        margin-right: var(--spacer-lg);
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
