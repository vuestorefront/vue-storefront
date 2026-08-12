# cart-line-coupon-offers Specification

## Purpose

Defines configurable coupon offers shown and applied directly from eligible cart items.

## Requirements

### Requirement: Configured cart line coupon offers
The system SHALL allow cart line coupon offers to be configured by coupon code, offer button text, and eligible product SKU list.

#### Scenario: Eligible cart line resolves a configured offer
- **WHEN** a detailed cart item matches a configured offer by `parentSku` or, when no parent SKU exists, by `sku`
- **THEN** the system MUST resolve the configured coupon code and button text for that cart item

#### Scenario: Invalid or unmatched mapping does not create an offer
- **WHEN** a cart item does not match any configured offer or a mapping is missing required fields
- **THEN** the system MUST NOT expose a cart line coupon offer for that item

### Requirement: Detailed cart shows inline coupon offers for eligible items
The detailed cart SHALL render an inline coupon offer beneath each eligible cart line item.

#### Scenario: Eligible cart item shows coupon details
- **WHEN** the detailed cart renders an item with a resolved cart line coupon offer
- **THEN** the cart page MUST show the configured promotional text, the coupon code, and an action to apply the coupon directly from that line item

#### Scenario: Ineligible cart item shows no cart coupon offer
- **WHEN** the detailed cart renders an item without a resolved cart line coupon offer
- **THEN** the cart page MUST omit the inline coupon offer for that item

### Requirement: Cart line coupon application reflects coupon state
The cart page SHALL apply configured cart line coupons through the existing cart coupon workflow and reflect the resulting coupon state in the inline offer.

#### Scenario: Customer applies an eligible coupon from the cart line
- **WHEN** no coupon is currently applied and the customer applies a cart line coupon offer
- **THEN** the system MUST dispatch the existing cart coupon application flow for the mapped coupon code
- **THEN** the cart page MUST show an applying state during processing and an applied state after successful completion

#### Scenario: Another coupon is already active
- **WHEN** a different coupon is already applied to the cart for an eligible cart line item
- **THEN** the inline cart coupon offer MUST show that another coupon is already applied
- **THEN** the cart line action MUST remain unavailable until the active coupon is removed

#### Scenario: The same coupon is already active
- **WHEN** the coupon resolved for a cart line item is already applied to the cart
- **THEN** the inline cart coupon offer MUST show the applied state for that item

### Requirement: Cart coupon interactions are blocked during conflicting cart operations
The cart page SHALL disable coupon application and removal controls while add-to-cart, cart sync, or coupon processing operations are active.

#### Scenario: Cart mutation blocks coupon interactions
- **WHEN** the cart is adding an item, synchronizing the cart, or processing a coupon change
- **THEN** the inline cart coupon apply action MUST be disabled
- **THEN** the cart promo code apply control and cart coupon removal control MUST also be disabled

#### Scenario: Coupon interactions resume after cart becomes idle
- **WHEN** add-to-cart, cart sync, and coupon processing operations have all completed
- **THEN** eligible cart coupon apply and remove controls MUST become available again according to their normal coupon state
