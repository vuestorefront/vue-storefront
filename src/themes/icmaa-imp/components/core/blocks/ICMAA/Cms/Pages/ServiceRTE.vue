<template>
  <layout id="cms-page" :headline="content.headline">
    <vue-markdown :source="content" />
  </layout>
</template>

<script>
import Page from 'icmaa-cms/components/Page'
import Layout from 'theme/components/core/blocks/ICMAA/Cms/Pages/Service/Layout'
import VueMarkdown from 'vue-markdown'

export default {
  name: 'ServiceRTE',
  mixins: [ Page ],
  components: {
    Layout,
    VueMarkdown
  },
  data () {
    return {
      dataType: 'markdown'
    }
  },
  asyncData ({ store }) {
    return store.dispatch('icmaaCmsBlock/single', { value: 'service-navigation' })
  }
}
</script>
