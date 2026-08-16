## Context

See `proposal.md` for motivation. The cart recovery page currently builds one shared Vuex action payload from route path parameters and reuses it if the recovery request must be retried after a 401 response. The Budsies Vuex action owns the TaskQueue request URL for the Magento recovery endpoint. SSR caches the page shell by URL after removing configured query keys.

The Magento endpoint already accepts an optional boolean `applyPromoCode` parameter and defaults it to `false`, so omission is the compatibility path.

## Goals / Non-Goals

**Goals:**

- Carry the optional route query value through the existing page-to-Vuex-to-TaskQueue flow.
- Preserve the value across the existing recovery retry.
- Keep URLs with different `applyPromoCode` values from creating distinct SSR page-shell cache entries.
- Cover parameter forwarding, omission, retry reuse, and cache-key normalization.

**Non-Goals:**

- Applying or removing coupons through the storefront cart coupon workflow.
- Changing Magento's recovery API contract or default behavior.
- Changing recovery authentication, cart synchronization, totals synchronization, or navigation.
- Generalizing request-query construction across unrelated Budsies actions.

## Decisions

### Read the parameter at the cart recovery page boundary

The page will read `applyPromoCode` from the current Vue Router query and add it to the existing recovery payload only when present. Building the payload once keeps the same value for both the initial request and the existing authorization retry.

Alternative considered: read the router directly inside the Vuex action. This would couple a request-owning store action to navigation state and make direct action calls less explicit.

### Serialize the optional value in the Budsies recovery action

The Vuex action will append `applyPromoCode` to the recovery endpoint query only when the payload supplies it. The value will be URL encoded at the output boundary. Omitting the parameter preserves the backend's existing `false` default.

Alternative considered: always send `applyPromoCode=false`. Omission better preserves the existing wire request and leaves default ownership with the backend.

### Treat coupon application as backend recovery behavior

The storefront will not dispatch its coupon activation workflow. It only forwards the recovery instruction and then follows the existing recovered-cart token, pull, and totals flow.

Alternative considered: apply a coupon after restoring the cart. The recovery URL does not carry a coupon code, and Magento owns the recovered quote and its promo-code semantics.

### Ignore `applyPromoCode` during SSR cache-key generation

`applyPromoCode` will be added to the existing ignored query-key list. The page's rendered shell does not depend on the parameter; the browser router still retains it for the mounted recovery flow.

Alternative considered: leave it in the cache key. That would create extra cache entries without producing different SSR HTML.

## Risks / Trade-offs

- [Malformed or repeated query values could reach the API] → Forward only the scalar route-query value expected by the generated recovery links and cover the supported `true` value; backend request validation remains authoritative.
- [Manual URL interpolation can mishandle reserved characters] → Encode the forwarded value without changing the existing token placeholder behavior.
- [Ignoring the parameter in SSR caching could be unsafe if server-rendered output later depends on it] → Keep regression coverage focused on the current client-only behavior and revisit the ignore rule if the page begins rendering parameter-dependent content.

## Migration Plan

Deploy the storefront change after or alongside the compatible Magento endpoint. Existing recovery URLs remain unchanged because the new parameter is optional. Rollback consists of reverting the storefront forwarding and ignored-key additions; recovery links without the parameter continue to work throughout.
