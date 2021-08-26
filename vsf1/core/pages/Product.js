import { mapGetters } from 'vuex'
import config from 'config'

import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { htmlDecode } from '@vue-storefront/core/filters'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'
import { CompareProduct } from '@vue-storefront/core/modules/compare/components/Product.ts'
import { AddToCompare } from '@vue-storefront/core/modules/compare/components/AddToCompare.ts'
import { ProductOption } from '@vue-storefront/core/modules/catalog/components/ProductOption.ts'
import omit from 'lodash-es/omit'
import Composite from '@vue-storefront/core/mixins/composite'
import { Logger } from '@vue-storefront/core/lib/logger'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'

export default {
  name: 'Product',
  mixins: [Composite, AddToCompare, CompareProduct, ProductOption],
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      product: 'product/getCurrentProduct',
      originalProduct: 'product/getOriginalProduct',
      parentProduct: 'product/getParentProduct',
      attributesByCode: 'attribute/getAttributeListByCode',
      attributesById: 'attribute/getAttributeListById',
      breadcrumbs: 'category-next/getBreadcrumbs',
      configuration: 'product/getCurrentProductConfiguration',
      options: 'product/getCurrentProductOptions',
      category: 'category/getCurrentCategory',
      gallery: 'product/getProductGallery',
      isUserGroupedTaxActive: 'tax/getIsUserGroupedTaxActive'
    }),
    productName () {
      return this.product ? this.product.name : ''
    },
    productId () {
      return this.product ? this.product.id : ''
    },
    offlineImage () {
      return {
        src: this.getThumbnail(this.product.image, config.products.thumbnails.width, config.products.thumbnails.height),
        error: this.getThumbnail(this.product.image, config.products.thumbnails.width, config.products.thumbnails.height),
        loading: this.getThumbnail(this.product.image, config.products.thumbnails.width, config.products.thumbnails.height)
      }
    },
    image () {
      return this.gallery.length ? this.gallery[0] : false
    },
    customAttributes () {
      return Object.values(this.attributesByCode).filter(a => {
        return a.is_visible && a.is_user_defined && (parseInt(a.is_visible_on_front) || a.is_visible_on_front === true) && this.product[a.attribute_code]
      })
    },
    currentStore () {
      return currentStoreView()
    }
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    EventBus.$emit('product-before-load', { store: store, route: route })
    if (context) context.output.cacheTags.add(`product`)
    return store.dispatch('product/loadProduct', { parentSku: route.params.parentSku, childSku: route && route.params && route.params.childSku ? route.params.childSku : null })
  },
  beforeRouteUpdate (to, from, next) {
    this.validateRoute(to) // TODO: remove because client-entry.ts is executing `asyncData` anyway
    next()
  },
  // Move busses to mixin which is directly imported in Project.vue
  beforeDestroy () {
    this.$bus.$off('product-after-removevariant')
    this.$bus.$off('filter-changed-product')
    this.$bus.$off('product-after-priceupdate', this.onAfterPriceUpdate)
    this.$bus.$off('product-after-customoptions')
    this.$bus.$off('product-after-bundleoptions')
    if (config.usePriceTiers || this.isUserGroupedTaxActive) {
      this.$bus.$off('user-after-loggedin', this.onUserPricesRefreshed)
      this.$bus.$off('user-after-logout', this.onUserPricesRefreshed)
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-removevariant', this.onAfterVariantChanged)
    this.$bus.$on('product-after-priceupdate', this.onAfterPriceUpdate) // moved to catalog module
    this.$bus.$on('filter-changed-product', this.onAfterFilterChanged) // moved to catalog module
    this.$bus.$on('product-after-customoptions', this.onAfterCustomOptionsChanged) // moved to catalog module
    this.$bus.$on('product-after-bundleoptions', this.onAfterBundleOptionsChanged) // moved to catalog module
    if (config.usePriceTiers || this.isUserGroupedTaxActive) { // moved to catalog module
      this.$bus.$on('user-after-loggedin', this.onUserPricesRefreshed)
      this.$bus.$on('user-after-logout', this.onUserPricesRefreshed)
    }
    this.onStateCheck()
    this.$store.dispatch('recently-viewed/addItem', this.product)
  },
  methods: {
    validateRoute (route = this.$route) {
      if (!this.loading) {
        this.loading = true
        this.$store.dispatch('product/loadProduct', { parentSku: route.params.parentSku, childSku: route && route.params && route.params.childSku ? route.params.childSku : null }).then(res => {
          this.loading = false
          this.defaultOfflineImage = this.product.image
          this.onStateCheck()
          this.$store.dispatch('recently-viewed/addItem', this.product)
        }).catch((err) => {
          this.loading = false
          Logger.error(err)()
          this.notifyOutStock()
          this.$router.back()
        })
      } else {
        Logger.error('Error with loading = true in Product.vue; Reload page')()
      }
    },
    addToWishlist (product) {
      return this.$store.state['wishlist'] ? this.$store.dispatch('wishlist/addItem', product) : false
    },
    removeFromWishlist (product) {
      return this.$store.state['wishlist'] ? this.$store.dispatch('wishlist/removeItem', product) : false
    },
    addToList (list) {
      // Method renamed to 'addToCompare(product)', product is an Object
      AddToCompare.methods.addToCompare.call(this, this.product)
    },
    removeFromList (list) {
      // Method renamed to 'removeFromCompare(product)', product is an Object
      CompareProduct.methods.removeFromCompare.call(this, this.product)
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
            priceDeltaInclTax += ((optionValue.price / 100) * this.originalProduct.price_incl_tax)
          }
        }
      }
      this.product.price = this.originalProduct.price + priceDelta
      this.product.price_incl_tax = this.originalProduct.price_incl_tax + priceDeltaInclTax
    },
    onAfterBundleOptionsChanged (payload) {
      let priceDelta = 0
      let priceDeltaInclTax = 0
      for (const optionValue of Object.values(payload.optionValues)) {
        if (typeof optionValue.value.product !== 'undefined' && parseInt(optionValue.qty) >= 0) {
          priceDelta += optionValue.value.product.price * parseInt(optionValue.qty)
          priceDeltaInclTax += optionValue.value.product.price_incl_tax * parseInt(optionValue.qty)
        }
      }
      if (priceDelta > 0) {
        this.product.price = priceDelta
        this.product.price_incl_tax = priceDeltaInclTax
      }
    },
    onStateCheck () {
      if (this.parentProduct && this.parentProduct.id !== this.product.id) {
        Logger.log('Redirecting to parent, configurable product', this.parentProduct.sku)()
        const parentUrl = formatProductLink(this.parentProduct, currentStoreView().storeCode)
        this.$router.replace(parentUrl)
      }
    },
    onAfterPriceUpdate (product) {
      if (product.sku === this.product.sku) {
        // join selected variant object to the store
        this.$store.dispatch('product/setCurrent', omit(product, ['name']))
          .catch(err => Logger.error({
            info: 'Dispatch product/setCurrent in Product.vue',
            err
          }))
      }
    },
    onAfterVariantChanged (payload) {
      this.$store.dispatch('product/setProductGallery', { product: this.product })
      this.$forceUpdate()
    },
    onAfterFilterChanged (filterOption) {
      this.$bus.$emit('product-before-configure', { filterOption: filterOption, configuration: this.configuration })
      const prevOption = this.configuration[filterOption.attribute_code]
      let changedConfig = Object.assign({}, this.configuration, { [filterOption.attribute_code]: filterOption })
      this.$forceUpdate() // this is to update the available options regarding current selection
      this.$store.dispatch('product/configure', {
        product: this.product,
        configuration: changedConfig,
        selectDefaultVariant: true,
        fallbackToDefaultWhenNoAvailable: false,
        setProductErorrs: true
      }).then((selectedVariant) => {
        if (config.products.setFirstVarianAsDefaultInURL) {
          this.$router.push({ params: { childSku: selectedVariant.sku } })
        }
        if (!selectedVariant) {
          if (typeof prevOption !== 'undefined' && prevOption) {
            this.configuration[filterOption.attribute_code] = prevOption
          } else {
            delete this.configuration[filterOption.attribute_code]
          }
          this.notifyWrongAttributes()
        }
      }).catch(err => Logger.error({
        info: 'Dispatch product/configure in Product.vue',
        err
      }))
    },
    /**
     * Reload product to get correct prices (including tier prices for group)
     */
    onUserPricesRefreshed () {
      if (this.$route.params.parentSku) {
        this.$store.dispatch('product/reset')
        this.$bus.$emit('product-before-load', { store: this.$store, route: this.$route })
        this.$store.dispatch('product/single', {
          options: {
            sku: this.$route.params.parentSku,
            childSku: this.$route && this.$route.params && this.$route.params.childSku ? this.$route.params.childSku : null
          },
          skipCache: true
        })
      }
    }
  },
  metaInfo () {
    const storeView = currentStoreView()
    return {
      /* link: [
        { rel: 'amphtml',
          href: this.$router.resolve(localizedRoute({
            name: this.product.type_id + '-product-amp',
            params: {
              parentSku: this.product.parentSku ? this.product.parentSku : this.product.sku,
              slug: this.product.slug,
              childSku: this.product.sku
            }
          }, storeView.storeCode)).href
        }
      ], */
      title: htmlDecode(this.product.meta_title || this.productName),
      meta: this.product.meta_description ? [{ vmid: 'description', name: 'description', content: htmlDecode(this.product.meta_description) }] : []
    }
  }
}
