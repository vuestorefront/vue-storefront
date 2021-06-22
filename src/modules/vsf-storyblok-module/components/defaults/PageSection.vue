<template>
  <div
    class="page-section"
    :class="cssClasses"
    :style="styles"
  >
    <div class="_items_wrapper">
      <div
        v-for="_item in item.items"
        :key="_item.uuid"
        class="_item"
      >
        <sb-render class="box" :item="_item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { VueConstructor } from 'vue';

import { InjectType } from 'src/modules/shared';
import { Blok } from '..'
import ComponentWidthCalculator from '../../component-width-calculator.service';

interface InjectedServices {
  componentWidthCalculator: ComponentWidthCalculator
}

export default (Blok as VueConstructor<InstanceType<typeof Blok> & InjectedServices>).extend({
  name: 'StoryblokPageSection',
  inject: {
    componentWidthCalculator: { default: undefined }
  } as unknown as InjectType<InjectedServices>,
  provide () {
    let widthCalculator = this.componentWidthCalculator;
    if (this.item.width === 'narrow') {
      widthCalculator = widthCalculator.limitSize(960);
    }
    return {
      'componentWidthCalculator': widthCalculator
    }
  },
  computed: {
    extraCssClasses (): string[] {
      const result: string [] = [];

      if (this.item.width === 'narrow') {
        result.push('-narrow');
      }

      return result;
    }
  }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
@import "./mixins";

.page-section {
  $default-grid-gap: 10px;
  padding: $default-grid-gap * 3 $default-grid-gap;

  > ._items_wrapper {
    max-width: 960px;

    margin-left: auto;
    margin-right: auto;
  }

  @include display-property-handling;
}
</style>
