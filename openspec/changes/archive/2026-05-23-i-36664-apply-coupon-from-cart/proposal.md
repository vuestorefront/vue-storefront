## Why

Customers currently have to know and enter eligible promotion codes manually even when a product in the cart is associated with a promoted coupon. That adds friction on the cart page and makes product-specific offers easier to miss at the exact point where customers decide whether to continue checkout.

## What Changes

- Add configurable cart line coupon offers that map coupon codes and CTA text to eligible product SKUs.
- Render an inline coupon offer under eligible cart items in the detailed cart so customers can apply the mapped coupon directly from the cart.
- Show clear cart-line coupon states for idle, applying, applied, and locked when another coupon is already active.
- Reuse the cart coupon application and removal flow across the detailed cart summary and existing promo code controls.
- Block coupon interactions while cart add-to-cart, cart sync, or coupon processing operations are in progress to avoid conflicting cart mutations.

## Capabilities

### New Capabilities
- `cart-line-coupon-offers`: Surface configured coupon offers on cart line items and let customers apply eligible coupons directly from the detailed cart while respecting cart operation state.

### Modified Capabilities
- None.

## Impact

- Cart configuration in `config/local.json.template`.
- Cart store getters and tests in `core/modules/cart`.
- Detailed cart UI, promo code controls, and cart coupon helpers in `src/themes/petsies-capybara`.
- Cart i18n strings for coupon offer states and actions.