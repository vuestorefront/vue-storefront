/**
 * Functionality for unsubscribing newsletter
 *
 * #### Methods
 * - **`unsubscribe(email)`** removes passed email from subscription list
 *
 * Part of [Newsletter API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
import EventBus from '@vue-storefront/core/plugins/event-bus'

export const unsubscribe = {
  methods: {
    unsubscribe (email) {
      EventBus.$emit('newsletter-after-unsubscribe', { email: email })
    }
  }
}
