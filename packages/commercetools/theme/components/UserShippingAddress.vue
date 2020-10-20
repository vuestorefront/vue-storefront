<template>
  <div>
    <p>
      {{ firstName }} {{ lastName }}
    </p>

    <p>
      {{ streetName }}
      {{ streetNumber }}
      {{ apartment ? `, Apartment ${ apartment }` : '' }}
    </p>

    <p>
      {{ city }}
      {{ state }}
      {{ zipCode }}
    </p>

    <p>{{ country }}</p>
    <p>T: {{ phoneNumber }}</p>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';
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
    return {
      firstName: computed(() => userShippingGetters.getFirstName(props.address)),
      lastName: computed(() => userShippingGetters.getLastName(props.address)),
      streetName: computed(() => userShippingGetters.getStreetName(props.address)),
      streetNumber: computed(() => userShippingGetters.getStreetNumber(props.address)),
      apartment: computed(() => userShippingGetters.getApartmentNumber(props.address)),
      zipCode: computed(() => userShippingGetters.getPostCode(props.address)),
      city: computed(() => userShippingGetters.getCity(props.address)),
      state: computed(() => userShippingGetters.getProvince(props.address)),
      country: computed(() => {
        const country = userShippingGetters.getCountry(props.address);
        return getSettings().countries.find(c => c.name === country)?.label || country;
      }),
      phoneNumber: computed(() => userShippingGetters.getPhone(props.address))
    };
  }
};
</script>

<style lang="scss">
p {
  margin: 0;
}
</style>
