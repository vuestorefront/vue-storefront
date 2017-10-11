<template>
  <div id='product'>
    Core Product
  </div>
</template>

<script>
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import AddToCart from '../components/core/AddToCart.vue'

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
    Breadcrumbs,
    AddToCart
  }
}
</script>

<style scoped>

</style>
