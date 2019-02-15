import { productThumbnailPath } from '@vue-storefront/core/helpers'

export const ProductTile = {
  name: 'ProductTile',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      clicks: 0,
      placeholder: '/assets/placeholder.jpg'
    }
  },
  computed: {
    productLink () {
      return ((this.$store.state.config.seo.useUrlDispatcher) ? 
        this.localizedDispatcherRoute({
          fullPath: this.$store.state.config.seo.useUrlDispatcher ? this.product.url_path : null,
          params: {
            childSku: this.product.sku === this.product.parentSku ? null : this.product.sku
          }
        })
      :
        this.localizedRoute({
          name: this.product.type_id + '-product',
          params: {
            parentSku: this.product.parentSku ? this.product.parentSku : this.product.sku,
            slug: this.product.slug,
            childSku: this.product.sku
          }
        })
      )   
    },  
    thumbnail () {
      // todo: play with the image based on category page filters - eg. when 'red' color is chosen, the image is going to be 'red'
      let thumbnail = productThumbnailPath(this.product)
      return this.getThumbnail(thumbnail, 310, 300)
    },
    thumbnailObj () {
      return {
        src: this.thumbnail,
        loading: this.placeholder,
        error: this.placeholder
      }
    },
    isOnSale () {
      return this.product.sale === '1' ? 'sale' : ''
    },
    isNew () {
      return this.product.new === '1' ? 'new' : ''
    }
  }
}
