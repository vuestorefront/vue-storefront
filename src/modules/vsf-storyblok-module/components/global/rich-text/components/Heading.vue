<template>
  <component :is="component" class="storyblok-heading">
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
      return this.item.content.map((item) => getRichTextItemData(item)).filter((item) => !!item);
    },
    component () {
      let level = this.item.attrs?.level || 1;

      return `h${level}`;
    }
  }
})
</script>
