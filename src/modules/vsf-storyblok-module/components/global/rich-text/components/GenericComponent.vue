<template>
  <component
    :is="rootTagName"
    :id="item.rootElementId"
    class="storyblok-rich-text-generic-component"
    :class="cssClasses"
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
  name: 'StoryblokRichTextGenericComponent',
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
    cssClasses  (): string[] {
      const blockTags = [
        'address',
        'article',
        'aside',
        'blockquote',
        'canvas',
        'dd',
        'div',
        'dl',
        'dt',
        'fieldset',
        'figcaption',
        'figure',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'header',
        'hr',
        'li',
        'main',
        'nav',
        'noscript',
        'ol',
        'p',
        'pre',
        'section',
        'table',
        'tfoot',
        'ul',
        'video'
      ];

      const headingsTags = [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6'
      ];

      const result = [];

      if (headingsTags.includes(this.rootTagName)) {
        result.push('layout-heading-component');
      } else if (blockTags.includes(this.rootTagName)) {
        result.push('layout-regular-component');
      }

      return result;
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
