<template>
  <div id='product'>
    Core Product
  </div>
</template>

<script>
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import AddToCart from '../components/core/AddToCart.vue'
import { slugify, breadCrumbRoutes } from 'src/lib/filters'

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

          // TODO: Fix it when product is enterd from outside the category page
          let path = self.$store.state.category.current_path

          if (path) { // && self.$store.state.category.current) {
            path.push({
              name: self.$store.state.category.current.name,
              route_link: '/c/' + self.$store.state.category.current.slug
            })
            
          } else { // product is entered not from categoyr page

            if (self.product.category && self.product.category.length > 0){
              let cat = self.product.category.pop() // we have to use single method here to populate the whole category path!
              path = [{
                name: cat.name,
                route_link: '/c/' + slugify(cat.name) + '-' + cat.id
              }]
            }
          }

          self.breadcrumbs.routes = breadCrumbRoutes(path)
          self.breadcrumbs.name = self.product.name
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
