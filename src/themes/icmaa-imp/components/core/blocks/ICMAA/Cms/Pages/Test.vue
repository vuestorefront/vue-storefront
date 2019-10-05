<template>
  <div id="cms-page" class="t-container t-p-4" v-if="page">
    <h1 v-html="content.headline" />
    <p v-html="content.text" />
  </div>
</template>

<script>
import Page from 'icmaa-cms/components/Page'

export default {
  mixins: [ Page ],
  data () {
    return {
      dataType: 'yaml'
    }
  }
}
</script>
