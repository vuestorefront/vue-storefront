<template>
  <div>
    <div class="container pb60">
      <sb-render v-if="story && story.content" :item="story.content" />
    </div>
  </div>
</template>

<script>
import StoryblokMixin from '../components/StoryblokMixin'

export default {
  name: 'StoryblokBlock',
  mixins: [StoryblokMixin],
  components: {}
}
</script>
