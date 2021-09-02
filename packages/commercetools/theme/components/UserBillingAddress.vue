<template>
  <div>
    <p>{{ address.firstName }} {{ address.lastName }}</p>
    <p>{{ street }}</p>

    <p>
      {{ address.city }}
      {{ address.state }}
      {{ address.postalCode }}
    </p>

    <p>{{ country }}</p>
    <p v-if="address.phone" class="phone">{{ address.phone }}</p>
  </div>
</template>

<script>
import { toRef, computed } from '@vue/composition-api';
import { useVSFContext } from '@vue-storefront/core';

export default {
  props: {
    address: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { $ct: { config } } = useVSFContext();
    const address = toRef(props, 'address');

    const street = computed(() => {
      const parts = [
        address.streetName,
        address.streetNumber && ` ${ address.streetNumber }`,
        address.apartment && `, Apartment ${ address.apartment }`
      ];

      return parts.filter(Boolean).join('');
    });

    const country = computed(() => {
      const country = address.country;
      return config.countries.find(c => c.name === country)?.label || country;
    });

    return {
      street,
      country
    };
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.phone {
  margin-top: var(--spacer-base);
}
</style>
