## ADDED Requirements

### Requirement: Fixed base-currency price directive
The system SHALL support a Storyblok rich-text directive named `priceValue` that accepts one fixed numeric amount parameter and renders it as inline price text.

#### Scenario: Decimal amount renders
- **WHEN** a Storyblok rich-text text node contains `{{ priceValue(29.99) }}`
- **THEN** the rendered rich text includes an inline formatted price for the numeric amount `29.99`

#### Scenario: Integer amount renders
- **WHEN** a Storyblok rich-text text node contains `{{ priceValue(30) }}`
- **THEN** the rendered rich text includes an inline formatted price for the numeric amount `30`

#### Scenario: Product SKU is not required
- **WHEN** a Storyblok rich-text text node contains `{{ priceValue(29.99) }}` and no product SKU is provided
- **THEN** the directive renders without requesting product data for that directive

### Requirement: Active currency conversion
The system SHALL treat `priceValue` amounts as USD/base-currency values and display them using the active storefront-selected currency symbol and exchange rate from the existing currency flow.

#### Scenario: USD selected
- **WHEN** the active storefront currency is USD and a Storyblok rich-text text node contains `{{ priceValue(29.99) }}`
- **THEN** the directive displays `29.99` formatted with the USD currency symbol

#### Scenario: Non-USD selected
- **WHEN** the active storefront currency is a non-USD currency with an exchange rate available and a Storyblok rich-text text node contains `{{ priceValue(29.99) }}`
- **THEN** the directive displays `29.99` multiplied by the active exchange rate and formatted with the active currency symbol

#### Scenario: Currency changes after render
- **WHEN** a Storyblok rich-text block containing `{{ priceValue(29.99) }}` is already rendered and the customer changes the selected storefront currency
- **THEN** the directive output updates to the newly active currency without requiring a full page reload

#### Scenario: Existing exchange-rate source is reused
- **WHEN** the directive calculates a converted amount
- **THEN** it uses the same active currency and exchange-rate state used by other localized storefront price displays

### Requirement: Rich-text rendering resilience
The system SHALL render `priceValue` inline with surrounding Storyblok rich text and SHALL prevent malformed `priceValue` values from breaking the full rich-text block.

#### Scenario: Surrounding text remains inline
- **WHEN** a Storyblok rich-text text node contains surrounding text before and after `{{ priceValue(29.99) }}`
- **THEN** the directive output appears inline between the surrounding text

#### Scenario: Surrounding rich-text styling is preserved
- **WHEN** a Storyblok rich-text text node with marks, classes, or text styles contains `{{ priceValue(29.99) }}`
- **THEN** the rendered directive preserves those applicable text marks, classes, or styles in the same manner as existing inline rich-text directive parts

#### Scenario: Malformed value does not break block
- **WHEN** a Storyblok rich-text text node contains a malformed or non-numeric directive such as `{{ priceValue(foo) }}`
- **THEN** the full rich-text block continues rendering without throwing an uncaught directive-rendering error

### Requirement: Existing directive behavior remains unchanged
The system MUST preserve the existing behavior of the `productPrice`, `productSpecificPrice`, and `orderedPlushiesCount` Storyblok rich-text directives.

#### Scenario: Product price directive still renders
- **WHEN** a Storyblok rich-text text node contains an existing `productPrice` directive
- **THEN** the directive continues rendering product price output according to its existing behavior

#### Scenario: Product specific price directive still renders
- **WHEN** a Storyblok rich-text text node contains an existing `productSpecificPrice` directive
- **THEN** the directive continues rendering product-specific regular or special price output according to its existing behavior

#### Scenario: Ordered plushies count directive still renders
- **WHEN** a Storyblok rich-text text node contains an existing `orderedPlushiesCount` directive
- **THEN** the directive continues rendering the ordered plushies count according to its existing behavior

### Requirement: Hydration-safe selected-currency rendering
The system SHALL NOT introduce SSR/client hydration mismatches for Storyblok rich-text blocks containing `priceValue` when the customer's selected storefront currency is non-USD.

#### Scenario: Non-USD selected currency during page open
- **WHEN** a customer opens an SSR-rendered page containing `{{ priceValue(29.99) }}` and the customer's selected storefront currency is non-USD
- **THEN** the client hydrates the rich-text block without a currency-rendering mismatch

#### Scenario: Client currency state becomes available after hydration
- **WHEN** the client has hydrated a Storyblok rich-text block containing `{{ priceValue(29.99) }}` and the active selected currency becomes available or changes
- **THEN** the directive updates to the active selected currency without replacing the full rich-text block
