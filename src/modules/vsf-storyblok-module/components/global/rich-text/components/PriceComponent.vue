<template>
  <span class="storyblok-rich-text-price-component">
    <span class="_regular-price" :class="{'-strike': isRegularStrike}">
      {{ regularPrice }}
    </span>

    <span class="_special-price" v-if="specialPrice">
      {{ specialPrice }}
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
    }
  },
  computed: {
    formattedRegularPrice (): string {
      return this.formatPrice(this.regularPrice);
    },
    formattedSpecialPrice (): string {
      return this.specialPrice ? this.formatPrice(this.specialPrice) : '';
    },
    isRegularStrike (): boolean {
      return !!this.specialPrice;
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
    color: var(--c-primary);
    text-decoration: none;
    font-style: normal;
    font-weight: bold;

    &.-strike {
      text-decoration: line-through;
      color: var(--c-warning);
      font-style: italic;
      font-weight: normal;
    }
  }

  ._special-price {
      color: var(--c-primary);
      font-weight: bold;
  }
}
</style>
