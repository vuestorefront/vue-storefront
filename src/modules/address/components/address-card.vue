<template>
  <address
    class="address-card"
  >
    <p
      class="_street"
      :class="{ '_highlighted': isHighlighted('streetAddress') }"
    >
      {{ address.streetAddress }}
    </p>

    <p
      v-if="address.apartmentNumber"
      class="_apartment"
      :class="{ '_highlighted': isHighlighted('apartmentNumber') }"
    >
      {{ address.apartmentNumber }}
    </p>

    <p class="_location">
      <span :class="{ '_highlighted': isHighlighted('city') }">{{ address.city }}</span>

      <span v-if="address.city">, </span>

      <span :class="{ '_highlighted': isHighlighted('state') }">{{ stateName }}</span>

      <span :class="{ '_highlighted': isHighlighted('zipCode') }">{{ address.zipCode }}</span>
    </p>

    <p
      class="_country"
      :class="{ '_highlighted': isHighlighted('country') }"
    >
      {{ address.country }}
    </p>
  </address>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api';
import AddressValidationDetails from '../types/address-validation-details.interface';

const States = require('@vue-storefront/i18n/resource/states.json');

export default defineComponent({
  name: 'AddressCard',
  props: {
    address: {
      type: Object as PropType<AddressValidationDetails>,
      required: true
    },
    highlightedFields: {
      type: Array as PropType<string[]>,
      default: () => []
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

    const isHighlighted = (fieldName: string): boolean => {
      return props.highlightedFields.includes(fieldName);
    };

    return {
      stateName,
      isHighlighted
    };
  }
});
</script>

<style lang="scss" scoped>
.address-card {
  flex-grow: 1;
  font-style: normal;

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

  ._highlighted {
    font-weight: var(--font-bold);
  }
}
</style>
