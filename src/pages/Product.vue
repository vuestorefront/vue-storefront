<template>
  <div id='product'>
    Core Product
  </div>
</template>

<script>
import builder from 'bodybuilder'

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
      let productQuery = builder().query('match', 'id', this.$route.params.id).build()

      this.$store.dispatch('catalog/quickSearchByQuery', productQuery).then((res) => {
        if (res.items) {
          self.product = res.items[0]
        }
      })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>

</style>
