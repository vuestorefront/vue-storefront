## ADDED Requirements

### Requirement: Standard is the initial production-time selection
The storefront SHALL select the Standard production-time option when a production-time customization has no selected value. It MUST NOT replace an existing selected production-time value while a product is edited, restored, or reloaded.

#### Scenario: New product configuration has no production-time value
- **WHEN** the production-time customization is available and its selection is empty
- **THEN** the storefront selects the Standard option

#### Scenario: Existing upgrade selection is restored
- **WHEN** a product is loaded with Rush or Super Rush already selected
- **THEN** the storefront retains that selected option

### Requirement: Production-time upgrades use reverse turnaround order in every layout
The production-time widget SHALL display available named options by configured turnaround time from longest to shortest in every layout. For the configured production-time options, this order is Standard, Rush, and Super Rush. It MUST render correctly when only Standard and Rush are available.

#### Scenario: All three production-time options are available
- **WHEN** Standard, Rush, and Super Rush are available with their configured turnaround times
- **THEN** the widget displays them from longest to shortest turnaround as Standard, Rush, and Super Rush in every layout

#### Scenario: Super Rush is unavailable for the product
- **WHEN** only Standard and Rush are available
- **THEN** the widget displays both options without an empty Super Rush position

### Requirement: Production-time cards use duration-first shipping information
Each displayed production-time card SHALL show a bold first line containing the duration followed by the option name, and a muted second line containing its target ship date. Both values MUST be derived from that option's current configured turnaround time.

#### Scenario: Configured turnaround time is presented
- **WHEN** an available option has a configured turnaround time
- **THEN** its card displays that duration before the option name and the corresponding target ship date below it

#### Scenario: Configured turnaround time changes
- **WHEN** an option's configured turnaround time changes
- **THEN** the card reflects the updated duration and target ship date without relying on a hard-coded value

### Requirement: Existing production-time commercial and availability behavior is retained
The presentation and default-selection changes SHALL NOT change production-time prices, slot counts, sold-out disabling, fastest-available indication, customer selection interaction, or the selected value submitted for checkout. The widget MUST preserve the same reverse-turnaround order in every layout.

#### Scenario: A production-time upgrade is sold out
- **WHEN** an option has no remaining slots
- **THEN** it remains visibly sold out and cannot be selected

#### Scenario: Customer selects a production-time upgrade
- **WHEN** the customer selects an available Rush or Super Rush option
- **THEN** its existing price, availability state, and selected checkout value are retained

#### Scenario: Production-time widget is rendered responsively
- **WHEN** the widget is displayed in a responsive layout
- **THEN** it retains the longest-to-shortest turnaround order and usable selection controls
