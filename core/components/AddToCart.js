import { addToCart } from '@vue-storefront/core/modules/cart'

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
