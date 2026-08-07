## Context

Order History already disables every `Re-order` action while the orders-history reorder flag or cart-sync flag is active. The existing handler also preserves success and error notifications. The missing behavior is only visible progress on the action the customer clicked.

The theme already provides `MSpinnerButton`, which shows a spinner and disables its underlying `SfButton` while `showSpinner` is true.

## Goals / Non-Goals

**Goals:**

- Reuse `MSpinnerButton` to show immediate progress on the initiating re-order action.
- Announce the in-progress state to screen-reader users.
- Reset the spinner after success or failure.
- Preserve all existing reorder, cart-sync, and notification behavior.

**Non-Goals:**

- Changing Vuex reorder or cart synchronization state.
- Changing request, cart refresh, eligibility, or notification behavior.
- Adding a new loader component or page-level loading state.

## Decisions

### Use `MSpinnerButton` for re-order actions

Register the existing theme `MSpinnerButton` in `order-item-actions.vue` and select it for actions with the `re-order` code. Continue using the existing dynamic action rendering for all other action types.

Pass the existing disabled value to the component and pass a setup-owned local loading ref through `showSpinner`. Existing button classes will be supplied through `MSpinnerButton`'s `buttonClass` prop so its inner `SfButton` retains the current appearance.

### Keep loading state local to the initiating item

Set a local boolean ref immediately before dispatching `REORDER_ITEM_ACTION` and clear it in `finally`. Because each order item owns its action component, only the clicked action displays a spinner. The existing `IS_REORDERING_ITEM` and `IS_CART_SYNCING` checks continue to disable conflicting re-order actions and reject repeated handler execution.

The existing success and error branches remain unchanged. No browser-only APIs or client-only hooks are introduced, preserving SSR safety.

### Announce progress with an `sr-only` live status

Render a `role="status"`, `aria-live="polite"`, and `aria-atomic="true"` element alongside the action. Its localized content will state that the item is being re-ordered only while the local loading ref is active, then return to empty when the operation settles. This follows the storefront's existing asynchronous status pattern without adding visible duplicate text.

## Risks / Trade-offs

- [`MSpinnerButton` adds a wrapper around the existing button] → Pass styling through `buttonClass` and add only narrowly scoped layout adjustments if required.
- [Local loading state does not survive navigation] → Reorder interaction state is transient, while the existing shared guards continue protecting cart updates.

## Migration Plan

No migration is required. Rollback consists of restoring the previous `SfButton` mapping and removing the local loading ref.

## Open Questions

None.
