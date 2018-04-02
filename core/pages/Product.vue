<template>
  <div id="product">
    Core Product
  </div>
</template>

<script>
import Breadcrumbs from 'core/components/Breadcrumbs.vue'
import AddToCart from 'core/components/AddToCart.vue'
import ProductGallery from 'core/components/ProductGallery.vue'
import EventBus from 'core/plugins/event-bus'
import Composite from 'core/mixins/composite'
import { mapGetters } from 'vuex'
import config from 'config'
import i18n from 'core/lib/i18n'

/**
 * User selected specific color x size (or other attributes) variant
 */
function filterChanged (filterOption) { // slection of product variant on product page
  EventBus.$emit('product-before-configure', { filterOption: filterOption, configuration: this.configuration })

  this.configuration[filterOption.attribute_code] = filterOption
  this.$store.dispatch('product/configure', {
    product: this.product,
    configuration: this.configuration
  }).then((selectedVariant) => {
    if (!selectedVariant) {
      this.$bus.$emit('notification', {
        type: 'warning',
        message: i18n.t('No such configuration for the product. Please do choose another combination of attributes.'),
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
    sku: route.params.parentSku,
    childSku: route && route.params && route.params.childSku ? route.params.childSku : null
  }
  return store.dispatch('product/single', { options: productSingleOptions }).then((product) => {
    let subloaders = []
    if (product) {
      subloaders.push(store.dispatch('product/setupBreadcrumbs', { product: product }))

      subloaders.push(store.dispatch('attribute/list', { // load attributes to be shown on the product details
        filterValues: [true],
        filterField: 'is_user_defined'
      }))

      subloaders.push(store.dispatch('product/setupVariants', { product: product }))
      subloaders.push(store.dispatch('product/setupAssociated', { product: product }))

      if (config.products.preventConfigurableChildrenDirectAccess) {
        subloaders.push(store.dispatch('product/checkConfigurableParent', { product: product }))
      }
    } else { // error or redirect

    }
    return subloaders
  }).catch((err) => {
    throw new Error(err)
  })
}

/**
 * Load data required for this view
 */
function loadData ({ store, route }) {
  return new Promise((resolve, reject) => {
    EventBus.$emit('product-before-load', { store: store, route: route })

    store.dispatch('product/reset').then(() => {
      fetchData(store, route).then((subpromises) => {
        Promise.all(subpromises).then(subresults => {
          EventBus.$emitFilter('product-after-load', { store: store, route: route }).then((results) => {
            return resolve()
          }).catch((err) => {
            console.error(err)
            return resolve()
          })
        }).catch(errs => {
          console.error(errs)
          return resolve()
        })
      }).catch(err => {
        console.error(err)
        return reject(Error(err))
      })
    })
  })
}

function stateCheck () {
  if (this.parentProduct && this.parentProduct.id !== this.product.id) {
    console.log('Redirecting to parent, configurable product', this.parentProduct.sku)
    this.$router.push({ name: 'product', params: { parentSku: this.parentProduct.sku, childSku: this.product.sku, slug: this.parentProduct.slug } })
  }

  if (this.wishlistCheck.isOnWishlist(this.product)) {
    this.favorite.icon = 'favorite'
    this.favorite.isFavorite = true
  } else {
    this.favorite.icon = 'favorite_border'
    this.favorite.isFavorite = false
  }
  if (this.compareCheck.isOnCompare(this.product)) {
    this.compare.isCompare = true
  } else {
    this.compare.isCompare = false
  }
}

export default {
  name: 'Product',
  metaInfo () {
    return {
      title: this.$route.meta.title || this.productName,
      meta: this.$route.meta.description ? [{vmid: 'description', description: this.$route.meta.description}] : []
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return loadData({ store: store, route: route })
  },
  mixins: [Composite],
  methods: {
    validateRoute () {
      let inst = this
      inst.loading = true
      loadData({ store: this.$store, route: this.$route }).then((res) => {
        inst.loading = false
        inst.defaultOfflineImage = inst.product.image
        stateCheck.bind(this)()
        this.$bus.$on('filter-changed-product', filterChanged.bind(this))
      })
    },
    addToFavorite () {
      let self = this
      if (!self.favorite.isFavorite) {
        this.$store.dispatch('wishlist/addItem', self.product).then(res => {
          self.favorite.icon = 'favorite'
          self.favorite.isFavorite = true
        })
      } else {
        this.$store.dispatch('wishlist/removeItem', self.product).then(res => {
          self.favorite.icon = 'favorite_border'
          self.favorite.isFavorite = false
        })
      }
    },
    addToCompare () {
      let self = this
      if (!self.compare.isCompare) {
        this.$store.dispatch('compare/addItem', self.product).then(res => {
          self.compare.isCompare = true
        })
      } else {
        this.$store.dispatch('compare/removeItem', self.product).then(res => {
          self.compare.isCompare = false
        })
      }
    }
  },
  watch: {
    '$route': 'validateRoute'
  },
  beforeDestroy () {
    this.$bus.$off('filter-changed-product')
    this.$bus.$off('product-after-priceupdate')
  },
  beforeMount () {
    stateCheck.bind(this)()
    this.$bus.$on('product-after-priceupdate', (product) => {
      if (product.sku === this.product.sku) {
      // join selected variant object to the store
        this.$store.dispatch('product/setCurrent', product)
          .catch(err => console.error({
            info: 'Dispatch product/setCurrent in Product.vue',
            err
          }))
      }
    })
    this.$bus.$on('filter-changed-product', filterChanged.bind(this))
  },
  computed: {
    ...mapGetters({
      product: 'product/productCurrent',
      originalProduct: 'product/productOriginal',
      parentProduct: 'product/productParent',
      attributesByCode: 'attribute/attributeListByCode',
      attributesById: 'attribute/attributeListById',
      breadcrumbs: 'product/breadcrumbs',
      configuration: 'product/currentConfiguration',
      options: 'product/currentOptions',
      category: 'category/current',
      wishlistCheck: 'wishlist/check',
      compareCheck: 'compare/check'
    }),
    productName () {
      return this.product ? this.product.name : ''
    },
    productId () {
      return this.product ? this.product.id : ''
    },
    // TODO: This work should be done by vue-storefront-api and should expose the whole gallery
    gallery () {
      let images = []
      if (this.product.media_gallery) {
        for (let mediaItem of this.product.media_gallery) {
          if (mediaItem.image) {
            images.push({
              'path': this.getThumbnail(mediaItem.image, 600, 744),
              'type': 'main'
            })
          } // TODO: add support for the whole gallery
        }
      } else {
        if (this.product.configurable_children) {
          for (let confChild of this.product.configurable_children) {
            if (confChild.image) {
              images.push({
                'path': this.getThumbnail(confChild.image, 600, 744),
                'type': 'main'
              })
            } // TODO: add support for the whole gallery
          }
        }
      }
      return images
    },
    customAttributes () {
      let inst = this
      return Object.values(this.attributesByCode).filter(a => {
        return a.is_visible && a.is_user_defined && parseInt(a.is_visible_on_front) && inst.product[a.attribute_code]
      })
    }
  },
  data () {
    return {
      loading: false,
      favorite: {
        isFavorite: false,
        icon: 'favorite_border'
      },
      compare: {
        isCompare: false
      }
    }
  },
  components: {
    Breadcrumbs,
    AddToCart,
    ProductGallery
  }
}
</script>
