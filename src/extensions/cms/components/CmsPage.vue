<template>
  <div class="cms-page" v-if="page" v-html="page.content" />
</template>

<script>
export default {
  name: 'CmsPage',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.$store.dispatch(
      'cms/loadCms',
      {
        id: this.id,
        type: 'Page'
      }
    )
  },
  computed: {
    page () {
      return this.$store.getters['cms/getPage'](this.id)
    }
  }
}
</script>
