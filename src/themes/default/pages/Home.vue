<template>
  <div id="hp">
      Hello World22! {{ exampleData }}
  </div>
</template>

<script>
import { page } from '../../../lib/themes'

export default {
  data () {
    return {
    }
  },
  mixins: [ page('Home') ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
