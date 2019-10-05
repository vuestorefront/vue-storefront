import { mapGetters } from 'vuex'
import { htmlDecode } from '@vue-storefront/core/filters'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

const store = currentStoreView()

export default {
  computed: {
    ...mapGetters({
      getOptionLabel: 'attribute/getOptionLabel',
      storeConfig: 'icmaaConfig/getCurrentStoreConfig',
      store: 'icmaaConfig/getCurrentStore'
    }),
    currencyCode () {
      return this.storeConfig ? this.storeConfig.i18n.currencyCode : ''
    },
    productPrice () {
      return this.product.original_price_incl_tax || this.productFinalPrice
    },
    productFinalPrice () {
      return this.product.price_incl_tax
    },
    productBandOrBrand () {
      return this.product.brand ? this.product.brand : this.product.band
    },
    productBandOrBrandCode () {
      return this.product.brand ? 'brand' : 'band'
    },
    productFbImages () {
      if (!this.product.media_gallery) {
        return []
      }

      let facebookImageTags = []
      this.product.media_gallery.forEach(image => {
        facebookImageTags.push(
          {
            property: 'og:image',
            content: getThumbnailPath('/catalog/product' + image.image, this.width, this.height, 'media')
          }
        )
      })
      return facebookImageTags
    }
  },
  metaInfo () {
    /**
     * @todo We can't load the current store-view from state management yet, the value is always empty in metaInfo().
     * I opened an issue here: @see https://github.com/DivanteLtd/vue-storefront/issues/3674
     */

    return {
      title: this.translatedProductName,
      meta: [
        { vmid: 'description', name: 'description', content: htmlDecode(this.product.description) },
        { vmid: 'og:title', property: 'og:title', content: htmlDecode(this.translatedProductName) },
        { vmid: 'og:type', property: 'og:type', content: 'product' },
        { name: 'product.name', content: htmlDecode(this.translatedProductName) },
        { name: 'product.final_price', content: this.productFinalPrice },
        { name: 'product.price', content: this.productPrice },
        { name: 'product:condition', content: 'new' },
        { name: 'product:availability', content: this.product.stock.is_in_stock }, // TODO mapping values - available for order, in stock, out fo stock, preorder
        { name: 'product:price:currency', content: store.i18n.currencyCode },
        { name: 'product:price:amount', content: this.productFinalPrice },
        { name: 'product:brand', content: this.getOptionLabel({ attributeKey: this.productBandOrBrandCode, optionId: this.productBandOrBrand }) },
        ...this.productFbImages
      ]
    }
  }
}
