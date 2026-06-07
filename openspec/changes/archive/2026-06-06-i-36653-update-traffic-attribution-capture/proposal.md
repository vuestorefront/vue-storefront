## Why

Vue Storefront needs a complete traffic attribution capture capability for issue #36653 so Magento can classify acquisition touches from raw storefront landing data. The storefront must own pre-cart capture and persistence because Magento does not see a visitor until a quote exists, while Magento remains the authoritative place for channel/source classification.

## What Changes

- Add and maintain a client-only `traffic-attribution` Vue Storefront module with a namespaced Vuex store.
- Persist first-touch and last-touch wrappers through the module's `StorageManager` storage collection and keep state synchronized across browser tabs.
- Capture raw attribution data from the initial SPA landing context: clean landing page URL, referrer URL, filtered query parameters, and detection timestamp.
- Preserve the two-touch model: first touch is write-once, and last touch updates only when the initial landing contains a coarse acquisition signal.
- Keep direct landings eligible as first touch and do not replace an existing first touch with later ad, referral, UTM, click-id, or direct touches.
- Use configurable expiration windows while keeping the current first-touch and last-touch defaults.
- Add a coarse acquisition-signal gate based on UTM presence, configured click-id parameter presence, and usable external referrer presence without storefront-side channel/source classification.
- Filter sensitive and operational query parameters before persisting or submitting raw touch payloads.
- Submit first and last touches as separate non-blocking requests to the existing Magento traffic attribution endpoint through `TaskQueue` on existing cart lifecycle events.
- Preserve duplicate suppression, sent-flag persistence, first-before-last reporting order, and in-flight report de-duplication.
- Exclude attribution-only query parameters from SSR cache keys where needed so campaign URLs do not fragment cached pages.

## Capabilities

### New Capabilities

- `traffic-attribution-capture`: Complete Vue Storefront-side traffic attribution capture, persistence, lifecycle, and Magento quote-submission behavior for raw first-touch and last-touch payloads.

### Modified Capabilities

- None.

## Impact

- Affects `src/modules/traffic-attribution` module registration, helpers, types, Vuex store, storage synchronization, cart event listeners, and TaskQueue reporting behavior.
- Affects `src/themes/petsies-capybara/config/modules.ts` for client module registration.
- Affects `config/local.json.template` traffic attribution configuration for retention windows, acquisition signal keys, ignored referrer hosts, and sensitive query exclusions.
- May affect `core/scripts/server.ts` ignored query keys for attribution-related parameters.
- Uses the existing `carts/traffic-attributions` Magento endpoint and does not add checkout-blocking API calls, component-level API calls, or storefront-side classification logic.
