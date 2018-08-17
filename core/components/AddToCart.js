import { addToCart } from '@vue-storefront/core/api/cart'

export default {
  name: 'AddToCart',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  mixins: [ addToCart ]
}
