## ADDED Requirements

### Requirement: Alteration-bundle option prices use loaded localized product prices
The Petsies storefront SHALL load and register products linked by an alteration bundle's visible option values whenever it loads that alteration bundle for an Order History upgrade form. After the loader settles, the form SHALL resolve each linked option value's displayed amount from its associated product's localized price when that price is available, rather than from the bundle option's fallback price.

#### Scenario: Order History loads an uncached linked option-value product
- **WHEN** an authenticated customer opens Order History for an order whose alteration bundle has a visible option value with an associated product absent from the product cache
- **THEN** the alteration-bundle load registers that associated product by its SKU in the product cache
- **AND** the option value displays the associated product's localized amount and currency

#### Scenario: Order History is reloaded
- **WHEN** the customer reloads the affected Order History page and alteration-product loading settles
- **THEN** the linked option-value product is available in the product cache
- **AND** the visible option amount again matches that product's localized price

### Requirement: Every alteration-product loading entry point has price dependencies
The Order History list loader and the single order-item customize-upgrades loader SHALL both load the associated products of their alteration bundles. Neither entry point SHALL depend on an option value's fallback price when its associated product and localized price are available.

#### Scenario: Order History list renders an alteration form
- **WHEN** the Order History list loader retrieves one or more alteration bundles for visible order items
- **THEN** it loads the associated bundle products required by their visible option values

#### Scenario: Single-item customize-upgrades route loads an alteration form
- **WHEN** the single order-item customize-upgrades route retrieves an alteration bundle
- **THEN** it loads the associated bundle products required by that form's visible option values
- **AND** the form displays each available linked option value using its localized product price

### Requirement: Existing price resilience and order flows are preserved
The storefront SHALL retain the shared option-value price fallback for contexts where an associated product or its localized price is unavailable. The alteration-product dependency load SHALL NOT modify cart pricing inputs, checkout totals, resulting order totals, saved customization selections, or submission behavior.

#### Scenario: Associated product price is unavailable
- **WHEN** an option value has no associated product in the product cache or its associated product has no localized price
- **THEN** the existing option-value fallback behavior remains available

#### Scenario: Customer proceeds with an upgrade configuration
- **WHEN** a customer views, selects, or submits an alteration upgrade after its price dependencies load
- **THEN** cart, checkout, and resulting order totals retain their existing behavior
