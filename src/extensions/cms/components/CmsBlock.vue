<template>
  <div class="cms-block" v-if="block" v-html="block.content" />
</template>

<script>
export default {
  name: 'CmsBlock',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$store.dispatch('cms/loadBlock', this.id)
  },
  computed: {
    block () {
      return this.$store.getters['cms/getBlock'](this.id)
    }
  }
}
</script>
