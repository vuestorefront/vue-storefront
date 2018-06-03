<template>
  <div class="container" v-if="page" v-html="page.content" />
</template>

<script>
import CmsBlock from 'src/extensions/cms/components/CmsBlock.vue'

export default {
  name: 'CmsPage',
  data () {
    return {
      id: this.$route.params.id,
      data: this.$route.params
    }
  },
  beforeMount () {
    this.$store.dispatch('cms/loadPage', this.id)
  },
  computed: {
    page () {
      return this.$store.getters['cms/getPage'](this.id)
    }
  },
  components: {
    CmsBlock
  }
}
</script>
