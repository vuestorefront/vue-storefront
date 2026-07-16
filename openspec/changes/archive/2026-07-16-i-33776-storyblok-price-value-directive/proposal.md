## Why

Storyblok content editors can render product-derived prices in rich text, but they cannot render fixed commercial amounts such as shipping fees, promotion thresholds, or service charges in the customer's selected storefront currency. This leaves hardcoded USD values in CMS content even though the storefront already has a selected-currency display flow.

## What Changes

- Add a `priceValue` rich-text directive that accepts a fixed numeric base-currency amount, for example `{{ priceValue(29.99) }}`.
- Treat the directive value as a USD/base-currency amount and display it with the active storefront currency's exchange rate and symbol.
- Keep the directive inline so surrounding Storyblok rich-text marks, classes, and styles continue to apply where possible.
- Ensure the rendered value updates when the active storefront currency changes.
- Ignore malformed or non-numeric `priceValue` values without breaking the rest of the rich-text block.
- Preserve the current behavior of `productPrice`, `productSpecificPrice`, and `orderedPlushiesCount` directives.

## Capabilities

### New Capabilities
- `storyblok-fixed-price-directive`: Storyblok rich text can render fixed base-currency numeric amounts in the active storefront-selected currency.

### Modified Capabilities

None.

## Impact

- Affects the shared text directive parser in `src/modules/shared/composables/use-text-directives.ts`.
- Affects Storyblok rich-text rendering components under `src/modules/vsf-storyblok-module/components/global/rich-text/`.
- Reuses the existing currency module getters for active currency and exchange rate; no new API, checkout behavior, or exchange-rate cache is introduced.
- Requires focused tests or verification around directive parsing, malformed inputs, currency conversion, live currency changes, SSR/client rendering, and existing directive regressions.
