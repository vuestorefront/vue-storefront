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
      const html = this.$storyblokClient.richTextResolver.render(this.text)
      return (html === '<p></p>' || html === '<div></div>') ? ''
        : html
    }
  }
}
</script>

<style lang="scss" scoped>
.storyblok-rich-text {
  overflow: auto;
}
</style>
