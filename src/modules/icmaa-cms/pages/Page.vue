<template>
  <div id="cms-page" v-if="page">
    <component :is="stringToComponent(content)" />
  </div>
</template>

<script>
import Page from 'src/modules/icmaa-cms/components/Page'

export default {
  mixins: [ Page ],
  data () {
    return {
      dataType: 'html'
    }
  }
}
</script>
