<template>
  <span
    class="storyblok-rich-text-price-component"
    :class="{'-colorful': isColorful}"
  >
    <span class="_regular-price" v-if="showRegularPrice">
      {{ formattedRegularPrice }}
    </span>

    <span class="_final-price">
      {{ formattedFinalPrice }}
    </span>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api';

import Product from '@vue-storefront/core/modules/catalog/types/Product';

import { PriceHelper } from '@vue-storefront/core/helpers';
import { PRODUCT_LOCALIZED_PRICE_DICTIONARY } from '@vue-storefront/core/modules/catalog';
import { Currency, GET_ACTIVE_CURRENCY } from 'src/modules/currency';

export default defineComponent({
  name: 'StoryblokRichTextPriceComponent',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    },
    isPromo: {
      type: Boolean,
      default: true
    },
    isColorful: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { root }) {
    const productPrice = computed<PriceHelper.ProductPrice>(() => {
      return root.$store.getters[PRODUCT_LOCALIZED_PRICE_DICTIONARY][props.product.id];
    });

    const finalPrice = computed<number>(() => {
      const _productPrice = productPrice.value;

      return PriceHelper.getFinalPrice({
        special: _productPrice.special,
        regular: _productPrice.regular
      });
    });

    const selectedCurrency = computed<Currency>(() => {
      return root.$store.getters[GET_ACTIVE_CURRENCY];
    });

    const formattedFinalPrice = computed<string>(() => {
      return PriceHelper.formatPrice(finalPrice.value, selectedCurrency.value.symbol);
    });
    const formattedRegularPrice = computed<string>(() => {
      return PriceHelper.formatPrice(productPrice.value.regular, selectedCurrency.value.symbol);
    });

    const showRegularPrice = computed<boolean>(() => {
      return productPrice.value.special !== null && props.isPromo;
    });

    return {
      formattedFinalPrice,
      formattedRegularPrice,
      showRegularPrice
    }
  }
})
</script>

<style lang="scss" scoped>
.storyblok-rich-text-price-component {
  ._regular-price {
    text-decoration: line-through;
    font-style: italic;
    font-weight: normal;
    margin-right: var(--spacer-2xs);
  }

  &.-colorful {
    font-size: 24px;

    ._regular-price {
      color: var(--c-warning);
      margin-right: var(--spacer-xs);
    }

    ._final-price {
      color: (var(--c-final-price), var(--c-accent));
      font-weight: bold;
    }
  }
}
</style>
