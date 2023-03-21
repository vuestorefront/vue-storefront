<template>
  <div
    class="grid layout-regular-component"
    :class="cssClasses"
    :style="styles"
    v-show="showGrid"
  >
    <editor-block-icons :item="itemData" />

    <div
      v-for="_item in itemData.items"
      :key="_item._uid"
      class="_item"
      :class="getItemCssClasses(_item)"
      :style="itemStyles"
    >
      <sb-render class="_component box" :item="_item" @content-change="onChildContentChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { VueConstructor } from 'vue';

import { InjectType } from 'src/modules/shared';

import ComponentWidthCalculator, { ColumnsSpecification } from '../../component-width-calculator.service';
import GridData from '../../types/grid-data.interface';
import { SizeValue } from '../../types/size.value';
import isColumnData from '../../types/is-column-data.typeguard';
import isItemData from '../../types/is-item-data.typeguard';
import convertDisplayValueToClass from '../../helpers/convert-display-value-to-class';
import EmptyChildrenState from '../../mixins/empty-children-state';

interface InjectedServices {
  componentWidthCalculator: ComponentWidthCalculator
}

export default (EmptyChildrenState as VueConstructor<InstanceType<typeof EmptyChildrenState> & InjectedServices>).extend({
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

      if (this.verticalAlignment) {
        result.push('-vertically-aligned-to-' + this.verticalAlignment);
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
    },
    showGrid (): boolean {
      return !this.isAllChildrenEmpty;
    },
    verticalAlignment (): string | undefined {
      return this.itemData.vertical_alignment;
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
    },
    getItemCssClasses (item: unknown): string[] {
      const result: string [] = [];

      if (!isItemData(item)) {
        return result;
      }

      if (item.display) {
        const displayClass = convertDisplayValueToClass(item.display, this.isStoryblokPreview);
        if (displayClass) {
          result.push(displayClass);
        }
      }

      if (!isColumnData(item)) {
        return result;
      }

      const classPrefix = '-span-';
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
        const value = item.span ? item.span[sizeKey] : undefined;

        if (!value) {
          continue;
        }

        result.push(classPrefix + prefix + value);
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
    '': 0px,
    '-sm': 480px,
    '-md': $tablet-min,
    '-lg': $desktop-min,
    '-xlg': $desktop-l-min,
  );

  $default-grid-gap: 0.7rem;
  $default-grid-gap-tablet: 1.3rem;

  display: grid;
  grid-gap: $default-grid-gap;

  ._item {
    @include storyblok-reset-margins-for-transparent-containers();
    @include display-property-handling;
  }

  ._component {
    margin-bottom: 0;
    margin-top: 0;
  }

  @each $size, $breakpoint in $sizes {
    @media (min-width: $breakpoint) {
      @for $i from 1 through 12 {
        &.-columns#{$size}-#{$i} {
          grid-template-columns: repeat($i, minmax(0, 1fr));

          @if ($i > 1) {
            grid-gap: if($breakpoint < $tablet-min, $default-grid-gap, $default-grid-gap-tablet);
          } @else {
            grid-gap: 2em;
          }
        }

        ._item.-span#{$size}-#{$i} {
          grid-column: span $i;
        }
      }
    }
  }

  @media (min-width: $tablet-min) {
    @for $i from 2 through 12 {
      &.-columns-#{$i} {
        grid-gap: $default-grid-gap-tablet;
      }

      &.-columns-sm-#{$i} {
        grid-gap: $default-grid-gap-tablet;
      }
    }
  }

  &.-cards-mode {
    grid-gap: $default-grid-gap;

    > ._item {
      padding: 15px;
    }
  }

  &.-collapsed {
    grid-gap: 0;
  }

  &.-vertically-aligned-to-top {
    align-items: start;
  }

  &.-vertically-aligned-to-center {
    align-items: center;
  }

  &.-vertically-aligned-to-bottom {
    align-items: end;
  }

  @media (min-width: $tablet-min) {
    grid-gap: $default-grid-gap-tablet;

    &.-cards-mode {
      grid-gap: $default-grid-gap;
    }
  }

  @include display-property-handling;
}
</style>
