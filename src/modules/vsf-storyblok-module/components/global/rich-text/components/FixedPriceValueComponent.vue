<template>
  <span class="fixed-price-value">
    {{ formattedPrice }}
  </span>
</template>

<script lang="ts">
import { useStore } from '@vue-storefront/core/application-services';
import { computed, defineComponent, PropType } from 'vue';

import { PriceHelper } from '@vue-storefront/core/helpers';
import { Currency, DEFAULT_CURRENCY, GET_ACTIVE_CURRENCY, GET_CURRENCY_EXCHANGE_RATE } from 'src/modules/currency';

export default defineComponent({
  name: 'StoryblokFixedPriceValueComponent',
  props: {
    amount: {
      type: Number as PropType<number>,
      required: true
    }
  },
  setup (props) {
    const applicationStore = useStore();
    const selectedCurrency = computed<Currency>(() => {
      return applicationStore.getters[GET_ACTIVE_CURRENCY] || DEFAULT_CURRENCY;
    });

    const exchangeRate = computed<number>(() => {
      return applicationStore.getters[GET_CURRENCY_EXCHANGE_RATE] || 1;
    });

    const formattedPrice = computed<string>(() => {
      return PriceHelper.formatPrice(
        props.amount * exchangeRate.value,
        selectedCurrency.value.symbol
      );
    });

    return {
      formattedPrice
    }
  }
})
</script>
