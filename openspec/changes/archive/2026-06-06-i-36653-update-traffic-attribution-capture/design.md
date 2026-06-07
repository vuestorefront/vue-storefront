## Context

Traffic attribution for #36653 spans a client-side capture buffer in Vue Storefront and authoritative classification/persistence in Magento. Vue Storefront sees the initial browser landing URL, query parameters, and `document.referrer` before a quote exists. Magento sees the visitor only after cart creation or cart connection. The storefront therefore needs to capture and hold raw first-touch and last-touch data until it can submit the touches to the existing Magento endpoint.

The storefront must not classify traffic into channels, sources, paid/organic categories, or GA4 vocabulary. Its responsibility is limited to raw capture, first/last lifecycle, local persistence, non-blocking quote submission, and cache-safe handling of attribution query parameters.

## Goals / Non-Goals

**Goals:**

- Provide a client-only traffic attribution Vue Storefront module with a namespaced Vuex store.
- Capture a raw attribution touch from the initial client-side SPA landing context.
- Persist first touch and last touch through module-scoped storage and synchronize storage changes across tabs.
- Store first touch write-once, including direct landings.
- Store last touch on first capture, and later replace it only when the initial landing contains a coarse acquisition signal.
- Preserve current expiration defaults, global `isSent` flags, and cart-created/cart-connected reporting behavior.
- Submit first and last touches as separate requests to the existing Magento endpoint without adding a touch type to the payload.
- Prevent sensitive query parameters from being persisted or submitted in raw attribution data.
- Keep SSR cache behavior aligned by ignoring attribution-only query parameters where needed.

**Non-Goals:**

- No storefront-side channel/source classification, vocabulary mapping, source precedence cascade, or GA4 channel normalization.
- No `session_id` in the storefront payload.
- No `router.afterEach` capture and no reaction to internal SPA navigation.
- No per-cart sent-state tracking.
- No immediate reporting when last touch changes while a cart already exists beyond the existing cart-created/cart-connected events.
- No server-side first-party attribution cookie work.
- No checkout blocking, order placement blocking, or component-level attribution API calls.

## Decisions

### Client Module and Vuex Store

Implement attribution as a Vue Storefront client module registered from the theme module list. The module owns a namespaced Vuex store containing `firstTouch` and `lastTouch`, with synchronous mutations for setting, clearing, and marking sent. This keeps the feature aligned with the platform data-flow rule: module/bootstrap events dispatch Vuex actions, and actions own side effects.

Alternative considered: capture attribution inside a layout or checkout component. Rejected because it would create component-level side effects and make cart lifecycle reporting harder to reason about.

### Client-Only Side Effects

Register the Vuex module in all environments for state shape consistency, but initialize browser-only work only on the client. Storage initialization, storage event listeners, cart event listeners, and raw touch capture must not run during SSR.

Alternative considered: capture attribution during SSR from request URL/referrer headers. Rejected because SSR is stateless, cached by URL, and should not depend on visitor session data.

### Storage and Cross-Tab Synchronization

Use `StorageManager.init(MODULE_NAME)` and the existing local storage synchronization factory to persist first and last touch wrappers. Mutations that set or clear touches update storage. Mutations that mark touches sent persist the updated wrapper. Storage events from other tabs update Vuex state so sent flags and touch updates stay consistent across active tabs.

Keep the existing `StorageManager`-scoped first/last touch keys rather than renaming to literal `bd_first_touch` and `bd_last_touch`. Because this feature is not deployed yet, the raw touch shape can be the only stored payload contract.

Alternative considered: use direct `window.localStorage` reads/writes. Rejected because the codebase standardizes local persistence through `StorageManager` and already has shared cross-tab synchronization helpers.

### Touch Wrapper and Expiration

Each persisted touch is stored in a wrapper with the raw attribution payload, `isSent`, `createdAt`, and `expiresAt`. First-touch and last-touch expiration days come from configuration when positive values are provided; otherwise the module defaults are used. During synchronization, expired stored touches are cleared before capture decisions run.

Alternative considered: store raw payloads without wrapper metadata. Rejected because the reporting flow needs sent flags and the lifecycle needs expiration timestamps.

### Capture Raw Touch Data

Replace normalized UTM extraction with a raw touch builder. The raw touch includes:

- `landing_page_url`: browser landing URL origin and pathname without query parameters.
- `referrer_url`: `document.referrer` when available.
- `query_params`: landing query parameters after sensitive-key filtering.
- `detected_at`: browser capture time as an ISO timestamp.

Query parameters are reported in `query_params` rather than duplicated in `landing_page_url`, which prevents sensitive or operational values from leaking through the URL field.

Alternative considered: continue sending normalized `utm_*` fields and `rawAttributes`. Rejected because Magento is responsible for classification and needs raw landing/referrer context.

### Initial SPA Landing Only

Keep capture inside the existing synchronization action during module initialization. Do not add `router.afterEach`. Acquisition context is the URL/referrer that brought the visitor into the SPA; subsequent client-side navigation is internal.

Alternative considered: capture every route change. Rejected because it would treat internal SPA movements as acquisition events and add unnecessary dedupe complexity.

### Coarse Acquisition Gate for Last Touch

Use a boolean gate to decide whether the initial landing is meaningful enough to replace last touch. The gate checks only:

- Presence of `utm_source` or `utm_medium`.
- Presence of configured click-id keys such as `gclid`, `gbraid`, `wbraid`, `dclid`, `gad_source`, `gad_campaignid`, `msclkid`, `fbclid`, `ttclid`, `li_fat_id`, `twclid`, `sccid`, `epik`, `rdt_cid`, `srsltid`, `irclickid`, `sscid`, and `awc`.
- Presence of a usable external referrer whose host is not the current host and is not in the configured ignore host list.

Sibling storefront domains should remain valid acquisition referrers unless explicitly configured as ignored. Payment gateway, payment wallet, and auth return hosts should be ignored so checkout bounces do not become attribution touches. The gate is not classification; Magento still classifies the submitted raw payload.

Alternative considered: require `utm_source` for last touch updates. Rejected because click IDs and external referrers are meaningful raw acquisition signals even when UTMs are absent.

### First and Last Touch Lifecycle

If no unexpired first touch exists, store the captured raw touch as both first touch and last touch. If first touch already exists, preserve it permanently within retention. Last touch updates only when the captured initial landing has a coarse acquisition signal and differs from the current last touch. Direct landings after first touch do not overwrite last touch.

Alternative considered: replace a direct first touch with a later meaningful acquisition signal inside an initialization window. Rejected for this iteration because direct first touch is acceptable.

### Sensitive Query Filtering

Raw query capture uses a denylist for sensitive and operational keys. The denylist should cover known auth, checkout, order, redirect, email, customer, media, and internal customization parameters, and remain configurable for follow-up additions. The filter is applied before persistence and before submission.

Alternative considered: submit all query parameters verbatim. Rejected because this storefront uses query parameters for tokens, emails, order identifiers, image URLs, and other values Magento classification does not need.

### Magento Reporting Model

Keep the existing report behavior. `cart-created` and `cart-connected` dispatch the traffic attribution report action. The report action sends first touch if unsent, then sends last touch if unsent and different from first touch. Each touch is submitted as a separate POST request to `carts/traffic-attributions?token={{token}}&cartId={{cartId}}` through `TaskQueue`, with body `{ request: <raw touch payload> }`. The payload does not include `session_id` or a touch type field.

Alternative considered: send `{ first_touch_raw, last_touch_raw }` in one request. Rejected because the current separate-request endpoint model is explicitly acceptable.

### Non-Blocking Reporting and In-Flight De-duplication

Attribution reporting remains non-blocking. Failed requests log an error and leave the touch sent flag unset. A module-level in-flight promise prevents duplicate report executions while a previous report is still running, and the lock is cleared when the report settles.

Alternative considered: make cart or checkout wait for attribution submission success. Rejected because attribution must not break order placement or cart synchronization.

### SSR Cache Query Handling

Attribution-only query parameters should be included in SSR ignored query key handling when they should not affect rendered page content. Functional query parameters should not be newly ignored unless they are already intentionally ignored by existing cache rules.

Alternative considered: leave all new click-id keys in cache keys. Rejected because campaign/click identifiers would fragment cached pages without changing rendered content.

## Risks / Trade-offs

- Sensitive query values may be missed by the initial denylist -> Start with known auth, checkout, order, redirect, email, customer, media, and internal keys; keep the list configurable for fast additions.
- Local storage is best-effort and may be evicted by browser privacy controls -> Accept for this iteration because server source-of-truth starts only after quote creation.
- Direct first touch can remain first touch even if a later paid touch occurs before quote creation -> Accepted business trade-off for this iteration.
- Global `isSent` can suppress submission to a future quote after a cart changes -> Accepted for now per scope; revisit if attribution must survive quote replacement accurately.
- Boot-only capture misses acquisition parameters introduced after SPA initialization -> Accepted because internal SPA navigation is not considered acquisition context for this storefront.

## Migration Plan

1. Add or keep the traffic attribution module registration, namespaced Vuex store, storage synchronization, and cart event listeners.
2. Add the raw touch data model, raw capture helpers, query filtering, and acquisition signal helper.
3. Implement first/last touch lifecycle and expiration handling in Vuex actions and mutations.
4. Implement non-blocking first/last Magento submission through `TaskQueue`, including sent-flag persistence and in-flight de-duplication.
5. Expand attribution configuration and SSR ignored query keys as needed.
6. Verify with focused tests around capture, filtering, acquisition gating, persistence, expiration, reporting order, duplicate suppression, and failure behavior.

Because the feature has not been deployed, there is no existing production data contract to preserve. Rollback is low risk: the module remains isolated. Reverting the module and config changes leaves cart and checkout flows unaffected.

## Open Questions

- None for this iteration.

## Implementation Assumptions

- Keep the existing `StorageManager`-scoped first/last touch keys rather than renaming to literal `bd_first_touch` and `bd_last_touch`.
- Start with a conservative sensitive query denylist covering known auth, checkout, order, redirect, email, customer, media, and internal customization keys; keep the list configurable for follow-up additions.
