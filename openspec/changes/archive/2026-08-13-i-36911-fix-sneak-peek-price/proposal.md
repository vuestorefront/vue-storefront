## Why

After an Order History reload, an alteration bundle can be loaded without the products referenced by its option values. The alteration form then uses a bundle option's stored fallback price instead of the referenced product's localized price, which can display an incorrect Sneak Peek amount to customers.

## What Changes

- Load the associated option-value products needed to price an alteration bundle before its Order History form is presented.
- Apply the same dependency-loading contract to the dedicated single order-item customize-upgrades flow.
- Retain the shared option-value price fallback and all cart, checkout, and order-total behavior.

## Capabilities

### New Capabilities

- `order-history-alteration-product-pricing`: Correct localized pricing of visible alteration-bundle option values in Order History and the single-item upgrade flow.

### Modified Capabilities

- None.

## Impact

- Affects the Petsies Capybara alteration-product loaders used by Order History and the customize-upgrades route.
- Uses the existing catalog associated-product prefetch behavior and product cache; no backend API, persisted order data, checkout payload, cart calculation, or shared price-resolver contract changes are required.
