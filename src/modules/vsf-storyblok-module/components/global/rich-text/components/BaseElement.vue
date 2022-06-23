<template>
  <component
    :is="rootElement"
    class="rich-text-base-element"
    v-bind="elementAttributes"
  >
    <component
      v-for="contentItem in content"
      :key="contentItem.id"
      :item="contentItem"
      :is="contentItem.component"
    />
  </component>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import getRichTextItemData from '../../../../helpers/get-rich-text-item-data.function';
import RichTextItem from '../../../../types/rich-text-item.interface';

export default Vue.extend({
  props: {
    item: {
      type: Object as PropType<RichTextItem>,
      required: true
    }
  },
  computed: {
    content (): RichTextItem[] {
      if (!this.item.content) {
        return [];
      }

      return this.item.content.map((item) => getRichTextItemData(item));
    },
    rootElement (): string {
      return this.item.rootElement || 'div';
    },
    elementAttributes (): any {
      return this.item.elementAttributes || {};
    }
  }
})
</script>
