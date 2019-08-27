<template>
  <div id="cms-page" v-if="page">
    <component :is="content" />
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
  }
}
</script>
