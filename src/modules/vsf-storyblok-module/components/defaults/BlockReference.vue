<template>
  <div
    class="storyblok-block-reference"
    data-testid="storyblok-block-reference"
    :class="cssClasses"
    :style="styles"
  >
    <div class="_content-wrapper" v-if="itemData.reference && itemData.reference.content">
      <sb-render
        v-for="(child, index) in itemData.reference.content.body"
        :class="parentCssClasses"
        :item="child"
        :key="child.uuid"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Blok } from '..';

import BlockReferenceData from '../../types/block-reference-data.interface';

export default Blok.extend({
  name: 'BlockReference',
  computed: {
    itemData (): BlockReferenceData {
      return this.item as BlockReferenceData;
    },
    parentCssClasses (): Record<string, string> {
      if (!this.$vnode.parent) {
        return {};
      };

      return this.$vnode.parent.data.class;
    }
  }
});
</script>

<style lang="scss" scoped>
.storyblok-block-reference {
  &.-editor-preview-mode {
    ._content-wrapper {
      pointer-events: none;
    }
  }
}
</style>
