<template>
  <div id='product'>
    Core Product
  </div>
</template>

<script>
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import Meta from 'src/lib/meta'
import AddToCart from '../components/core/AddToCart.vue'
import { breadCrumbRoutes, thumbnail } from 'src/lib/filters'
import EventBus from 'src/event-bus'

import { mapGetters } from 'vuex'

/**
 * User selected specific color x size (or other attributes) variant
 */
function filterChanged (filterOption) { // slection of product variant on product page
  this.configuration[filterOption.attribute_code] = filterOption
  this.$store.dispatch('product/configure', {
    product: this.product,
    configuration: this.configuration
  }).then((selectedVariant) => {
    if (!selectedVariant) {
      this.$bus.$emit('notification', {
        type: 'warning',
        message: 'No such configuration for the product. Please do choose another combination of attributes.',
        action1: { label: 'OK', action: 'close' }
      })
      return
    }

    // join selected variant object to the store
    this.$store.dispatch('product/setCurrent', selectedVariant)
      .catch(err => console.error({
        info: 'Dispatch product/setCurrent in Product.vue',
        err
      }))

    // // todo: activate below when vue-router create 'silent' url replace method
    // // handle product url
    // this.$router.replace({
    //   name: 'product',
    //   params: {
    //     sku: selectedVariant.sku
    //   }
    // })
  })
  .catch(err => console.error({
    info: 'Dispatch product/configure in Product.vue',
    err
  }))
}

/**
 * Load the product data
 */
function fetchData (store, route) {
  // pass both id and sku to render a product
  const productSingleOptions = {
    id: route.params.id,
    sku: route && route.params && route.params.sku ? route.params.sku : null
  }
  return store.dispatch('product/single', { options: productSingleOptions }).then((product) => {
    let subloaders = store.state.product.subloaders || []
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

      subloaders.push(store.dispatch('product/setupVariants', { product: product }))
    } else { // error or redirect

    }
    return subloaders
  })
}

export default {
  name: 'Home',
  methods: {
    validateRoute () {
      let inst = this
      this.loading = true
      this.$store.dispatch('product/reset').then(() => {
        fetchData(inst.$store, inst.$route).then((subpromises) => {
          Promise.all(subpromises).then(subresults => {
            EventBus.$emit('product-after-load', { product: inst.product, page: inst })
            inst.loading = false
          }).catch(errs => {
            console.error(errs)
          })
        })
      })
    }
  },

  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      store.dispatch('product/reset').then(() => {
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
    })
  },
  watch: {
    '$route': 'validateRoute'
  },
  beforeDestroy () {
    this.$bus.$off('filter-changed-product')
  },
  beforeMount () {
    this.$bus.$on('filter-changed-product', filterChanged.bind(this))
  },
  computed: {
    ...mapGetters({
      product: 'product/productCurrent',
      attributesByCode: 'attribute/attributeListByCode',
      attributesByUd: 'attribute/attributeListById',
      breadcrumbs: 'product/breadcrumbs',
      configuration: 'product/currentConfiguration',
      options: 'product/currentOptions',
      category: 'category/current'
    }),
    imgObj () {
      return {
        src: thumbnail(this.product.image, 570, 569),
        error: thumbnail(this.product.image, 310, 300),
        loading: thumbnail(this.product.image, 310, 300)
      }
    },
    all_custom_attributes () {
      let inst = this
      return Object.values(this.attributesByCode).filter(a => {
        return a.is_visible && a.is_user_defined && parseInt(a.is_visible_on_front) && inst.product[a.attribute_code]
      })
    }
  },
  data () {
    return {
      loading: false
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
