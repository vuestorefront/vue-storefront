/**
 * Functionality for subscribing newsletter
 *
 * #### Methods
 * - **`subscribe(email)`** adds passed email to subscription list
 *
 * Part of [Newsletter API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
import EventBus from '@vue-storefront/core/plugins/event-bus'

export const subscribe = {
  methods: {
    subscribe (email) {
      EventBus.$emit('newsletter-after-subscribe', { email: email })
    }
  }
}
