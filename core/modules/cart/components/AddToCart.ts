import Product from '@vue-storefront/core/modules/catalog/types/Product'
import { Logger } from '@vue-storefront/core/lib/logger';

// @deprecated moved to store
export const AddToCart = {
  name: 'AddToCart',
  data () {
    return {
      isAddingToCart: false
    }
  },
  props: {
    product: {
      required: true,
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async addToCart (product: Product) {
      this.isAddingToCart = true
      try {
        const diffLog = await this.$store.dispatch('cart/addItem', { productToAdd: product })

        if (diffLog) {
          if (diffLog.clientNotifications && diffLog.clientNotifications.length > 0) {
            diffLog.clientNotifications.forEach(notificationData => {
              this.notifyUser(notificationData)
            })
          }
        } else {
          this.notifyUser({
            type: 'success',
            message: this.$t('Product has been added to the cart!'),
            action1: { label: this.$t('OK') },
            action2: null
          })
        }
        return diffLog
      } catch (err) {
        this.notifyUser({
          type: 'error',
          message: err,
          action1: { label: this.$t('OK') }
        })
        return null
      } finally {
        this.isAddingToCart = false
      }
    }
  }
}
