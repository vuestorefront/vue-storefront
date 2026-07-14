## Context

The completed `cart-line-coupon-offers` change provides a reusable cart coupon action and a shared busy-state guard, but it only exposes offers for products already in the detailed cart. Its `MCartLineCouponOffer` component currently combines cart-line offer resolution, coupon interaction state, and coupon-item presentation. Storyblok landing pages have no dedicated coupon-offer renderer.

The core `cart/applyCoupon` Vuex action is the sole client path to the existing coupon API and returns the backend task result. `useCouponButton`, which backs the completed cart-line offer, already provides the coupon state machine, active-coupon lock, busy guard, direct cart dispatch, and applied confirmation. The cart module already owns cart state, persistence, local-storage hydration, and the `addItem` flow. The storefront is SSR, so cart persistence continues to use the existing client-only cart storage integration.

## Goals / Non-Goals

**Goals:**

- Let a Storyblok author configure a dedicated coupon offer on a landing page without changing ordinary Storyblok link buttons.
- Extract a reusable coupon-item presentation component so the detailed cart and Storyblok offer render the same coupon states and controls.
- Reuse `cart/applyCoupon` for every attempted application and preserve the existing single-coupon and cart-busy safeguards.
- Keep one pending coupon code in existing cart state and cart browser storage when a Storyblok offer is selected before a server cart exists.
- Apply that pending code through the existing cart coupon flow after the normal cart connection flow creates or connects a server cart, and give customers distinct applied and saved feedback.
- Keep the feature safe for SSR, Storyblok editor preview, cart persistence, and cart clearing on logout.

**Non-Goals:**

- Change Magento coupon rules, add a coupon eligibility API, or create a parallel backend coupon endpoint.
- Support more than one active or pending coupon, or defer a coupon after a server cart already exists.
- Alter the customer-facing cart-line coupon offer behavior or its SKU configuration.
- Add coupon analytics, a customer-visible pending-coupon manager, or CMS-side schema deployment automation.

## Decisions

### Add a dedicated Storyblok coupon-offer renderer backed by a shared coupon item

Introduce a dedicated Storyblok coupon-offer component with its own data interface and component registration. It renders the common coupon item inside the standard Storyblok root, including `cssClasses`, `styles`, and `editor-block-icons`; its interactive content is disabled in editor preview mode. The existing `button_item` renderer remains an unconditional link renderer and is not part of this feature.

Extract the coupon banner, code, action button, and its applied/applying/locked rendering from `MCartLineCouponOffer` into a reusable coupon-item component. The shared component receives offer content and coupon state from its container and emits the semantic coupon action. `MCartLineCouponOffer` remains the cart-specific wrapper that resolves its SKU-based offer and supplies the existing cart flow; the new Storyblok renderer supplies the landing-page offer data and pending-intent flow. This preserves one coupon UI while keeping cart and Storyblok domain orchestration separate.

- Extend `button_item` with a coupon field. Rejected because coupon application and navigation are distinct authoring intents, and mixing them would make the generic button contract and its behavior conditional.
- Duplicate the cart-line coupon markup in the Storyblok renderer. Rejected because coupon state labels, accessibility, and interaction styling would drift between the two offer surfaces.
- Move Storyblok-specific pending-intent behavior into the cart-line wrapper. Rejected because detailed-cart offers apply against an already eligible item and should not acquire landing-page persistence responsibilities.

### Store the pending coupon in the existing cart module

A pending coupon code belongs in the existing namespaced `cart` Vuex module because coupon application, cart contents, cart persistence, and add-to-cart orchestration already live there. Add typed cart state, synchronous mutations, getters, and actions for setting, clearing, and applying one pending coupon. Extend the cart's cache handler and local-storage hydration to persist the value alongside other cart data, and clear it whenever the cart is cleared, including logout-driven cart clearing.

The Storyblok renderer dispatches the cart actions; it does not create a feature module, call the coupon API directly, or access browser storage. This preserves the existing component → Vuex action → cart service flow and keeps a pending coupon coupled to the cart whose first added product triggers it.

- Keep the pending code in a component ref. Rejected because the intent would disappear on navigation, refresh, and Storyblok component destruction.
- Add a separate feature module. Rejected because it duplicates cart ownership and requires cross-module coordination for an existing cart concern.
- Persist the code only in raw `localStorage`. Rejected because it bypasses the established cart storage abstraction and hydration flow.

### Follow the cart-line coupon flow, with a no-server-cart save path

The Storyblok renderer uses the same shared coupon item and `useCouponButton` behavior as the cart-line offer. When a server cart exists, it uses the identical active-coupon state, busy guard, direct `cart/applyCoupon` dispatch, and applied confirmation. It does not convert a failed application for an existing server cart into a pending coupon.

The sole addition is before the direct application path: if no server cart token exists and the offer is otherwise actionable, the renderer dispatches the cart action that saves the selected code instead of attempting to apply it. It then shows a success notification that explicitly says the coupon was saved and will be applied automatically after a cart is created. This avoids interpreting coupon-API failures and makes the deferred behavior deterministic.

- Save every coupon whose direct application fails. Rejected because it changes the established cart-line behavior and treats invalid or ineligible existing-cart attempts as saved intent.
- Parse backend error-message text to distinguish eligibility failures. Rejected because the absence of a server-cart token is already a reliable, local criterion and error messages are not a stable API contract.

### Apply the pending coupon from the existing cart connection flow

The existing `cart/connect` action is the authoritative server-cart creation and connection path. After it receives a cart token and completes the normal cart synchronization, it dispatches the pending-coupon action. That action uses the existing `cart/applyCoupon` workflow and clears the stored code after a successful application. This covers the first product being added to a guest cart as well as a cart created or connected while a customer logs in.

There is no mutation subscription, EventBus retry listener, or generic retry scheduler. A failed pending-code application remains stored and the next successful cart connection is its next opportunity. The existing coupon state checks prevent the pending action from replacing an active coupon or racing an in-progress cart operation.

- Subscribe to cart mutations or EventBus events to retry the code. Rejected because the required trigger is a successful server-cart connection, which is already owned by `cart/connect`.
- Retry immediately from the Storyblok click handler. Rejected because no server cart can accept the coupon and the customer must receive saved, not applied, feedback.

## Risks / Trade-offs

- [A Storyblok code is expired or mistyped] → An existing server cart follows the current cart-line offer behavior and is not saved; a code selected before cart creation remains pending until the cart connection can attempt the authoritative cart flow.
- [A cart is created during login rather than add-to-cart] → Trigger from the shared `cart/connect` completion path, which handles both creation routes after synchronization completes.
- [The cart is cleared or the customer logs out] → Clear the pending code through the existing cart clear path and remove its stored value with other cart data.
- [SSR renders a Storyblok coupon CTA] → Render it normally while relying on the existing client-only cart persistence and cart action behavior.

## Migration Plan

Deploy the dedicated Storyblok coupon-offer component, the shared coupon-item extraction, and the cart-module changes together. Existing Storyblok buttons are unchanged, so authors opt in by adding the new coupon-offer block to landing-page content. Rollback consists of removing those blocks and reverting the cart and shared-component changes; the pending coupon's cart-storage key can be safely removed by a later cleanup.

## Open Questions

None blocking. Deferred behavior is deliberately limited to the absence of a server cart, and `cart/connect` is the shared cart-creation path for both product additions and login.
