## 1. Module and Store Structure

- [x] 1.1 Register the traffic attribution storefront module from the theme client module list.
- [x] 1.2 Add a namespaced traffic attribution Vuex store with first-touch and last-touch state.
- [x] 1.3 Add synchronous mutations for setting, clearing, and marking first and last touch values as sent.
- [x] 1.4 Add getters for first touch and last touch state.
- [x] 1.5 Ensure SSR execution registers only safe state structure and does not initialize browser-only side effects.

## 2. Data Model and Configuration

- [x] 2.1 Define the touch wrapper with raw attribution payload, `isSent`, `createdAt`, and `expiresAt`.
- [x] 2.2 Define the raw touch payload with `landing_page_url`, optional `referrer_url`, `query_params`, and `detected_at`.
- [x] 2.3 Keep configurable first-touch and last-touch expiration days with the current module defaults.
- [x] 2.4 Replace normalized reportable/raw attribute config usage with acquisition click-id keys, ignored referrer hosts, and sensitive query keys.
- [x] 2.5 Ensure no `session_id`, touch type, storefront channel, or storefront classification fields are part of the raw touch payload.

## 3. Storage and Synchronization

- [x] 3.1 Initialize the traffic attribution storage collection on the client.
- [x] 3.2 Persist set, clear, and sent-flag mutations for first and last touch values.
- [x] 3.3 Load stored first and last touch values during synchronization.
- [x] 3.4 Clear expired stored first and last touch values during synchronization.
- [x] 3.5 Synchronize first and last touch storage events across browser tabs.

## 4. Raw Capture Helpers

- [x] 4.1 Replace route-based normalized UTM extraction with a client-only raw touch builder using the initial browser landing context.
- [x] 4.2 Build `landing_page_url` as origin and pathname without query parameters.
- [x] 4.3 Capture `document.referrer` as `referrer_url` when available.
- [x] 4.4 Normalize landing query parameters for `query_params` while preserving raw attribution values needed by Magento.
- [x] 4.5 Omit configured sensitive and operational query parameters from persisted and submitted raw touches.
- [x] 4.6 Implement touch equality comparison for normalized raw touch payloads without depending on object key order.

## 5. Acquisition Gate and Touch Lifecycle

- [x] 5.1 Implement a coarse acquisition-signal helper for UTM presence, configured click-id presence, and usable external referrer presence.
- [x] 5.2 Treat configured ignored referrer hosts as non-acquisition referrers.
- [x] 5.3 Keep sibling storefront domains eligible as external referrers unless explicitly configured as ignored.
- [x] 5.4 Store first touch and last touch from the same raw payload when first touch is initialized.
- [x] 5.5 Preserve existing first touch for later UTM, click-id, referral, or direct landings.
- [x] 5.6 Update last touch only when first touch already exists, the captured landing has a coarse acquisition signal, and the raw touch differs from current last touch.
- [x] 5.7 Preserve last touch for direct landings after first touch exists.
- [x] 5.8 Keep capture limited to initial SPA synchronization; do not add route-change capture.

## 6. Magento Submission Behavior

- [x] 6.1 Listen for existing `cart-created` and `cart-connected` events and dispatch traffic attribution reporting.
- [x] 6.2 Submit each raw touch through `TaskQueue` to `/carts/traffic-attributions?token={{token}}&cartId={{cartId}}`.
- [x] 6.3 Submit payloads as `{ request: touch }` without `session_id` and without a touch type field.
- [x] 6.4 Submit first touch before last touch when both are eligible.
- [x] 6.5 Suppress duplicate last-touch submission when last touch equals first touch.
- [x] 6.6 Mark sent flags only after successful Magento result code `200` responses.
- [x] 6.7 Preserve non-blocking failure handling so unsuccessful submissions log errors and leave sent flags unset.
- [x] 6.8 Avoid duplicate report executions while a report promise is already in flight.

## 7. SSR Cache Query Handling

- [x] 7.1 Compare current `ignoredQueryKeys` with configured attribution signal keys and add missing attribution-only parameters that should not fragment SSR cache entries.
- [x] 7.2 Keep functional query parameters out of new ignored-query additions unless they are already intentionally ignored by existing cache rules.

## 8. Verification

- [x] 8.1 Add or update focused unit coverage for raw touch building, query filtering, and acquisition-signal detection.
- [x] 8.2 Add or update focused unit coverage for first-touch write-once behavior and last-touch acquisition-gated overwrite behavior.
- [x] 8.3 Add or update focused unit coverage for storage persistence, cross-tab synchronization behavior, and expiration handling.
- [x] 8.4 Add or update focused unit coverage for first/last reporting order, duplicate last-touch suppression, in-flight report de-duplication, and failed submission sent-flag behavior.
- [x] 8.5 Run the relevant project validation commands available for the touched files and record any commands that cannot run in the implementation summary.
