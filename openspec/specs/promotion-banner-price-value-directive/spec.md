## Purpose

Define fixed base-currency price rendering and currency reactivity for promotion-platform countdown banner descriptions.

## Requirements

### Requirement: Fixed base-currency price directive in countdown banners

The system SHALL render a `priceValue` text directive in a promotion-platform countdown banner description as formatted inline price text.

#### Scenario: Decimal amount renders

- **WHEN** a countdown banner description contains `{{ priceValue(29.99) }}`
- **THEN** the rendered banner description includes the formatted price for the numeric amount `29.99`

#### Scenario: Integer amount renders

- **WHEN** a countdown banner description contains `{{ priceValue(30) }}`
- **THEN** the rendered banner description includes the formatted price for the numeric amount `30`

#### Scenario: Product data is not required

- **WHEN** a countdown banner description contains `{{ priceValue(29.99) }}` without a product SKU
- **THEN** the banner renders the directive without requesting product data for that directive

### Requirement: Active currency conversion

The system SHALL treat a countdown banner `priceValue` amount as a USD/base-currency value and display it using the storefront's active currency and exchange rate.

#### Scenario: Base currency selected

- **WHEN** USD is active with exchange rate `1` and the banner contains `{{ priceValue(29.99) }}`
- **THEN** the banner displays `29.99` formatted with the USD currency symbol

#### Scenario: Non-base currency selected

- **WHEN** a non-USD currency with an available exchange rate is active and the banner contains `{{ priceValue(29.99) }}`
- **THEN** the banner displays `29.99` multiplied by that exchange rate and formatted with the active currency symbol

#### Scenario: Currency state is initially unavailable

- **WHEN** the banner processes a `priceValue` directive before selected currency state or an exchange rate is available
- **THEN** it uses the storefront default currency and an exchange rate of `1`

### Requirement: Reactive fixed-price banner output

The system SHALL refresh a rendered countdown banner `priceValue` when the active currency or exchange rate changes.

#### Scenario: Customer changes currency

- **WHEN** a countdown banner containing `{{ priceValue(29.99) }}` is rendered and the customer selects another currency
- **THEN** the banner updates the directive output to the new active currency without a full page reload

#### Scenario: Exchange rates become available

- **WHEN** a countdown banner fixed price was rendered with the fallback exchange rate and the active exchange rate later becomes available
- **THEN** the banner updates the directive output using the available exchange rate

### Requirement: Banner description composition remains intact

The system MUST preserve surrounding banner description content and existing directive behavior when rendering `priceValue`.

#### Scenario: Surrounding content remains in place

- **WHEN** text or HTML appears before and after a `priceValue` directive in a countdown banner description
- **THEN** the formatted fixed price appears between that surrounding content without removing it

#### Scenario: Existing product price directive still renders

- **WHEN** a countdown banner description contains an existing `productPrice` or `productSpecificPrice` directive
- **THEN** the directive continues rendering according to its existing Banner behavior

#### Scenario: Existing statistic directive still renders

- **WHEN** a countdown banner description contains an existing `orderedPlushiesCount` directive
- **THEN** the directive continues rendering according to its existing Banner behavior
