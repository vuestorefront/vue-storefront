import Product from '@vue-storefront/core/modules/catalog/types/Product'
import { Logger } from '@vue-storefront/core/lib/logger';

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
        if (diffLog.clientNotifications && diffLog.clientNotifications.length > 0) {
          diffLog.clientNotifications.forEach(notificationData => {
            this.$store.dispatch('notification/spawnNotification', notificationData, { root: true })
          })
        }
      } catch (e) {
        Logger.error(e, 'cart')()
      } finally {
        this.isAddingToCart = false
      }
    }
  }
}
