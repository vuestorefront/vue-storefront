<template>
  <div
    class="grid"
    :class="cssClasses"
    :style="styles"
  >
    <div
      v-for="_item in item.items"
      :key="_item.uuid"
      class="_item"
      :style="itemStyles"
    >
      <sb-render class="box" :item="_item" />
    </div>
  </div>
</template>

<script lang="ts">
import { Blok } from '..'

export default Blok.extend({
  name: 'GridBlok',
  computed: {
    extraCssClasses (): string[] {
      const result: string [] = [];
      const classPrefix = '-columns-';
      const sizes: Record<string, string> = {
        'xsmall': '',
        'small': 'sm-',
        'medium': 'md-',
        'large': 'lg-',
        'xlarge': 'xlg-'
      }

      for (const field in sizes) {
        const prefix = sizes[field];
        const value = this.item.columns_count[field];

        if (!value) {
          continue;
        }

        result.push(classPrefix + prefix + value);
      }

      if (this.item.width === 'narrow') {
        result.push('-narrow');
      }

      if (this.item.display === 'mobile-only') {
        result.push('-mobile-only');
      }

      if (this.item.display === 'mobile-hidden') {
        result.push('-mobile-hidden');
      }

      if (this.isCardsMode) {
        result.push('-cards-mode');
      }

      return result;
    },
    itemStyles (): Record<string, string> {
      if (!this.isCardsMode || !this.item.card_background.color) {
        return {};
      }

      return {
        'background-color': this.item.card_background.color
      }
    },
    isCardsMode (): boolean {
      return this.item.is_cards_mode === true;
    }
  }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
.grid {
  $sizes: (
    'sm': 480px,
    'md': $tablet-min,
    'lg': $desktop-min,
    'xlg': $desktop-l-min,
  );

  display: grid;

  @for $i from 1 through 12 {
    &.-columns-#{$i} {
      grid-template-columns: repeat($i, 1fr);
    }
  }

  @each $size, $breakpoint in $sizes {
    @media (min-width: $breakpoint) {
      @for $i from 1 through 12 {
        &.-columns-#{$size}-#{$i} {
          grid-template-columns: repeat($i, 1fr);
        }
      }
    }
  }

  &.-narrow {
    $padding-value: calc((100vw - 960px) / 2);
    padding-left: $padding-value;
    padding-right: $padding-value;
  }

  &.-cards-mode {
    grid-gap: 10px;
    margin-top: 10px;

    > ._item {
      padding: 15px;
    }
  }

  @include for-desktop {
    &.-mobile-only {
      display: none !important;
    }
  }

  @include for-mobile {
    &.-mobile-hidden {
      display: none !important;
    }
  }

}
</style>
