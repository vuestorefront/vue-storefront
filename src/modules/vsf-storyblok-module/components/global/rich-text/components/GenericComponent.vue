<template>
  <component
    :is="rootTagName"
    class="rich-text-generic-component"
    v-bind="rootElementAttributes"
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
  name: 'RichTextGenericComponent',
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
    rootTagName (): string {
      return this.item.rootTagName || 'div';
    },
    rootElementAttributes (): any {
      return this.item.rootElementAttributes || {};
    }
  }
})
</script>
