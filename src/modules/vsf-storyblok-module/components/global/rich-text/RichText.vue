<template>
  <div class="test">
    <div class="storyblok-rich-text">
      <component
        v-for="item in content"
        :is="item.component"
        :item="item"
        :key="item.id"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import getRichTextItemData from '../../../helpers/get-rich-text-item-data.function';

export default {
  name: 'RichText',
  props: {
    text: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      productBySkuDictionary: 'product/getProductBySkuDictionary'
    }),
    content () {
      if (!this.text.content) {
        return [];
      }

      return this.text.content.map((item) => getRichTextItemData(item)).filter((item) => !!item);
    }
  }
}
</script>

<style lang="scss" scoped>
.storyblok-rich-text {
  overflow: auto;
}
</style>
