<template>
  <div id="hp">
      Hello World!
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AddToCart from '../components/core/AddToCart.vue'

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
    AddToCart
  }
}
</script>

<style scoped>

</style>
