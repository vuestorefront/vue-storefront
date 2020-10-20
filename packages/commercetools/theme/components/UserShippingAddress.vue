<template>
  <div>
    <p class="name">
      {{ data.name }}
    </p>

    <p>
      {{ data.street }}
    </p>

    <p>
      {{ data.city }}
      {{ data.state }}
      {{ data.zipCode }}
    </p>

    <p>{{ data.country }}</p>
    <p v-if="data.phoneNumber">T: {{ data.phoneNumber }}</p>
  </div>
</template>

<script>
import { reactive, computed } from '@vue/composition-api';
import { getSettings } from '@vue-storefront/commercetools-api';
import { userShippingGetters } from '@vue-storefront/commercetools';

export default {
  props: {
    address: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const data = reactive({
      firstName: computed(() => userShippingGetters.getFirstName(props.address)),
      lastName: computed(() => userShippingGetters.getLastName(props.address)),
      streetName: computed(() => userShippingGetters.getStreetName(props.address)),
      streetNumber: computed(() => userShippingGetters.getStreetNumber(props.address)),
      apartment: computed(() => userShippingGetters.getApartmentNumber(props.address)),
      zipCode: computed(() => userShippingGetters.getPostCode(props.address)),
      city: computed(() => userShippingGetters.getCity(props.address)),
      state: computed(() => userShippingGetters.getProvince(props.address)),
      phoneNumber: computed(() => userShippingGetters.getPhone(props.address)),
      country: computed(() => {
        const country = userShippingGetters.getCountry(props.address);
        return getSettings().countries.find(c => c.name === country)?.label || country;
      }),
      name: computed(() => `${ data.firstName } ${ data.lastName }`),
      street: computed(() => {
        const parts = [
          data.streetName,
          data.streetNumber && ` ${ data.streetNumber }`,
          data.apartment && `, Apartment ${ data.apartment }`
        ];

        return parts.filter(Boolean).join('');
      })
    });

    return {
      data
    };
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.name {
  font-weight: var(--font-weight--semibold);
}
</style>
