import Product from '@vue-storefront/core/modules/catalog/types/Product'
import i18n from '@vue-storefront/i18n'

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
              this.$store.dispatch('notification/spawnNotification', notificationData, { root: true })
            })
          }
        } else {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'success',
            message: i18n.t('Product has been added to the cart!'),
            action1: { label: i18n.t('OK') },
            action2: null
          })
        }
        this.isAddingToCart = false
      } catch (err) {
        this.isAddingToCart = false
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: err,
          action1: { label: i18n.t('OK') }
        })
      }
    }
  }
}
