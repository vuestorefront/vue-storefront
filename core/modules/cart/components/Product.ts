import { productThumbnailPath } from '@vue-storefront/core/helpers'
import config from 'config'

export const MicrocartProduct = {
  name: 'MicrocartProduct',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    thumbnail () {
      const thumbnail = productThumbnailPath(this.product)
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        return this.getThumbnail(thumbnail, config.products.thumbnails.width, config.products.thumbnails.height) // for offline support we do need to have ProductTile version
      } else return this.getThumbnail(thumbnail, config.cart.thumbnails.width, config.cart.thumbnails.height)
    },
    options () {
      const opts = {}

      if (!this.product.configurable_options) {
        return null
      }

      this.product.configurable_options.forEach(el => {
        opts[el.attribute_code] = el.values.map(obj => ({
          id: obj.value_index,
          label: obj.label,
          attribute_code: el.attribute_code,
          type: el.attribute_code
        }))
      })

      return opts
    },
    configuration () {
      if (!this.options) {
        return null
      }

      const getAttributesFields = (attributeCode) =>
        this.options[attributeCode].find(c => c.id === parseInt(this.product[attributeCode]))

      return {
        color: {
          attribute_code: 'color',
          ...getAttributesFields('color')
        },
        size: {
          attribute_code: 'size',
          ...getAttributesFields('size')
        }
      }
    }
  },
  methods: {
    removeFromCart () {
      this.$store.dispatch('cart/removeItem', { product: this.product })
    },
    updateQuantity (quantity) {
      this.$store.dispatch('cart/updateQuantity', { product: this.product, qty: quantity })
    }
  }
}
