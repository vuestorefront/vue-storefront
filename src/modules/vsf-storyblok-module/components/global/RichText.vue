<template>
  <div class="storyblok-rich-text" v-html="html" />
</template>

<script>

export default {
  name: 'RichText',
  props: {
    text: {
      type: Object,
      required: true
    }
  },
  computed: {
    html () {
      return this.$storyblokClient.richTextResolver.render(this.text)
    }
  }
}
</script>

<style lang="scss" scoped>
.storyblok-rich-text {
  overflow: auto;
}
</style>
