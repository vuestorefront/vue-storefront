<template>
  <span class="simple-price">
    {{ formattedPrice }}
  </span>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from '@vue/composition-api';

import Product from '@vue-storefront/core/modules/catalog/types/Product';

import { PriceHelper } from 'src/modules/shared';

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
    const formattedPrice = computed<string>(() => {
      const price = root.$store.getters['product/getProductPrice'](props.product);

      if (!price) {
        return '';
      }

      return PriceHelper.formatPrice(price[props.priceType]);
    });

    return {
      formattedPrice
    }
  }
})
</script>
