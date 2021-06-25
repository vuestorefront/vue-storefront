<template>
  <div
    class="grid"
    :class="cssClasses"
    :style="styles"
  >
    <div
      v-for="_item in itemData.items"
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
import GridData from '../../types/grid-data.interface';
import { SizeValue } from '../../types/size.value';

interface InjectedServices {
  componentWidthCalculator: ComponentWidthCalculator
}

export default (Blok as VueConstructor<InstanceType<typeof Blok> & InjectedServices>).extend({
  name: 'GridBlok',
  inject: {
    componentWidthCalculator: {}
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
    itemData (): GridData {
      return this.item as GridData;
    },
    extraCssClasses (): string[] {
      const result: string [] = [];
      const classPrefix = '-columns-';
      const sizes: Record<SizeValue, string> = {
        [SizeValue.xsmall]: '',
        [SizeValue.small]: 'sm-',
        [SizeValue.medium]: 'md-',
        [SizeValue.large]: 'lg-',
        [SizeValue.xlarge]: 'xlg-'
      }

      for (const field in sizes) {
        const sizeKey = field as SizeValue;
        const prefix = sizes[sizeKey];
        const value = this.itemData.columns_count[sizeKey];

        if (!value) {
          continue;
        }

        result.push(classPrefix + prefix + value);
      }

      if (this.isCardsMode) {
        result.push('-cards-mode');
      }

      if (this.itemData.is_collapsed) {
        result.push('-collapsed');
      }

      return result;
    },
    itemStyles (): Record<string, string> {
      if (!this.isCardsMode || !this.itemData.card_background.color) {
        return {};
      }

      return {
        'background-color': this.itemData.card_background.color
      }
    },
    isCardsMode (): boolean {
      return this.itemData.is_cards_mode === true;
    }
  },
  methods: {
    getColumnsSettings (): ColumnsSpecification {
      const fields = [
        SizeValue.xsmall,
        SizeValue.small,
        SizeValue.medium,
        SizeValue.large,
        SizeValue.xlarge
      ];

      const result: ColumnsSpecification = {};

      let columnsCount = 1;
      for (const field of fields) {
        const value = this.itemData.columns_count[field];
        if (value && !isNaN(Number(value))) {
          columnsCount = Number(value);
        }

        result[field] = columnsCount;
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
        grid-template-columns: repeat($i, minmax(0, 1fr));
      }
    }

    @each $size, $breakpoint in $sizes {
      @media (min-width: $breakpoint) {
        @for $i from 1 through 12 {
          &.-columns-#{$size}-#{$i} {
            grid-template-columns: repeat($i, minmax(0, 1fr));
          }
        }
      }
    }

  &.-cards-mode {
    > ._item {
      padding: 15px;
    }
  }

  &.-collapsed {
    grid-gap: 0;
  }

  @include display-property-handling;
}
</style>
