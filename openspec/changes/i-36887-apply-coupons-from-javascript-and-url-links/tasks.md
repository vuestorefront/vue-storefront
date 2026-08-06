## 1. Browser coupon adapter

- [x] 1.1 Add a client-side coupon activation module and result type that normalize coupon codes, block activation in Storyblok preview mode, and compose the existing cart getters, pending-coupon mutation, `cart/applyCoupon` action, cart-operation guard, and existing localized notifications.
- [x] 1.2 Expose the adapter as `window.budsies.applyCoupon(couponCode)` after client state hydration while preserving existing namespace properties.
- [x] 1.3 Add a Cart-owned `waitForCartSync` action backed by the active synchronization promise, and await it before browser coupon activation evaluates Cart state.
- [x] 1.4 Wait for user session startup before browser coupon activation evaluates Cart state.

## 2. URL and cache integration

- [x] 2.1 Process the initial `coupon_code` value from Vue Router's current route query through the browser adapter from a one-time router-ready callback that coexists with existing client initialization callbacks.
- [x] 2.2 Add `coupon_code` to the SSR ignored-query-key list without adding any server-side coupon execution.
