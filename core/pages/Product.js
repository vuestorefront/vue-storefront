// 3rd party dependecies
import { mapGetters } from 'vuex'
import groupBy from 'lodash-es/groupBy'
import uniqBy from 'lodash-es/uniqBy'

// Core dependecies
import i18n from 'core/lib/i18n'
import config from 'config'
import EventBus from 'core/plugins/event-bus'
import { htmlDecode } from 'core/filters/html-decode'

// Core mixins
import Composite from 'core/mixins/composite'
import { addToWishlist, removeFromWishlist } from 'core/api/wishlist'

export default {
  name: 'Product',
  mixins: [ Composite, addToWishlist, removeFromWishlist ],
  data () {
    return {
      loading: false
    }
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
      category: 'category/current'
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
      let variantsGroupBy = config.products.galleryVariantsGroupAttribute
      if (this.product.configurable_children && this.product.configurable_children.length > 0 && this.product.configurable_children[0][variantsGroupBy]) {
        let groupedByAttribute = groupBy(this.product.configurable_children, child => {
          return child[variantsGroupBy]
        })
        Object.keys(groupedByAttribute).forEach((confChild) => {
          if (groupedByAttribute[confChild][0].image) {
            images.push({
              'src': this.getThumbnail(groupedByAttribute[confChild][0].image, 600, 744),
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
      return uniqBy(images, 'src').filter((f) => { return f.src && f.src !== config.images.productPlaceholder })
    },
    image () {
      return this.gallery.length ? this.gallery[0] : false
    },
    customAttributes () {
      let inst = this
      return Object.values(this.attributesByCode).filter(a => {
        return a.is_visible && a.is_user_defined && parseInt(a.is_visible_on_front) && inst.product[a.attribute_code]
      })
    },
    isOnWishlist () {
      return !!this.$store.state.wishlist.items.find(p => p.sku === this.product.sku)
    },
    isOnCompare () {
      return !!this.$store.state.compare.items.find(p => p.sku === this.product.sku)
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    EventBus.$emit('product-before-load', { store: store, route: route })
    return store.dispatch('product/fetchAsync', { parentSku: route.params.parentSku, childSku: route && route.params && route.params.childSku ? route.params.childSku : null })
  },
  watch: {
    '$route': 'validateRoute'
  },
  beforeDestroy () {
    this.$bus.$off('product-after-removevariant')
    this.$bus.$off('filter-changed-product')
    this.$bus.$off('product-after-priceupdate', this.onAfterPriceUpdate)
    this.$bus.$off('product-after-customoptions')
    this.$bus.$off('product-after-bundleoptions')
    if (config.priceTiers) {
      this.$bus.$off('user-after-loggedin', this.refreshProduct)
      this.$bus.$off('user-after-logout', this.refreshProduct)
    }
  },
  beforeMount () {
    this.onStateCheck()
  },
  created () {
    this.$bus.$on('product-after-removevariant', this.onAfterRemovedVariant)
    this.$bus.$on('product-after-priceupdate', this.onAfterPriceUpdate)
    this.$bus.$on('filter-changed-product', this.onAfterFilterChanged)
    this.$bus.$on('product-after-customoptions', this.onAfterCustomOptionsChanged)
    this.$bus.$on('product-after-bundleoptions', this.onAfterBundleOptionsChanged)
    if (config.priceTiers) {
      this.$bus.$on('user-after-loggedin', this.refreshProduct)
      this.$bus.$on('user-after-logout', this.refreshProduct)
      this.refreshProduct()
    }
  },
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
        }).catch((err) => {
          inst.loading = false
          console.error(err)
          this.$bus.$emit('notification', {
            type: 'error',
            message: i18n.t('The product is out of stock and cannot be added to the cart!'),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
          this.$router.back()
        })
      } else {
        console.error('Error with loading = true in Product.vue; Reload page')
      }
    },
    addToList (list) {
      return this.$store.state[list] ? this.$store.dispatch(`${list}/addItem`, this.product) : false
    },
    removeFromList (list) {
      return this.$store.state[list] ? this.$store.dispatch(`${list}/removeItem`, this.product) : false
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
    onAfterRemovedVariant (payload) {
      this.$forceUpdate()
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
        }
      }).catch(err => console.error({
        info: 'Dispatch product/configure in Product.vue',
        err
      }))
    },
    refreshProduct () {
      this.$store.dispatch('product/reset')
      EventBus.$emit('product-before-load', { store: this.$store, route: this.$route.route })
      this.$store.dispatch('product/singleWithoutCache', {options: { sku: this.$route.params.parentSku, childSku: this.$route.route && this.$route.route.params && this.$route.params.childSku ? this.$route.params.childSku : null }})
    }
  },
  metaInfo () {
    return {
      title: htmlDecode(this.$route.meta.title || this.productName),
      meta: this.$route.meta.description ? [{ vmid: 'description', description: htmlDecode(this.$route.meta.description) }] : []
    }
  }
}
