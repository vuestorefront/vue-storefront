## Why

Landing pages can promote a coupon before the customer's cart meets that coupon's conditions. Today those offers are not actionable, so customers must remember and manually re-enter the code after adding an eligible product, losing a conversion opportunity.

## What Changes

- Make coupon offers configured in Storyblok landing-page content actionable through the existing cart coupon application flow.
- Add a dedicated Storyblok coupon-offer component that shares a reusable coupon item component with the existing cart-line offer.
- Extend the existing cart module to save a selected Storyblok coupon as pending when no server cart exists, and clearly notify the customer that it was saved rather than applied.
- Apply the pending coupon through the existing cart coupon flow after the cart is created or connected, whether that happens while adding a product or during login.
- Preserve the cart-line coupon offer's existing single-coupon and cart-operation safeguards for Storyblok coupon offers.

## Capabilities

### New Capabilities

- `storyblok-coupon-offers`: Let Storyblok landing-page coupon offers follow the existing cart coupon flow, saving a selection until a server cart is created or connected and then applying it.

### Modified Capabilities

<!-- None. The existing cart-line coupon-offers capability remains unchanged. -->

## Impact

- A dedicated Storyblok coupon-offer renderer, its CMS data interface, and a shared coupon item component in `src/themes/petsies-capybara/components/storyblok` and `components/molecules`.
- The existing core cart Vuex state, actions, mutations, getters, and cart storage integration.
- Customer notifications and translations.
