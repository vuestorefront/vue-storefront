<template>
  <div id='product'>
    Core Product
  </div>
</template>

<script>
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import AddToCart from '../components/core/AddToCart.vue'
import { breadCrumbRoutes } from 'src/lib/filters'

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
        if (res) {
          self.product = res

          let setbrcmb = (path) => {
            path.push({
              slug: self.$store.state.category.current.slug,
              name: self.$store.state.category.current.name
            }) // current category at the end
            self.breadcrumbs.routes = breadCrumbRoutes(path)
          }
          // TODO: Fix it when product is enterd from outside the category page
          let currentPath = self.$store.state.category.current_path
          let currentCat = self.$store.state.category.current

          if (currentPath && currentCat) {
            setbrcmb(currentPath)
          } else {
            if (self.product.category && self.product.category.length > 0) {
              let cat = self.product.category[self.product.category.length - 1]

              self.$store.dispatch('category/single', { key: 'id', value: cat.category_id }).then((category) => { // this sets up category path and current category
                setbrcmb(self.$store.state.category.current_path)
              })
            }
          }
          console.log(self.product)
          self.breadcrumbs.name = self.product.name

          if (self.product.type_id === 'configurable') {
            const configurableAttrIds = self.product.configurable_options.map((item) => { return item.attribute_id })

            for (let option of self.product.configurable_options) {
              for (let ov of option.values) {
                self.options[option.label.toLower()].push({
                  label: ov, // TODO: get the right label
                  id: ov
                })
              }
            }
          }
        } else { // error or redirect

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
