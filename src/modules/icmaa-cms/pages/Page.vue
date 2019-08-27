<template>
  <div id="cms-page" v-if="page">
    <component :is="content" v-if="isComponent" />
  </div>
</template>

<script>
import Page from 'icmaa-cms/components/Page'

export default {
  mixins: [ Page ],
  data () {
    return {
      dataType: 'html'
    }
  },
  computed: {
    isComponent () {
      return this.content.hasOwnProperty('template')
    }
  }
}
</script>
