<template>
  <div data-testid="storyblok-page">
    <sb-rich-text :text="itemData.description" v-if="itemData.description" />
    <sb-render
      v-for="(child) in itemData.body"
      :item="child"
      :key="child.uuid"
    />
  </div>
</template>

<script lang="ts">
import { Blok } from '..';
import ComponentWidthCalculator from '../../component-width-calculator.service';
import PageData from '../../types/page-data.interface';

export default Blok.extend({
  name: 'PageBlok',
  provide () {
    return {
      'componentWidthCalculator': new ComponentWidthCalculator({
        xsmall: 479,
        small: 767,
        medium: 1023,
        large: 1199,
        xlarge: 2730
      })
    }
  },
  computed: {
    itemData (): PageData {
      return this.item as unknown as PageData;
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
