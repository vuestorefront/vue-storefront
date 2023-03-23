<template>
  <div
    class="column layout-regular-component"
    :class="cssClasses"
    :style="styles"
    v-show="showColumn"
  >
    <editor-block-icons :item="itemData" />

    <sb-render
      v-for="(_item) in itemData.items"
      :key="_item._uid"
      class="box _item"
      :item="_item"
      @content-change="onChildContentChange"
    />
  </div>
</template>

<script lang="ts">
import { VueConstructor } from 'vue';

import { InjectType } from 'src/modules/shared';

import { SizeValue } from '../../types/size.value';
import ComponentWidthCalculator, { ColumnsSpecification } from '../../component-width-calculator.service';
import ColumnData from '../../types/column-data.interface';
import EmptyChildrenState from '../../mixins/empty-children-state';

interface InjectedServices {
  componentWidthCalculator: ComponentWidthCalculator
}

export default (EmptyChildrenState as VueConstructor<InstanceType<typeof EmptyChildrenState> & InjectedServices>).extend({
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
    },
    showColumn (): boolean {
      return !this.isAllChildrenEmpty;
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
  @include storyblok-sub-elements-layout;
  @include display-property-handling;

}
</style>
