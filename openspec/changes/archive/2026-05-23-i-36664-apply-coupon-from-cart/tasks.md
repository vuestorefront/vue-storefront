## 1. Configuration And Cart State

- [x] 1.1 Add cart line coupon offer configuration and SKU-based offer resolution for eligible cart items.
- [x] 1.2 Add a shared cart getter and tests for blocking coupon interactions during add-to-cart, cart sync, and coupon processing.

## 2. Detailed Cart Coupon Experience

- [x] 2.1 Render an inline coupon offer beneath eligible detailed cart items using a dedicated cart-line component.
- [x] 2.2 Reuse the existing cart coupon apply/remove actions and reflect idle, applying, applied, and locked states in cart controls.
- [x] 2.3 Disable cart-page coupon apply and remove controls whenever the shared cart busy state indicates conflicting cart mutations.

## 3. Content And Validation

- [x] 3.1 Add the cart coupon offer copy and translations needed for button labels, state labels, and locked-state messaging.
- [x] 3.2 Validate the feature with focused store-unit coverage and cart-page QA for eligible, ineligible, applied, locked, and busy-operation states.