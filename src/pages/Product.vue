<template>
  <div id='product'>
    Core Product
  </div>
</template>

<script>
import Breadcrumbs from '../components/core/Breadcrumbs.vue'

export default {
  name: 'Home',
  data () {
    return {
      product: {}
    }
  },
  methods: {
    fetchData (to) {
      let self = this
      self.$store.dispatch('product/single', { fieldName: 'id', value: self.$route.params.id }).then((res) => {
        if (res.items) {
          self.product = res.items[0]
        }
      })
    }
  },
  created () {
    this.fetchData()
  },
  components: {
    Breadcrumbs
  }
}
</script>

<style scoped>

</style>
