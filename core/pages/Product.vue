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
import i18n from 'core/lib/i18n'
import _ from 'lodash'
import config from 'config'

export default {
  name: 'Product',
  metaInfo () {
    return {
      title: this.$route.meta.title || this.productName,
      meta: this.$route.meta.description ? [{vmid: 'description', description: this.$route.meta.description}] : []
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    EventBus.$emit('product-before-load', { store: store, route: route })
    return store.dispatch('product/fetchAsync', { parentSku: route.params.parentSku, childSku: route && route.params && route.params.childSku ? route.params.childSku : null })
  },
  mixins: [Composite],
  methods: {
    validateRoute () {
      let inst = this
      if (!inst.loading) {
        inst.loading = true
        inst.$store.dispatch('product/fetchAsync', { parentSku: inst.$route.params.parentSku, childSku: inst.$route && inst.$route.params && inst.$route.params.childSku ? inst.$route.params.childSku : null }).then((res) => {
          inst.loading = false
          inst.defaultOfflineImage = inst.product.image
          this.onStateCheck()
          this.$bus.$on('filter-changed-product', this.onAfterFilterChanged)
        })
      } else {
        console.error('Error with loading = true in Product.vue; Reload page')
      }
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
    },
    onAfterCustomOptionsChanged (payload) {
      let priceDelta = 0
      let priceDeltaInclTax = 0
      for (const optionValue of Object.values(payload.optionValues)) {
        if (typeof optionValue === 'object' && parseInt(optionValue.option_type_id) > 0) {
          if (optionValue.price_type === 'fixed' && optionValue.price !== 0) {
            priceDelta += optionValue.price
            priceDeltaInclTax += optionValue.price
          }
          if (optionValue.price_type === 'percent' && optionValue.price !== 0) {
            priceDelta += ((optionValue.price / 100) * this.originalProduct.price)
            priceDeltaInclTax += ((optionValue.price / 100) * this.originalProduct.priceInclTax)
          }
        }
      }
      this.product.price = this.originalProduct.price + priceDelta
      this.product.priceInclTax = this.originalProduct.priceInclTax + priceDeltaInclTax
    },
    onAfterBundleOptionsChanged (payload) {
      let priceDelta = 0
      let priceDeltaInclTax = 0
      for (const optionValue of Object.values(payload.optionValues)) {
        if (typeof optionValue.value.product !== 'undefined' && parseInt(optionValue.qty) >= 0) {
          priceDelta += optionValue.value.product.price * parseInt(optionValue.qty)
          priceDeltaInclTax += optionValue.value.product.priceInclTax * parseInt(optionValue.qty)
        }
      }
      if (priceDelta > 0) {
        this.product.price = priceDelta
        this.product.priceInclTax = priceDeltaInclTax
      }
    },
    onStateCheck () {
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
    },
    onAfterPriceUpdate (product) {
      if (product.sku === this.product.sku) {
      // join selected variant object to the store
        this.$store.dispatch('product/setCurrent', product)
          .catch(err => console.error({
            info: 'Dispatch product/setCurrent in Product.vue',
            err
          }))
      }
    },
    onAfterFilterChanged (filterOption) {
      EventBus.$emit('product-before-configure', { filterOption: filterOption, configuration: this.configuration })
      const prevOption = this.configuration[filterOption.attribute_code]
      this.configuration[filterOption.attribute_code] = filterOption
      this.$store.dispatch('product/configure', {
        product: this.product,
        configuration: this.configuration,
        selectDefaultVariant: true,
        fallbackToDefaultWhenNoAvailable: false
      }).then((selectedVariant) => {
        if (!selectedVariant) {
          if (typeof prevOption !== 'undefined' && prevOption) {
            this.configuration[filterOption.attribute_code] = prevOption
          } else {
            delete this.configuration[filterOption.attribute_code]
          }
          this.$bus.$emit('notification', {
            type: 'warning',
            message: i18n.t('No such configuration for the product. Please do choose another combination of attributes.'),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
          return
        }
      }).catch(err => console.error({
        info: 'Dispatch product/configure in Product.vue',
        err
      }))
    },
    updateAddToWishlistState (product) {
      if (product.sku === this.product.sku) {
        this.favorite.isFavorite = false
      }
    }
  },
  watch: {
    '$route': 'validateRoute'
  },
  beforeDestroy () {
    this.$bus.$off('filter-changed-product', this.onAfterFilterChanged)
    this.$bus.$off('product-after-priceupdate', this.onAfterPriceUpdate)
    this.$bus.$off('product-after-customoptions', this.onAfterCustomOptionsChanged)
    this.$bus.$off('product-after-bundleoptions', this.onAfterBundleOptionsChanged)
    this.$bus.$off('product-after-remove-from-wishlist', this.updateAddToWishlistState)
  },
  beforeMount () {
    this.onStateCheck()
  },
  created () {
    this.$bus.$on('product-after-priceupdate', this.onAfterPriceUpdate)
    this.$bus.$on('filter-changed-product', this.onAfterFilterChanged)
    this.$bus.$on('product-after-customoptions', this.onAfterCustomOptionsChanged)
    this.$bus.$on('product-after-bundleoptions', this.onAfterBundleOptionsChanged)
    this.$bus.$on('product-after-remove-from-wishlist', this.updateAddToWishlistState)
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
    offlineImage () {
      return {
        src: this.getThumbnail(this.product.image, 310, 300),
        error: this.getThumbnail(this.product.image, 310, 300),
        loading: this.getThumbnail(this.product.image, 310, 300)
      }
    },
    gallery () {
      let images = []
      if (this.product.media_gallery) {
        for (let mediaItem of this.product.media_gallery) {
          if (mediaItem.image) {
            images.push({
              'src': this.getThumbnail(mediaItem.image, 600, 744),
              'loading': this.getThumbnail(this.product.image, 310, 300)
            })
          }
        }
      }
      let groupBy = config.products.galleryVariantsGroupAttribute
      if (this.product.configurable_children && this.product.configurable_children.length > 0 && this.product.configurable_children[0][groupBy]) {
        let grupedByAttribute = _.groupBy(this.product.configurable_children, child => {
          return child[groupBy]
        })
        Object.keys(grupedByAttribute).forEach((confChild) => {
          if (grupedByAttribute[confChild][0].image) {
            images.push({
              'src': this.getThumbnail(grupedByAttribute[confChild][0].image, 600, 744),
              'loading': this.getThumbnail(this.product.image, 310, 300),
              'id': confChild
            })
          }
        })
      } else {
        images.push({
          'src': this.getThumbnail(this.product.image, 600, 744),
          'loading': this.getThumbnail(this.product.image, 310, 300)
        })
      }
      return _.uniqBy(images, 'src').filter((f) => { return f.src && f.src !== config.images.productPlaceholder })
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
