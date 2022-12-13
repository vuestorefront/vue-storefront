<template>
  <div
    class="storyblok-block layout-transparent-container"
    data-testid="storyblok-block"
  >
    <sb-render
      v-for="(child) in itemData.body"
      :item="child"
      :key="child.uuid"
    />
  </div>
</template>

<script lang="ts">
import { InjectType } from 'src/modules/shared';
import { VueConstructor } from 'vue';

import { Blok } from '..';
import BlockData from '../../types/block-data.interface';
import ComponentWidthCalculator from '../../component-width-calculator.service';

interface InjectedServices {
  componentWidthCalculator?: ComponentWidthCalculator
}

export default (Blok as VueConstructor<InstanceType<typeof Blok> & InjectedServices>).extend({
  name: 'Block',
  inject: {
    componentWidthCalculator: { default: undefined }
  } as unknown as InjectType<InjectedServices>,
  provide () {
    let widthCalculator = this.componentWidthCalculator;
    if (!widthCalculator) {
      widthCalculator = new ComponentWidthCalculator({
        xsmall: 479,
        small: 767,
        medium: 1023,
        large: 1199,
        xlarge: 2730
      });
    }

    return {
      'componentWidthCalculator': widthCalculator
    }
  },
  computed: {
    itemData (): BlockData {
      return this.item as unknown as BlockData;
    }
  }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
@import "./mixins";

.storyblok-block {
  @include storyblok-transparent-container-layout;
}
</style>
