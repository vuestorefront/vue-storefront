<template>
  <div id='product'>
    Core Product
  </div>
</template>

<script>
import builder from 'bodybuilder'
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
      let productQuery = builder().query('match', 'id', self.$route.params.id).build()

      self.$store.dispatch('product/quickSearchByQuery', productQuery).then((res) => {
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
