<template>
  <span class="storyblok-rich-text-price-component">
    <span class="_regular-price" v-if="showRegularPrice">
      {{ formattedRegularPrice }}
    </span>

    <span class="_final-price">
      {{ formattedFinalPrice }}
    </span>
  </span>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { price as priceFormatter } from '@vue-storefront/core/filters';

export default Vue.extend({
  name: 'StoryblokRichTextPriceComponent',
  props: {
    regularPrice: {
      type: Number,
      required: true
    },
    specialPrice: {
      type: Number as PropType<number | undefined>,
      default: undefined
    },
    isPromo: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    finalPrice (): number {
      return this.specialPrice ? this.specialPrice : this.regularPrice;
    },
    formattedFinalPrice (): string {
      return this.formatPrice(this.finalPrice)
    },
    formattedRegularPrice (): string {
      return this.formatPrice(this.regularPrice);
    },
    showRegularPrice (): boolean {
      return !!this.specialPrice && this.isPromo;
    }
  },
  methods: {
    formatPrice (value: number): string {
      return value ? priceFormatter(value) : ''
    }
  }
})
</script>

<style lang="scss" scoped>
.storyblok-rich-text-price-component {
  font-size: 24px;

  ._regular-price {
    text-decoration: line-through;
    color: var(--c-warning);
    font-style: italic;
    font-weight: normal;
    margin-right: var(--spacer-xs);
  }

  ._final-price {
      color: var(--c-primary);
      font-weight: bold;
  }
}
</style>
