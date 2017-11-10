<template>
  <div id='product'>
    Core Product
  </div>
</template>

<script>
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import Meta from 'src/lib/meta'
import AddToCart from '../components/core/AddToCart.vue'
import { breadCrumbRoutes } from 'src/lib/filters'
import { optionLabel } from 'src/store/modules/attribute'
import EventBus from 'src/event-bus/event-bus'

function filterChanged (filterOption) { // slection of product variant on product page
  this.configuration[filterOption.attribute_code] = filterOption
  this.$store.dispatch('product/configure', { product: this.product, configuration: this.configuration }).then((selectedVariant) => {
    if (typeof selectedVariant === 'undefined' || selectedVariant === null) { // TODO: add fancy modal here regarding https://github.com/DivanteLtd/vue-storefront/issues/73
      EventBus.$emit('notification', {
        type: 'warning',
        message: 'No such configuration for the product. Please do choose another combination of attributes.',
        action1: { label: 'OK', action: 'close' }
      })
    } else { // TODO: this way of getting product probably brokes offline because products are cached by ID not SKU; we probably can just re-configure the product without getting it from cache
      console.log(selectedVariant)
      if (navigator.onLine) {
        this.$store.dispatch('product/single', { fieldName: 'sku', value: selectedVariant.sku, setCurrentProduct: false, selectDefaultVariant: false }).then((confProduct) => { // TODO: rewrite me, this ruins the cache for offline! add rather option settings for cart item
          this.$store.state.product.product_selected_variant = confProduct
        })
      } else { // no internet connection so we're just update'ing the selected product
        this.$store.state.product.product_selected_variant.sku = selectedVariant.sku
        this.$store.state.product.product_selected_variant.price = selectedVariant.price
        for (let opt of selectedVariant.custom_attributes) {
          this.$store.state.product.product_selected_variant[opt.attribute_code] = opt.value
        }
        this.$store.state.product.product_selected_variant.custom_attributes = selectedVariant.custom_attributes
      }
    }
  })
}

function fetchData (store, route) {
  store.dispatch('product/reset')
  return store.dispatch('product/single', { fieldName: 'id', value: route.params.id }).then((product) => {
    let subloaders = []
    if (product) {
      let setbrcmb = (path) => {
        if (path.findIndex(itm => {
          return itm.slug === store.state.category.current.slug
        }) < 0) {
          path.push({
            slug: store.state.category.current.slug,
            name: store.state.category.current.name
          }) // current category at the end
        }
        store.dispatch('meta/set', { title: product.name })
        store.state.product.breadcrumbs.routes = breadCrumbRoutes(path) // TODO: change to store.commit call?
      }
      // TODO: Fix it when product is enterd from outside the category page
      let currentPath = store.state.category.current_path
      let currentCat = store.state.category.current

      if (currentPath.length > 0 && currentCat) {
        setbrcmb(currentPath)
      } else {
        if (product.category && product.category.length > 0) {
          let cat = product.category[product.category.length - 1]

          subloaders.push(
            store.dispatch('category/list', {}).then((categories) => {
              store.dispatch('category/single', { key: 'id', value: cat.category_id }).then((category) => { // this sets up category path and current category
                setbrcmb(store.state.category.current_path)
              }).catch(err => {
                console.error(err)
              })
            })
          )
        }
      }
      store.state.product.breadcrumbs.name = product.name
      subloaders.push(store.dispatch('attribute/list', { // load attributes to be shown on the product details
        filterValues: [true],
        filterField: 'is_user_defined'
      }))

      if (product.type_id === 'configurable') {
        const configurableAttrIds = product.configurable_options.map((item) => { return item.attribute_id })
        subloaders.push(store.dispatch('attribute/list', {
          filterValues: configurableAttrIds,
          filterField: 'attribute_id'
        }).then((attributes) => {
          for (let option of product.configurable_options) {
            for (let ov of option.values) {
              let lb = optionLabel(store.state.attribute, { attributeKey: option.attribute_id, searchBy: 'id', optionId: ov.value_index })
              store.state.product.current_options[option.label.toLowerCase()].push({
                label: lb,
                id: ov.value_index
              })
            }
          }

          let selectedVariant = store.state.product.product_selected_variant
          for (let option of product.configurable_options) {
            let attr = store.state.attribute.list_by_id[option.attribute_id]
            let selectedOption = selectedVariant.custom_attributes.find((a) => {
              return (a.attribute_code === attr.attribute_code)
            })
            store.state.product.current_configuration[attr.attribute_code] = {
              attribute_code: attr.attribute_code,
              id: selectedOption.value,
              label: optionLabel(store.state.attribute, { attributeKey: selectedOption.attribute_code, searchBy: 'code', optionId: selectedOption.value })
            }
          }
        }).catch(err => {
          console.error(err)
        }))
      }
    } else { // error or redirect

    }
    return subloaders
  })
}

export default {
  name: 'Home',
  methods: {
  },

  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      fetchData(store, route).then((subpromises) => {
        Promise.all(subpromises).then(subresults => {
          return resolve()
        }).catch(errs => {
          console.error(errs)
          return resolve()
        })
      }).catch(err => {
        console.error(err)
        return resolve()
      })
    })
  },
  beforeDestroy () {
    EventBus.$off('filter-changed-product')
  },
  beforeMount () {
    EventBus.$on('filter-changed-product', filterChanged.bind(this))
  },
  computed: {
    all_custom_atributes () {
      let inst = this
      return Object.values(this.$store.state.attribute.list_by_code).filter(a => {
        return a.is_visible && a.is_user_defined && parseInt(a.is_visible_on_front) && inst.product[a.attribute_code]
      })
    },
    breadcrumbs () {
      return this.$store.state.product.breadcrumbs
    },
    product () {
      return this.$store.state.product.current
    },
    configured_product () {
      return this.$store.state.product.product_selected_variant
    },
    configuration () {
      return this.$store.state.product.current_configuration
    },
    options () {
      return this.$store.state.product.current_options
    }
  },
  data () {
    return {
      // TO-DO: Variants should be in product object
    }
  },
  meta () {
    return {
      title: this.product.name
    }
  },
  components: {
    Breadcrumbs,
    AddToCart
  },
  mixins: [Meta]
}
</script>

<style scoped>

</style>
