<template>
  <div
    class="column"
    :class="cssClasses"
    :style="styles"
  >
    <editor-block-icons :item="itemData" />

    <div
      v-for="_item in itemData.items"
      :key="_item.uuid"
      class="_item"
    >
      <sb-render class="box" :item="_item" />
    </div>
  </div>
</template>

<script lang="ts">
import { VueConstructor } from 'vue';

import { InjectType } from 'src/modules/shared';

import { Blok } from '..';
import { SizeValue } from '../../types/size.value';
import ComponentWidthCalculator, { ColumnsSpecification } from '../../component-width-calculator.service';
import ColumnData from '../../types/column-data.interface';

interface InjectedServices {
  componentWidthCalculator: ComponentWidthCalculator
}

export default (Blok as VueConstructor<InstanceType<typeof Blok> & InjectedServices>).extend({
  name: 'StoryblokColumn',
  inject: {
    componentWidthCalculator: {}
  } as unknown as InjectType<InjectedServices>,
  provide () {
    let widthCalculator = this.componentWidthCalculator.multiplySizes(
      this.getSpanSettings()
    );

    return {
      'componentWidthCalculator': widthCalculator
    }
  },
  computed: {
    itemData (): ColumnData {
      return this.item as ColumnData;
    }
  },
  methods: {
    getSpanSettings (): ColumnsSpecification {
      const result: ColumnsSpecification = {};

      if (!this.itemData.span) {
        return result;
      }

      const fields = [
        SizeValue.xsmall,
        SizeValue.small,
        SizeValue.medium,
        SizeValue.large,
        SizeValue.xlarge
      ];

      let columnsCount = 1;
      for (const field of fields) {
        const value = this.itemData.span[field];
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

.column {
  @include display-property-handling;

}
</style>
