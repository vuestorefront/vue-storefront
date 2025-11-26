<template>
  <div
    class="address-card"
  >
    <p class="_street">
      {{ address.streetAddress }}
    </p>

    <p v-if="address.apartmentNumber" class="_apartment">
      {{ address.apartmentNumber }}
    </p>

    <p class="_location">
      {{ address.city }}, {{ stateName }} {{ address.zipCode }}
    </p>

    <p class="_country">
      {{ address.country }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api';
import BaseAddressDetails from '@vue-storefront/core/modules/checkout/types/BaseAddressDetails';

const States = require('@vue-storefront/i18n/resource/states.json');

export default defineComponent({
  name: 'AddressCard',
  props: {
    address: {
      type: Object as PropType<Partial<BaseAddressDetails>>,
      required: true
    }
  },
  setup (props) {
    const stateName = computed<string>(() => {
      if (props.address.state) {
        return props.address.state;
      }

      if (props.address.region_id && props.address.country) {
        const countryData = States[props.address.country.toUpperCase()];

        if (countryData) {
          const stateItem = countryData.find((stateData: { code: string, name: string, id: number }) => {
            return stateData.id === props.address.region_id;
          });

          return stateItem?.name || '';
        }
      }

      return '';
    });

    return {
      stateName
    };
  }
});
</script>

<style lang="scss" scoped>
.address-card {
  flex-grow: 1;

  p {
    margin: 0 0 var(--spacer-2xs) 0;
    line-height: 1.6;
    color: var(--c-text);

    &:last-child {
      margin-bottom: 0;
    }
  }

  ._street,
  ._apartment,
  ._location {
    font-size: var(--font-base);
  }

  ._country {
    font-size: var(--font-sm);
    color: var(--c-text-muted);
  }
}
</style>
