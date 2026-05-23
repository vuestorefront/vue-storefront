## Context

The storefront already supports coupon application and removal through the shared cart Vuex module, but the cart experience requires customers to know and enter codes manually. The implemented change adds a cart-only promotional path that spans root cart configuration, shared cart getters, and the `petsies-capybara` detailed cart UI.

This work is cross-cutting enough to require a design document because it introduces a new configurable cart offer surface, reuses existing cart coupon actions from multiple cart controls, and coordinates interaction blocking across separate components while cart mutations are in flight.

## Goals / Non-Goals

**Goals:**
- Surface eligible coupon offers directly on detailed cart line items.
- Keep coupon application on the existing `cart/applyCoupon` and `cart/removeCoupon` flow instead of adding a parallel API path.
- Present deterministic cart offer states for idle, applying, applied, and locked.
- Prevent conflicting coupon mutations while cart add-to-cart, cart sync, or coupon processing work is active.

**Non-Goals:**
- Introduce coupon discovery or application outside the cart page.
- Add merchant-managed CMS tooling for coupon offer configuration.
- Support multiple simultaneously applied coupons.
- Add new backend coupon APIs or change Magento coupon rules.

## Decisions

### Configure offers in cart config
Coupon offers are defined in cart configuration as mappings keyed by coupon code with `buttonText` and eligible `productSkus`. This keeps merchandising control data-driven and avoids hard-coding product-specific coupon logic in the theme.

Alternatives considered:
- Hard-code SKU-to-coupon rules in Vue components. Rejected because it couples merchandising changes to theme code edits.
- Fetch offer mappings from a new API. Rejected because the existing implementation does not need dynamic runtime data and would add unnecessary complexity.

### Resolve offers per cart line item using existing cart item identity
Offer resolution uses the cart line item `parentSku` when present and falls back to `sku`. That matches bundle/customization cart item structure and keeps eligibility aligned with the sellable parent product customers recognize.

Alternatives considered:
- Match only on child SKU. Rejected because customized bundle items may not map cleanly to the marketed product offer.
- Resolve offers from arbitrary cart item metadata. Rejected because the current config already expresses eligibility with product SKU lists.

### Render a dedicated detailed-cart offer component and keep coupon state in a composable
The inline coupon banner is rendered under each detailed cart row by a dedicated component, while coupon application state stays in a reusable `useCouponButton` composable. This keeps line-item presentation local to the cart page and centralizes the coupon state machine used by that UI.

Alternatives considered:
- Put all state logic directly in `DetailedCart.vue`. Rejected because it would mix cart row layout concerns with coupon workflow state.
- Extend the generic promo input to also render product-specific offers. Rejected because the global promo control and the cart-line offer have different triggers and presentation.

### Reuse existing cart coupon actions and add one shared busy getter
All coupon apply/remove entry points continue using the existing cart Vuex actions. A shared cart getter exposes whether coupon interactions must be blocked because add-to-cart, cart sync, or coupon processing is running. The cart line offer, promo code input, and summary removal button all consume the same busy signal.

Alternatives considered:
- Gate each component with its own local combination of cart flags. Rejected because duplicated rules drift easily and make the cart behavior inconsistent.
- Block all cart interactions for any store activity. Rejected because the requested behavior is narrower and should only cover conflicting cart mutations.

## Risks / Trade-offs

- [Offer mappings are static configuration] → Document the config shape and keep offer definitions in cart config so changes remain explicit and reviewable.
- [Only one coupon can be active, so some offers become unavailable] → Show a locked state with explicit copy when another coupon is already applied.
- [Shared busy gating can make controls feel temporarily unresponsive] → Scope blocking only to add-to-cart, cart sync, and coupon processing, and preserve visual state feedback while actions are disabled.
- [The capability lives mostly in the theme] → Keep the shared cart-store addition minimal and generic so root-level changes remain reusable.

## Migration Plan

Deploy the root cart config and cart getter changes together with the theme components that render and consume the feature. No data migration is required. Rollback is straightforward: remove the cart offer mappings and revert the theme/root code paths that resolve and render cart-line coupon offers.

## Open Questions

- No blocking implementation questions remain for the current cart-only scope.
- Future work, if requested, could decide whether merchandising needs admin-managed offer content or analytics for cart-line coupon interactions.