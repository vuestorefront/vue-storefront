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
import { InjectType } from 'src/modules/shared';
import { VueConstructor } from 'vue';
import { Blok } from '..'
import ComponentWidthCalculator, { ColumnsSpecification } from '../../component-width-calculator.service';

interface InjectedServices {
  componentWidthCalculator: ComponentWidthCalculator
}

export default (Blok as VueConstructor<InstanceType<typeof Blok> & InjectedServices>).extend({
  name: 'GridBlok',
  inject: {
    componentWidthCalculator: { default: undefined }
  } as unknown as InjectType<InjectedServices>,
  provide () {
    let widthCalculator = this.componentWidthCalculator.reduceSizes(
      this.getColumnsSettings()
    );

    return {
      'componentWidthCalculator': widthCalculator
    }
  },
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
  },
  methods: {
    getColumnsSettings (): ColumnsSpecification {
      const fields = [
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge'
      ];

      const result: ColumnsSpecification = {};

      let columnsCount = 1;
      for (const field of fields) {
        if (this.item.columns_count[field]) {
          columnsCount = this.item.columns_count[field];
        }

        (result as any)[field] = columnsCount;
      }

      return result;
    }
  }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
@import "./mixins";

.grid {
  $sizes: (
    'sm': 480px,
    'md': $tablet-min,
    'lg': $desktop-min,
    'xlg': $desktop-l-min,
  );

  $default-grid-gap: 10px;

  display: grid;
  grid-gap: $default-grid-gap;

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

  &.-cards-mode {
    > ._item {
      padding: 15px;
    }
  }

  @include display-property-handling;
}
</style>
