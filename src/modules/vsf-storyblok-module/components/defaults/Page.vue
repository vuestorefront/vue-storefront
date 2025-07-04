<template>
  <div data-testid="storyblok-page">
    <sb-rich-text :text="itemData.description" v-if="hasDescription" />

    <sb-render
      v-for="(child) in itemData.body"
      :parent-scope-id="scopeId"
      :item="child"
      :key="child._uid"
    />
  </div>
</template>

<script lang="ts">
import { BreakpointValue } from 'src/modules/shared';

import { Blok } from '..';
import ComponentWidthCalculator from '../../component-width-calculator.service';
import PageData from '../../types/page-data.interface';

export default Blok.extend({
  name: 'PageBlok',
  provide () {
    return {
      'componentWidthCalculator': new ComponentWidthCalculator({
        xsmall: BreakpointValue.X_SMALL,
        small: BreakpointValue.SMALL,
        medium: BreakpointValue.MEDIUM,
        large: BreakpointValue.LARGE,
        xlarge: BreakpointValue.X_LARGE
      })
    }
  },
  computed: {
    hasDescription (): boolean {
      return !!this.itemData.description && JSON.stringify(this.itemData.description) !== '{"type":"doc","content":[{"type":"paragraph"}]}';
    },
    itemData (): PageData {
      return this.item as unknown as PageData;
    },
    scopeId (): string {
      return (this.$options as any)._scopeId;
    }
  }

})
</script>
<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
@import "./mixins";

.storyblok-page {
  @include storyblok-sub-elements-layout;
}
</style>
