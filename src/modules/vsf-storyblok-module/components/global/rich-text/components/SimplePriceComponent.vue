<template>
  <span class="simple-price">
    {{ formattedPrice }}
  </span>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from '@vue/composition-api';

import Product from '@vue-storefront/core/modules/catalog/types/Product';

import { PriceHelper } from '@vue-storefront/core/helpers';
import { GET_SELECTED_CURRENCY, Currency } from 'src/modules/currency';

export enum PriceType {
  regular = 'regular',
  special = 'special'
}

export default defineComponent({
  name: 'StoryblokSimplePriceComponent',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    },
    priceType: {
      type: String as PropType<PriceType>,
      required: true
    }
  },
  setup (props, { root }) {
    const selectedCurrency = computed<Currency>(() => {
      return root.$store.getters[GET_SELECTED_CURRENCY];
    });

    const formattedPrice = computed<string>(() => {
      const price = root.$store.getters['product/getProductPrice'](props.product);

      if (!price) {
        return '';
      }

      return PriceHelper.formatPrice(price[props.priceType], selectedCurrency.value.symbol);
    });

    return {
      formattedPrice
    }
  }
})
</script>
