<template>
  <div id="cms-page" v-if="page" v-html="page.content" />
</template>

<script>
import Page from 'src/modules/icmaa-cms/components/Page'

export default {
  mixins: [ Page ]
}
</script>
