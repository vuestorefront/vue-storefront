<template>
  <div id="cms-page" v-if="page">
    <ul>
      <li v-for="item in test" :key="item">
        <component :is="stringToComponent(item)" />
      </li>
    </ul>
  </div>
</template>

<script>
import Page from 'src/modules/icmaa-cms/components/Page'

export default {
  mixins: [ Page ],
  data () {
    return {
      dataType: 'yaml'
    }
  },
  computed: {
    test () {
      return this.content.test
    }
  }
}
</script>
