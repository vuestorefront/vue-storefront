## 1. Directive Parsing

- [x] 1.1 Add a `PRICE_VALUE` directive type and TypeScript interface for fixed numeric base-currency amounts in `use-text-directives.ts`.
- [x] 1.2 Parse `priceValue(<number>)` into a directive containing the original text and finite numeric amount.
- [x] 1.3 Ensure `priceValue` does not contribute product SKUs or trigger product loading.
- [x] 1.4 Handle malformed or non-numeric `priceValue` parameters without throwing an uncaught error for the full rich-text block.
- [x] 1.5 Confirm existing `productPrice`, `productSpecificPrice`, and `orderedPlushiesCount` parsing behavior remains unchanged.

## 2. Rich-Text Rendering

- [x] 2.1 Add an inline fixed price value rich-text component that accepts a base amount prop.
- [x] 2.2 Format the component output with `PriceHelper.formatPrice`.
- [x] 2.3 Read active currency and exchange rate from the existing currency module getters.
- [x] 2.4 Render `amount * exchangeRate` with the active currency symbol.
- [x] 2.5 Fall back to the default currency and rate `1` when currency state is unavailable.

## 3. Renderer Integration

- [x] 3.1 Register the fixed price value component in `TextComponent.vue`.
- [x] 3.2 Map parsed `PRICE_VALUE` text parts to the new component with the parsed base amount prop.
- [x] 3.3 Reuse the existing processed-part classes and styles so surrounding Storyblok rich-text marks are preserved.
- [x] 3.4 Verify surrounding text remains inline before and after `priceValue` output.

## 4. Verification

- [x] 4.1 Add or update tests for decimal and integer `priceValue` values.
- [x] 4.2 Add or update tests for malformed and non-numeric `priceValue` values.
- [x] 4.3 Add or update tests proving `priceValue` uses active currency and exchange rate without a separate cache.
- [x] 4.4 Add or update tests proving currency changes update rendered `priceValue` output without a full reload.
- [x] 4.5 Add or update regression tests for `productPrice`, `productSpecificPrice`, and `orderedPlushiesCount`.
- [x] 4.6 Verify rendering uses active currency state directly without a mount-gated currency switch.
- [x] 4.7 Run the focused test suite and any relevant lint/type checks for changed files.
