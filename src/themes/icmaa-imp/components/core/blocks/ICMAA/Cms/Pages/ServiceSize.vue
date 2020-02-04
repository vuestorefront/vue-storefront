<template>
  <layout id="cms-page" :headline="content.headline">
    <size-layout :content="content.headgear" />
    <size-layout :content="content.tops" />
    <size-layout :content="content.pants" />
    <shoe-layout :content="content.shoes.boys" />
    <shoe-layout :content="content.shoes.girls" />
    <h2 class="t-mt-8 t-pb-4 t-border-b-2">
      {{ content.blanks.headline }}
    </h2>
    <template v-for="(obj, index) in blanksContent">
      <shoe-layout :content="obj" :key="index" />
    </template>
  </layout>
</template>

<script>
import Page from 'icmaa-cms/components/Page'
import Layout from 'theme/components/core/blocks/ICMAA/Cms/Pages/Service/Layout'
import SizeLayout from 'theme/components/core/blocks/ICMAA/Cms/Pages/Service/Size/SizeLayout'
import ShoeLayout from 'theme/components/core/blocks/ICMAA/Cms/Pages/Service/Size/ShoeLayout'

import omit from 'lodash-es/omit'

export default {
  name: 'ServiceSize',
  mixins: [Page],
  components: {
    Layout,
    SizeLayout,
    ShoeLayout
  },
  data () {
    return {
      dataType: 'yaml'
    }
  },
  computed: {
    blanksContent () {
      return omit(this.content.blanks, ['headline'])
    }
  },
  asyncData ({ store }) {
    return store.dispatch('icmaaCmsBlock/single', { value: 'service-navigation' })
  }
}
</script>

<style scoped>

</style>
