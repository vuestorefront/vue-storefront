## Why

Cart recovery links can now instruct the Magento recovery API to reapply the recovered quote's promo code, but the storefront currently drops that instruction before making the recovery request. The storefront must preserve this optional behavior without changing existing recovery links.

## What Changes

- Accept the optional `applyPromoCode` query parameter on the cart recovery page.
- Forward the parameter through the Budsies Vuex recovery action to the Magento cart recovery API.
- Preserve the existing recovery behavior when the parameter is absent.
- Exclude `applyPromoCode` from SSR cache-key generation because it affects the client-side recovery request, not the rendered page shell.
- Add regression coverage for forwarding, omission, and cache-key behavior.

## Capabilities

### New Capabilities

- `cart-recovery`: Defines optional promo-code application during cart recovery and its SSR cache-key behavior.

### Modified Capabilities

None.

## Impact

- Cart recovery page in `src/themes/petsies-capybara/pages/CartRecovery.vue`.
- Budsies cart recovery Vuex action and its TaskQueue API request.
- SSR ignored-query-key configuration in `core/scripts/server.ts`.
- Focused storefront and server cache-key tests.
- No backend API contract change; the storefront begins forwarding the backend's existing optional parameter.
