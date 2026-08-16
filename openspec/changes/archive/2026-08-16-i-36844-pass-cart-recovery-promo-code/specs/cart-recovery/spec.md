## Purpose

Defines how the storefront preserves optional promo-code instructions when restoring a cart while keeping recovery-page SSR caching independent of that client-side instruction.

## ADDED Requirements

### Requirement: Cart recovery forwards the promo-code instruction
The storefront SHALL accept an optional `applyPromoCode` query parameter on a cart recovery URL and MUST forward its value to the cart recovery API request. The storefront MUST NOT apply a coupon through a separate client-side coupon workflow as part of this behavior.

#### Scenario: Recovery link requests promo-code application
- **WHEN** a customer opens a valid cart recovery URL containing `applyPromoCode=true`
- **THEN** the storefront MUST include `applyPromoCode=true` in the cart recovery API request
- **THEN** the existing cart restoration flow MUST continue using the API response

#### Scenario: Recovery link does not request promo-code application
- **WHEN** a customer opens a valid cart recovery URL without `applyPromoCode`
- **THEN** the storefront MUST omit `applyPromoCode` from the cart recovery API request
- **THEN** existing cart recovery behavior MUST remain unchanged

#### Scenario: Recovery request is retried after authorization
- **WHEN** the initial cart recovery API request includes `applyPromoCode` and is retried after an authorization response
- **THEN** the retry MUST forward the same `applyPromoCode` value

### Requirement: Promo-code recovery instructions do not fragment the SSR cache
The SSR cache-key generator SHALL ignore the `applyPromoCode` query parameter because the parameter controls a client-side API request and does not change the rendered cart recovery page shell.

#### Scenario: Recovery URLs differ only by promo-code instruction
- **WHEN** the server generates cache keys for otherwise identical cart recovery URLs whose only difference is the `applyPromoCode` query parameter
- **THEN** the generated cache keys MUST be identical

