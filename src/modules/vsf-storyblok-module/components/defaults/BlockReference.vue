<template>
  <div
    class="storyblok-block-reference"
    data-testid="storyblok-block-reference"
    :class="cssClasses"
    :style="styles"
  >
    <div class="_content-wrapper" v-if="itemData.reference && itemData.reference.content">
      <sb-render
        v-for="(child, index) in childItems"
        :class="getItemCssClasses(child, index)"
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
    },
    parentCssClasses (): string[] {
      const result: string[] = [];

      const parentNode = this.$vnode.parent;

      if (!parentNode) {
        return result;
      };

      const classes: Record<string, boolean> = parentNode.data?.class || {};

      for (const className in classes) {
        if (classes[className]) {
          result.push(className);
        }
      }

      return result;
    }
  },
  methods: {
    getItemCssClasses (item: unknown, index: number): string[] {
      const result = [];

      if (index === 0 && this.parentCssClasses.includes('-first-item')) {
        result.push('-first-item');
      }

      if (index === this.childItems.length - 1 && this.parentCssClasses.includes('-last-item')) {
        result.push('-last-item');
      }

      return result;
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
