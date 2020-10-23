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
import { userBillingGetters } from '@vue-storefront/commercetools';

export default {
  props: {
    address: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const data = reactive({
      firstName: computed(() => userBillingGetters.getFirstName(props.address)),
      lastName: computed(() => userBillingGetters.getLastName(props.address)),
      streetName: computed(() => userBillingGetters.getStreetName(props.address)),
      streetNumber: computed(() => userBillingGetters.getStreetNumber(props.address)),
      apartment: computed(() => userBillingGetters.getApartmentNumber(props.address)),
      zipCode: computed(() => userBillingGetters.getPostCode(props.address)),
      city: computed(() => userBillingGetters.getCity(props.address)),
      state: computed(() => userBillingGetters.getProvince(props.address)),
      phoneNumber: computed(() => userBillingGetters.getPhone(props.address)),
      country: computed(() => {
        const country = userBillingGetters.getCountry(props.address);
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
