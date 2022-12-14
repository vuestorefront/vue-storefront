<template>
  <div class="storyblok-rich-text layout-transparent-container">
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
@import "~@storefront-ui/shared/styles/helpers/breakpoints";
@import "../../defaults/mixins";

.storyblok-rich-text {

  ul, ol, dl {
    display: inline-block;
    text-align: left;

    ::v-deep li {
      p {
        margin-bottom: 0;
      }

      &:first-child {
        p {
          margin-top: 0;
        }
      }
    }
  }

  p {
    margin-bottom: 0;

    &:first-child {
      margin-top: 0;
    }
  }

  @include storyblok-transparent-container-layout;
}
</style>
