<template>
  <div id="hp">
      Hello World22! {{ exampleData }}
  </div>
</template>

<script>
import { corePage } from 'lib/themes'

export default {
  data () {
    return {
    }
  },
  mixins: [ corePage('Home') ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
