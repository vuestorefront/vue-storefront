<template>
  <div id='product'>
    Core Product
  </div>
</template>

<script>
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import AddToCart from '../components/core/AddToCart.vue'
import { breadCrumbRoutes } from 'src/lib/filters'
import { optionLabel } from 'src/store/modules/attribute'
import EventBus from 'src/event-bus/event-bus'

export default {
  name: 'Home',
  methods: {
    fetchData (to) {
      let self = this
      self.$store.dispatch('product/single', { fieldName: 'id', value: self.$route.params.id }).then((res) => {
        if (res) {
          self.product = res
          self.configured_product = res // this one is added to the cart!

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
            self.$store.dispatch('attribute/list', {
              filterValues: configurableAttrIds,
              filterField: 'attribute_id'
            }).then((attributes) => {
              for (let option of self.product.configurable_options) {
                for (let ov of option.values) {
                  let lb = optionLabel(self.$store.state.attribute, { attributeKey: option.attribute_id, searchBy: 'id', optionId: ov.value_index })
                  console.log(lb)
                  self.options[option.label.toLowerCase()].push({
                    label: lb,
                    id: ov.value_index
                  })
                }
              }

              let selectedVariant = self.$store.state.product.product_selected_variant
              for (let option of self.product.configurable_options) {
                let attr = self.$store.state.attribute.list_by_id[option.attribute_id]
                let selectedOption = selectedVariant.custom_attributes.find((a) => {
                  return (a.attribute_code === attr.attribute_code)
                })
                self.configuration[attr.attribute_code] = {
                  code: attr.attribute_code,
                  id: selectedOption.value,
                  label: optionLabel(self.$store.state.attribute, { attributeKey: selectedOption.attribute_code, searchBy: 'code', optionId: selectedOption.value })
                }
                console.log(self.configuration)
              }
              console.log(selectedVariant)
            })
          }
        } else { // error or redirect

        }
      })
    }
  },

  created () {
    let self = this
    self.fetchData()

    EventBus.$on('filter-changed', (filterOption) => {
      self.configuration[filterOption.attribute_code] = filterOption
      self.$store.dispatch('product/configure', { product: self.product, configuration: self.configuration }).then((selectedVariant) => {
        self.$store.dispatch('product/single', { fieldName: 'sku', value: selectedVariant.sku, setCurrentProduct: false, selectDefaultVariant: false }).then((confProduct) => { // TODO: rewrite me, this ruins the cache for offline! add rather option settings for cart item 
          self.configured_product = confProduct
          console.log(confProduct)
        })
      })
    })
  },
  data () {
    return {
      product: {},
      configured_product: {},
      breadcrumbs: {
        routes: [],
        name: ''
      },
      // TO-DO: Variants should be in product object
      options: {
        color: [
        ],
        size: [
        ]
      },
      configuration: {
        color: {},
        size: {}
      }
    }
  },
  components: {
    Breadcrumbs,
    AddToCart
  }
}
</script>

<style scoped>

</style>
