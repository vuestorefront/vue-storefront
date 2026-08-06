## Why

Coupon offers already work through the cart module, but Maestra and other browser integrations have no supported entry point for invoking that behavior. Campaign links also need a safe client-side way to hand their coupon intent to the existing flow.

## What Changes

- Expose a browser-only `window.budsies.applyCoupon(couponCode)` adapter that augments the existing browser namespace, composes the existing cart coupon, pending-coupon, active-coupon, and notification behavior, and returns a distinguishable outcome.
- Wait for an active Cart synchronization before evaluating a browser or URL coupon request.
- Wait for user session startup before evaluating a browser or URL coupon request.
- Process `coupon_code` from the initial browser URL after client initialization with standard URL decoding.
- Exclude `coupon_code` from SSR cache keys without processing coupons during SSR.

## Capabilities

### New Capabilities

- `coupon-activation`: Provide supported browser and URL entry points to the existing coupon mechanics for external integrations.

### Modified Capabilities

<!-- None. -->

## Impact

- A dedicated client-side coupon activation module and its browser namespace type.
- A Cart synchronization wait action backed by the active synchronization promise.
- Coupon activation session-readiness handling.
- Client-module wiring for the initial URL query parameter and the SSR cache-key ignore list.
