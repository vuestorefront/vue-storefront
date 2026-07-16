## Why

The shared text-directive parser recognizes `priceValue`, but the promotion-platform countdown banner does not render it and silently replaces it with an empty string. Banner content needs the same fixed base-currency price behavior already available in Storyblok rich text so campaign authors can safely use the directive in countdown descriptions.

## What Changes

- Render `{{ priceValue(<number>) }}` directives in promotion-platform countdown banner descriptions.
- Convert the fixed USD/base-currency amount with the storefront's active exchange rate and format it with the active currency symbol.
- Refresh the rendered banner description when the active currency or exchange rate changes.
- Preserve existing banner handling for plain text, product prices, and ordered-plushies statistics.
- Add focused automated coverage for fixed-price rendering and currency reactivity in the banner.

## Capabilities

### New Capabilities

- `promotion-banner-price-value-directive`: Defines fixed base-currency price rendering and currency reactivity for promotion-platform countdown banner descriptions.

### Modified Capabilities

None.

## Impact

- Affects `src/modules/promotion-platform/components/Banner.vue` and its unit-test coverage.
- Reuses the existing `priceValue` directive model from `useTextDirectives` and existing currency-module getters.
- Does not change directive syntax, CMS APIs, Magento pricing, checkout totals, or exchange-rate sources.
