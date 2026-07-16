## Context

`useTextDirectives` parses banner descriptions into plain strings and typed directive parts, then calls the banner's renderer after loading any directive-dependent data. Since `priceValue` was added to the shared directive union, `Banner.vue` receives the directive but treats every non-statistic directive as product-dependent. A `priceValue` part has no product SKU, so the current renderer returns an empty string.

Storyblok rich text already establishes the required fixed-price semantics: the directive amount is a USD/base-currency value, display conversion uses `GET_CURRENCY_EXCHANGE_RATE`, and formatting uses the symbol from `GET_ACTIVE_CURRENCY`. Banner rendering differs because it produces one HTML string rather than reactive child components.

## Goals / Non-Goals

**Goals:**

- Render fixed `priceValue` amounts in promotion-platform countdown banner descriptions.
- Match the existing Storyblok conversion and formatting semantics.
- Keep banner output current when active currency state or exchange rates change.
- Make the non-product directive branch explicit before product lookup.
- Preserve current behavior for all existing banner directive types.

**Non-Goals:**

- Changing shared directive syntax or parsing behavior.
- Changing the Storyblok fixed-price renderer.
- Adding a currency source, fetching rates from the banner, or changing Magento/catalog pricing.
- Refactoring the Banner from string-based `v-html` rendering to dynamic Vue components.
- Expanding malformed `priceValue` validation beyond the current shared parser contract.

## Decisions

1. Handle `PRICE_VALUE` directly in `Banner.processTextPart` before product-dependent processing.

   The renderer will multiply the directive amount by the active exchange rate and pass the result plus the active currency symbol to `PriceHelper.formatPrice`. This mirrors `FixedPriceValueComponent.vue` while retaining the Banner's existing string output.

   Alternative considered: render `FixedPriceValueComponent` inside the Banner. The Banner currently concatenates directive results into an HTML string rendered with `v-html`; introducing dynamic child components would require a broader rendering rewrite for no additional fixed-price behavior.

2. Reuse currency-module getters as reactive dependencies.

   `Banner.vue` will expose computed active-currency and exchange-rate values from `GET_ACTIVE_CURRENCY` and `GET_CURRENCY_EXCHANGE_RATE`, using the established default currency and rate `1` fallbacks. The Banner will not fetch, cache, or mutate currency data.

   Alternative considered: reuse the localized product-price dictionary exchange rate. That dictionary is product-centered and does not represent arbitrary fixed CMS amounts.

3. Reprocess the description when any rendering dependency changes.

   The existing watcher will cover the localized product-price dictionary, active currency, and active exchange rate. A single callback will rerun `processDirectivesInText` with the current banner description so both product-dependent and fixed-price text remain synchronized.

   Alternative considered: format `priceValue` once during initial processing. That would leave fixed amounts stale when a customer switches currency or when rates become available after initial rendering.

4. Verify through focused Banner integration tests.

   Tests will exercise parsing through `useTextDirectives`, Banner string rendering, base-currency conversion, surrounding text, and reactive currency changes. This provides coverage at the consumer boundary where the omission occurred rather than retesting only the shared parser.

## Risks / Trade-offs

- Watching currency and exchange-rate state can trigger description processing near the same time as localized product-price updates. -> Watch the dependencies together so Vue batches changes into the same render cycle where possible.
- The Banner and Storyblok renderers will contain similar formatting expressions. -> Keep the small expression local for now because their rendering models differ; both continue to use the same currency getters and `PriceHelper` contract.
- Malformed numeric input is not fully validated by the existing shared parser. -> Keep this change scoped to Banner support for valid parsed values and track shared parser hardening separately.
- String rendering cannot provide the specialized promotional markup used by Storyblok price components. -> `priceValue` requires only formatted inline text, which matches Banner's existing rendering model.

## Migration Plan

No data migration or configuration change is required. Deploy the Banner renderer and tests normally; existing content remains compatible. Rollback consists of reverting the Banner integration, after which `priceValue` directives in banner descriptions return to being omitted.

## Open Questions

None.
