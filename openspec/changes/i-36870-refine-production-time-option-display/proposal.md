## Why

The production-time selector currently prioritizes the fastest turnaround in its presentation and does not reliably establish Standard as the initial choice. Customers need a clear default, a consistent progression from Standard to faster upgrades, and concise delivery information for each available option.

## What Changes

- Default a newly configured product's production-time selection to Standard only when no selection already exists.
- Keep an existing Rush or Super Rush selection intact while a product is edited or reloaded.
- Present production-time options by longest-to-shortest configured turnaround in every layout, yielding Standard, Rush, Super Rush for the configured options, while supporting products that do not offer Super Rush.
- Change each option card to show a bold duration-first label and a muted target-ship-date line derived from the option's configured turnaround time.
- Preserve current pricing, availability, slot, sold-out, and checkout-selection behavior.

## Capabilities

### New Capabilities

- `production-time-option-presentation`: Customer-facing default selection, ordering, and date hierarchy for production-time options.

### Modified Capabilities

- None.

## Impact

- Affects the customization-system production-time timeline widget and option card in the Petsies Capybara theme.
- Uses existing configured rush-addon turnaround times, option values, prices, and availability data; no backend API, pricing, inventory, or turnaround-calculation changes are required.
