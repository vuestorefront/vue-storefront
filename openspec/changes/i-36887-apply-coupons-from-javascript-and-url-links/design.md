## Context

Issue 36664 already added the coupon mechanics needed by this change. `cart/applyCoupon` calls the existing Magento coupon service and forces totals synchronization before it resolves. `cart/applyPendingCoupon`, the normal cart connection flow, and the eligible add-item flow preserve a pending code until it applies successfully. The Storyblok coupon offer already saves a code before it has a server cart and uses the existing localized saved notification; `useCouponButton` already recognizes same and different active coupons.

What does not exist is a client-facing adapter. An external script cannot safely discover the current Vuex store or reuse the existing state checks, and the URL query is not consumed by the storefront. The store is SSR and page output is cached by URL, so the adapter must execute only in the browser after initial state hydration.

## Goals / Non-Goals

**Goals:**

- Add a narrow, browser-only `window.budsies.applyCoupon(couponCode)` entry point for Maestra and equivalent integrations.
- Return one of `applied`, `saved`, `already-applied`, `conflict`, or `rejected` without changing the existing cart action contract.
- Reuse the existing cart getter, mutation, action, retry, notification, and Magento-validation behavior.
- Consume a `coupon_code` value from the initial URL once on the client and ignore it in SSR cache keys.

**Non-Goals:**

- Change cart Vuex actions, pending-coupon persistence/retry, cart-line offers, Storyblok offers, manual promo-code entry/removal, checkout totals, translations, or Magento APIs.
- Add a new coupon API, multi-coupon behavior, new customer documentation, analytics, or a background retry process.
- Run coupon logic during SSR, remove the query parameter from the address bar, or reprocess it after initial page-load handling.

## Decisions

### Add a dedicated browser adapter around existing cart behavior

Add a client-only coupon activation module that receives the initialized store and exposes `window.budsies.applyCoupon(couponCode): Promise<CouponActivationResult>`. It augments the existing lowercase `budsies` object rather than replacing it. `CouponActivationResult` is local to the adapter, with `status` set to `applied`, `saved`, `already-applied`, `conflict`, or `rejected`; no cart state or Vuex action type changes are required.

The adapter trims the browser-supplied coupon code once and follows the existing coupon decision flow with cart state:

1. Reject empty normalized input, Storyblok preview mode, and the existing cart-interaction-blocked state without a mutation or Magento request.
2. When there is no usable server cart (no server token or no cart items), commit the existing pending-coupon mutation and use the existing localized saved notification; return `saved`.
3. When the existing cart getter reports the same active code, return `already-applied` without a request. When it reports a different code, preserve it, show the existing localized conflict notification, and return `conflict`.
4. Otherwise dispatch the unchanged `cart/applyCoupon` action. Its existing service request and totals sync determine `applied` versus `rejected`.

The existing connection and add-item actions continue to retry any code saved in step 2, so the adapter adds no retry logic. Existing offer and manual-entry components are not modified.

### Wait for an active Cart synchronization

Add a Cart-owned `waitForCartSync` action backed by a `syncPromise` field in Cart state. Each `cart/sync` invocation records its own promise in that field and clears it only if it remains the active promise. Concurrent synchronizations retain their existing behavior and overwrite the tracked promise rather than being deduplicated. The wait action awaits the current promise and repeats while a newer one is active. The coupon activation adapter awaits this action before it evaluates the cart-interaction guard, so a URL or browser API request is not rejected merely because startup synchronization is transiently active.

After waiting, the adapter evaluates the current cart state normally. If the synchronized cart has an active coupon, it returns `already-applied` or `conflict`; if no usable cart exists, it saves the pending coupon through the existing behavior.

### Wait for user session startup

Before waiting for Cart synchronization, the coupon activation adapter checks `user/getIsSessionStarted`. When the session is not yet ready, it waits once for the existing `session-after-started` event. The User module emits that event only after it awaits `cart/synchronizeCart`, so the adapter does not evaluate an incomplete startup cart. Later browser API calls continue immediately because the session-started getter is already true.

- Add a new high-level cart action with typed results. Rejected because the current Vuex actions already own every required state change and retry; only the external adapter needs a richer result.
- Route external integrations through a Vue component. Rejected because integrations must not depend on a rendered component or its lifecycle.
- Let integrations call `CartService` directly. Rejected because that would bypass the existing cart guards, totals synchronization, and pending-code behavior.

### Initialize once on the client and consume the initial URL parameter

Register the adapter from a dedicated browser-only coupon activation module at the end of the theme's client module registration. This guarantees that customer notifications are available before the adapter can process the initial URL, keeps Cart independent of notification concerns, and prevents SSR execution. After the router is ready, read `router.currentRoute.query.coupon_code`; Vue Router supplies the decoded query value without manual or double decoding.

Register one router-ready callback from the coupon activation module. Vue Router invokes that callback for the initial navigation only, so the initial decoded value is submitted once without additional page-lifetime state. The handler calls the same adapter method as Maestra, so all outcome checks remain identical.

- Process `coupon_code` in a Storyblok component. Rejected because a campaign URL must work on every route and component rendering could re-run the request.
- Process it on the server. Rejected because SSR has no customer cart state and the resulting page is URL-cached.
- Remove `coupon_code` after handling. Rejected because no URL mutation is required for the requested behavior.

### Ignore the marketing parameter in SSR cache keys

Add `coupon_code` to the existing ignored-query-key list in `core/scripts/server.ts`. This change only normalizes the cache key; it does not inspect or apply the coupon during server rendering.

## Risks / Trade-offs

- [An integration calls before client initialization] → The method is intentionally exposed only after the coupon activation module has initialized in the browser; no SSR stub is created.
- [A campaign URL contains a percent-encoded value] → Read the decoded value from Vue Router's route query.
- [A route or initializer is invoked repeatedly] → The coupon activation module registers one router-ready callback for the initial navigation.
- [A coupon request arrives during Cart synchronization] → Wait for the active synchronization and re-evaluate the Cart state before activating or saving a coupon.
- [A coupon request arrives during session startup] → Wait for `session-after-started`, then synchronize with the current Cart state before evaluating the coupon.
- [An active coupon exists] → Reuse the existing cart getter, preserve the code, and return `conflict` without calling Magento.
- [A saved coupon cannot apply later] → Existing pending-coupon retry retains it because this change does not alter that flow.

## Migration Plan

Deploy the browser adapter, coupon activation module registration, and cache-key exclusion together. Rollback removes the adapter and URL invocation; no cart data model, persisted state, Magento configuration, component, translation, or documentation migration is necessary.

## Open Questions

None blocking. The adapter method is named `applyCoupon` to align with the current cart action while returning the additional outcomes required by external callers.
