<template>
  <div
    class="storyblok-affirm-educational-message"
    :class="cssClasses"
    :style="styles"
  >
    <p>
      {{ itemData.short_text }}
    </p>
    <a class="affirm-site-modal" data-page-type="landing">Learn more</a>
  </div>
</template>

<script lang="ts">
import { Blok } from 'src/modules/vsf-storyblok-module/components'
import AffirmEducationalMessageData from './interfaces/affirm-educational-message-data.interface';

export default Blok.extend({
  name: 'StoryblokAffirmEducationalMessage',
  computed: {
    itemData (): AffirmEducationalMessageData {
      return this.item as AffirmEducationalMessageData;
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
