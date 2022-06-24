<template>
  <div class="storyblok-rich-text">
    <component
      v-for="item in content"
      :is="item.component"
      :item="item"
      :key="item.id"
    />
  </div>
</template>

<script>
import getRichTextItemData from '../../../helpers/get-rich-text-item-data.function';

export default {
  name: 'StoryblokRichText',
  props: {
    text: {
      type: Object,
      required: true
    }
  },
  computed: {
    content () {
      if (!this.text.content) {
        return [];
      }

      return this.text.content.map((item) => getRichTextItemData(item));
    }
  }
}
</script>

<style lang="scss" scoped>
.storyblok-rich-text {
  overflow: auto;
}
</style>
