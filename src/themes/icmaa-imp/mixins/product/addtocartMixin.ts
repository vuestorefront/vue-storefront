import { minValue } from 'vuelidate/lib/validators'
import { notifications } from '@vue-storefront/core/modules/cart/helpers'
import * as cartMutationTypes from '@vue-storefront/core/modules/cart/store/mutation-types'

export default {
  methods: {
    getQuantity () {
      return this.$store
        .dispatch('stock/check', {
          product: this.product,
          qty: this.product.qty
        })
        .then(res => {
          this.quantity = res.qty || 0
        })
    },
    async addToCart (product) {
      try {
        const diffLog = await this.$store.dispatch('cart/addItem', { productToAdd: product })

        this.$store.dispatch('ui/closeAll')

        diffLog.clientNotifications.forEach(notificationData => {
          this.notifyUser(notificationData)
        })
      } catch (message) {
        this.$store.commit(
          cartMutationTypes.SN_CART + '/' + cartMutationTypes.CART_ADDING_ITEM,
          { isAdding: false }
        )
        this.notifyUser(notifications.createNotification({ type: 'error', message }))
      }
    },
    notifyUser (notificationData) {
      this.$store.dispatch('notification/spawnNotification', notificationData, { root: true })
    }
  },
  validations: {
    product: {
      qty: {
        minValue: minValue(1)
      }
    }
  }
}
