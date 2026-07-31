## Context

Production-time values are assembled by `updateProductProductionTimeCustomizationData`, which injects the synthetic Standard option. The generic default-value composable only applies an option marked as a default when the customization has no current value, so the injected Standard option currently does not establish an initial selection. The timeline widget also sorts every option by turnaround time, which presents the fastest choice first, while each card renders the ship date above the duration-and-name text.

The change is confined to the customer-facing customization flow. Existing rush-addon data supplies configured turnaround time, price, availability, and slots; cart and checkout continue to consume the selected option value.

## Goals / Non-Goals

**Goals:**

- Select Standard for an empty production-time selection without overwriting a stored or customer-selected upgrade.
- Render options in Standard, Rush, Super Rush order without requiring all three choices.
- Present each option's existing calculated duration and target ship date in the requested visual hierarchy.

**Non-Goals:**

- Changing rush prices, slot allocation, sold-out rules, or turnaround calculations.
- Adding or changing backend APIs, persisted product data, or checkout payload formats.

## Decisions

### Mark the generated Standard option as the production-time default

Set the generated Standard value as the default when the product's production-time customization is prepared. This reuses `useCustomizationsOptionsDefaultValue`, which only writes a default when no scalar or non-empty array selection exists.

An alternative is to emit Standard from `ProductionTimeTimelineWidget` when its `value` prop is empty. That would put business state initialization in a presentational component, risks repeated emissions during hydration or reloads, and would bypass the shared default-selection behavior.

### Reverse turnaround-time ordering in the timeline widget

Sort the available production-time options by configured turnaround time from longest to shortest, reversing the current fastest-to-slowest ordering. For the configured production-time options, this yields Standard, Rush, and Super Rush in that order. Retain the existing stable fallback for equal or unavailable turnaround values, and use the resulting single sequence in every responsive layout.

Calculate the fastest available option independently from the display sequence, using the shortest available configured turnaround time. This preserves the fastest-available indication after the display sort is reversed.

An alternative is to assign each option a fixed semantic display priority. That would duplicate information already represented by the configured turnaround values and could become inaccurate when those values change.

### Reverse the card's information hierarchy while retaining its derived values

Keep duration and ship-date computation based on each card's `turnaroundTime`, but render the duration-plus-option-name line as the bold title and the calculated target ship date as the muted secondary line. Add or update localization keys for the duration-first label as part of the component change. Price, slot, sold-out, icon, and fastest-available UI remain independent card fields.

An alternative is to pass preformatted strings from the timeline widget. Keeping the derivation in the card preserves a single presentation owner and ensures each card updates directly when its configured turnaround value changes.

## Risks / Trade-offs

- [Equal or unavailable turnaround values can make ordering ambiguous] → Retain the existing stable fallback order for those values.
- [Default initialization might replace an edited-cart selection] → Rely on the existing default-value guard, which preserves populated values.
- [A fixed example label could diverge from configured turnaround data] → Derive both display values from `turnaroundTime`.
- [Responsive rendering could affect option scanning] → Use the same source ordering in every layout and validate that all available controls remain visible and selectable.
