## Context

Storyblok rich text currently supports text directives through `useTextDirectives`, with rendering handled by `TextComponent.vue`. Product price directives load product data when needed and render inline price components; `orderedPlushiesCount` loads a metric value. Fixed CMS amounts are not covered because every price directive currently depends on a product SKU.

The storefront already has a currency module that stores the active currency and exchange rates, and existing localized display logic reuses those values. Fixed rich-text amounts should use the same source so CMS content stays consistent with other localized storefront price displays.

## Goals / Non-Goals

**Goals:**
- Add `{{ priceValue(<number>) }}` as an inline Storyblok rich-text directive for fixed base-currency amounts.
- Convert the fixed USD/base amount through the existing active currency and exchange-rate getters.
- Keep conversion display-only and reactive when the selected currency changes.
- Preserve rich-text styling by rendering the directive through the existing text-part component flow.
- Handle malformed `priceValue` values without breaking the entire rich-text block.
- Preserve existing `productPrice`, `productSpecificPrice`, and `orderedPlushiesCount` behavior.

**Non-Goals:**
- Changing checkout, order totals, payment currency, or Magento pricing behavior.
- Introducing a new exchange-rate source, cache, API endpoint, or TaskQueue call.
- Reworking the broader Storyblok rich-text renderer.
- Changing the syntax or behavior of existing directives.

## Decisions

1. Extend the shared directive model with a `PRICE_VALUE` directive.

   `useTextDirectives` will recognize `priceValue` and parse its first parameter as a finite number. The parsed directive will contain only the original text and numeric amount, so it will not participate in product SKU discovery or data loading.

   Alternative considered: replace directives with plain formatted text during parsing. That would make parsing depend on currency state and would not react cleanly to later currency changes.

2. Render fixed amounts with a dedicated inline rich-text component.

   `TextComponent.vue` will map the new directive to a small component, for example `FixedPriceValueComponent.vue`, and pass the parsed base amount as a prop. The component will format `amount * exchangeRate` with `PriceHelper.formatPrice` and the active currency symbol.

   Alternative considered: reuse `SimplePriceComponent.vue`. That component is product-based and reads product prices, so extending it would blur responsibilities and risk changing product price behavior.

3. Reuse the existing currency module as the single currency source.

   The fixed price component will read `GET_ACTIVE_CURRENCY` and `GET_CURRENCY_EXCHANGE_RATE`. It will not fetch rates, write currency state, or introduce separate caching.

   Alternative considered: reading localized product-price dictionaries. Those dictionaries are product-centered and do not represent arbitrary fixed CMS values.

4. Preserve rich-text marks through the existing text-part wrapper.

   The processed text part for `priceValue` will reuse the same `classes` and `styles` values applied to surrounding text parts. The price component itself should render a simple inline `span` without its own decorative price styling.

   Alternative considered: returning a styled string from the parser. That would lose the current component-based handling and make rich-text mark preservation harder.

5. Make malformed `priceValue` input fail locally.

   Invalid or non-finite values such as `{{ priceValue(foo) }}` will be treated as literal text or an empty harmless text part, and the rest of the rich-text block will continue rendering. Existing directive validation should remain unchanged unless needed to isolate failures to the malformed directive.

   Alternative considered: throw an error for malformed fixed prices. That matches some current parser behavior, but it would violate the acceptance criterion that malformed values must not break the full block.

## Risks / Trade-offs

- Current parser behavior throws for unknown directive syntax. -> Keep `priceValue` in the same directive parsing flow so existing parser semantics do not change.
- Exchange rates may be unavailable during early client execution. -> Fall back to rate `1`, matching the existing currency getter behavior, and update when rates are present.
- Rounding and symbol placement must match current storefront formatting. -> Use `PriceHelper.formatPrice` rather than adding directive-specific formatting.
- Rich-text styles may not apply if the price component introduces nested styled elements. -> Render a minimal inline `span` and keep classes/styles on the existing dynamic component wrapper.
