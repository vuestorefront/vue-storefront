## 1. Pending Coupon Support in the Cart Module

- [x] 1.1 Add typed pending-coupon state, synchronous mutations, getters, and set, clear, and apply actions to the existing `cart` Vuex module.
- [x] 1.2 Persist and hydrate the pending coupon through the existing cart cache handler and local-storage flow; clear it through the cart clear path, including logout-driven cart clearing.
- [x] 1.3 Extend the successful `cart/connect` flow to apply one pending coupon through the existing `cart/applyCoupon` action after connection and synchronization complete, clearing it only on success.

## 2. Storyblok Coupon Application Behavior

- [x] 2.1 Reuse the cart-line coupon offer's `useCouponButton` interaction states, busy guard, direct application flow, and applied confirmation for Storyblok coupon offers with cart items.
- [x] 2.2 When an otherwise actionable Storyblok coupon offer is selected before a server cart exists, save its code through the cart module instead of applying it and show localized success copy that it will be applied after cart creation.
- [x] 2.3 Ensure an existing server cart retains the existing cart-line offer behavior when direct coupon application is unsuccessful; do not create a mutation subscription, EventBus listener, or background retry schedule.

## 3. Storyblok Landing-Page UI

- [x] 3.1 Extract the visual coupon banner, code, action, accessibility, and state rendering from `MCartLineCouponOffer` into a reusable coupon-item component with a semantic coupon action event.
- [x] 3.2 Refactor `MCartLineCouponOffer` to remain the SKU-based cart-line offer resolver and use the shared coupon-item component without changing its customer-visible behavior.
- [x] 3.3 Add and register a dedicated Storyblok coupon-offer renderer and typed CMS data interface; render the shared coupon-item component and dispatch the existing cart actions from it.
- [x] 3.4 Apply Storyblok root classes, styles, and editor icons to the new renderer; disable its coupon action in editor preview and reflect interaction, applying, and already-applied/locked states without navigating away from the landing page.

## 4. Localization

- [x] 4.1 Add and extract localized customer messages for coupon saved, applied, and unavailable states with `yarn update-i18n-files`.
