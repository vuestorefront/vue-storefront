## 1. Banner Directive Rendering

- [x] 1.1 Add active exchange-rate state and established currency/rate fallbacks to `Banner.vue` using the currency-module getters.
- [x] 1.2 Handle `DirectiveType.PRICE_VALUE` before product-dependent directive lookup and format the converted amount with `PriceHelper`.
- [x] 1.3 Reprocess the current banner description when the localized product-price dictionary, active currency, or active exchange rate changes.

## 2. Banner Integration Tests

- [x] 2.1 Add a focused promotion-platform Banner unit-test setup with mocked campaign, currency, product-price, and statistic store dependencies.
- [x] 2.2 Verify decimal and integer `priceValue` directives render with the base currency and do not request product data.
- [x] 2.3 Verify non-base currency conversion and reactive output updates after active currency or exchange-rate changes.
- [x] 2.4 Verify surrounding banner text or HTML remains intact and existing product-price and statistic directives retain their behavior.

## 3. Verification

- [x] 3.1 Run the focused Banner unit tests and resolve any failures.
- [x] 3.2 Run non-mutating ESLint and an appropriate TypeScript or production build check for the changed files.
