import { minValue } from 'vuelidate/lib/validators'
import { notifications } from '@vue-storefront/core/modules/cart/helpers'
import * as cartMutationTypes from '@vue-storefront/core/modules/cart/store/mutation-types'
import i18n from '@vue-storefront/i18n'

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
        /**
         * Note: There was a bug which causes the first attemp to put an item in cart to fail without message.
         * That was because the `cart/create` action, which is called during the add-to-cart action, calls the `cart/connect` action
         * which again runs the cart sync-/merge-actions and empties the cart again because the server response is empty and there is not yet
         * a `cartToken`. I could fix this by disabling `cart.serverMergeByDefault`. This will run the `cart/sync` action in `cart/connect`
         * action with the `dryRun` parameter and prevent the cart diffLog to be emptied.
         */
        const diffLog = await this.$store.dispatch('cart/addItem', { productToAdd: product })

        this.$store.dispatch('ui/closeAll')

        if (diffLog.clientNotifications.some(n => n.type === 'success')) {
          this.$store.dispatch('ui/setMicrocart', true)
        }

        diffLog.clientNotifications.forEach(notificationData => {
          // Add go-to-checkout as notification option
          if (notificationData.type === 'success') {
            notificationData.action1 = Object.assign({}, notificationData.action1, {
              label: i18n.t('Continue shopping'),
              action: this.continueShopping
            })
            notificationData.action2 = Object.assign({}, notificationData.action2, {
              label: i18n.t('Go to checkout'),
              action: this.goToCheckout
            })
          }

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
    },
    continueShopping (toCheckout = false) {
      this.$store.dispatch('ui/closeAll')
      if (toCheckout === true) {
        this.$router.push(this.localizedRoute('/checkout'))
      }
    },
    goToCheckout () {
      this.continueShopping(true)
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
