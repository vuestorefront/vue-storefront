<template>
  <div
    class="storyblok-block-reference layout-transparent-container"
    data-testid="storyblok-block-reference"
    :class="cssClasses"
    :style="styles"
  >
    <div class="_content-wrapper" v-if="itemData.reference && itemData.reference.content">
      <sb-render
        v-for="(child) in childItems"
        class="_item"
        :item="child"
        :key="child._uid"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Blok } from '..';
import { ItemData } from '../..';

import BlockReferenceData from '../../types/block-reference-data.interface';

export default Blok.extend({
  name: 'BlockReference',
  computed: {
    itemData (): BlockReferenceData {
      return this.item as BlockReferenceData;
    },
    childItems (): ItemData[] {
      return this.itemData.reference.content.body || [];
    }
  },
  methods: {
  }
});
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
@import "./mixins";

.storyblok-block-reference {
  &.-editor-preview-mode {
    ._content-wrapper {
      pointer-events: none;
    }
  }

  @include storyblok-transparent-container-layout();
}
</style>
