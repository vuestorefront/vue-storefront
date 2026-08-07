## Why

Re-ordering an item from Order History can take several seconds, but customers receive no action-level feedback after clicking. This makes the action appear unresponsive and allows repeated clicks while the cart update is still running.

## What Changes

- Render the existing `MSpinnerButton` for Order History `Re-order` actions and show its spinner on the action that initiated the request.
- Announce through an `sr-only` live status that the item is being re-ordered.
- Clear the initiating action's spinner after either success or failure.
- Preserve the existing shared reorder/cart-sync disabled guards, success and error notifications, backend request, cart refresh, and reorder eligibility behavior.

## Capabilities

### New Capabilities

- `order-history-item-reorder-feedback`: Gives customers visible, duplicate-safe progress feedback for item-level Order History reorders.

### Modified Capabilities

- None.

## Impact

- Affects `src/modules/orders-history/components/order-item-actions.vue`.
- Reuses the theme's existing `MSpinnerButton` and the current Vuex/cart-sync guards; no store, API, or backend contract changes are required.
