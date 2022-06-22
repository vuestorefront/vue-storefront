<template>
  <blockquote class="rich-text-blockquote">
    <component
      v-for="contentItem in content"
      :key="contentItem.id"
      :item="contentItem"
      :is="contentItem.component"
    />
  </blockquote>
</template>

<script lang="ts">
import Vue from 'vue'

import getRichTextItemData from '../../../../helpers/get-rich-text-item-data.function';
import RichTextItem from '../../../../types/rich-text-item.interface';

export default Vue.extend({
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    content (): RichTextItem[] {
      if (!this.item.content) {
        return [];
      }

      return this.item.content.map((item) => getRichTextItemData(item)).filter((item) => {
        console.log(item);
        return !!item
      });
    }
  }
})
</script>
