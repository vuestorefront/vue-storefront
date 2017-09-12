<template>
  <div id="hp">
      Hello World!
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  methods: {
    ...mapActions(['search'])
  },
  beforeMount () {
    this.$store.dispatch('loadCart')
    this.search()
  },
  data () {
    return {
      'exampleData': 'Data from base component'
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
