<template>
  <div id="cms-page" class="t-container t-p-4" v-if="page">
    <vue-markdown v-if="dataType === 'markdown'" :source="content" />
    <component :is="content" v-else-if="isComponent" />
  </div>
</template>

<script>
import Page from 'icmaa-cms/mixins/Page'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'Page',
  mixins: [ Page ],
  components: {
    VueMarkdown
  },
  props: {
    dataType: {
      type: String,
      default: 'html'
    }
  }
}
</script>
