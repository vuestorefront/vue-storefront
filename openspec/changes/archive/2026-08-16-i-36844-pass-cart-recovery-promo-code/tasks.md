## 1. Cart Recovery Request

- [x] 1.1 Read the optional scalar `applyPromoCode` value from the cart recovery route query and include it in the shared recovery action payload when present.
- [x] 1.2 Update the Budsies `loadRecoverableCart` action to URL-encode and append the optional `applyPromoCode` value while preserving the existing request URL when it is absent.
- [x] 1.3 Add focused regression coverage proving the value reaches the initial and authorization-retry recovery requests and remains omitted for existing links.

## 2. SSR Cache Normalization

- [x] 2.1 Add `applyPromoCode` to the SSR ignored query-key list.
- [x] 2.2 Add regression coverage proving otherwise identical recovery URLs share a cache key regardless of `applyPromoCode` while unrelated query parameters remain significant.

## 3. Validation

- [x] 3.1 Run the focused unit tests for cart recovery request construction and SSR cache-key normalization.
- [x] 3.2 Run the applicable TypeScript and lint checks for the changed storefront files and document any environment limitations.
