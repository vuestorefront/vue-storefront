## ADDED Requirements

### Requirement: Initiating re-order action shows progress
The storefront SHALL immediately show a loading indicator on the Order History `Re-order` action that initiates an item reorder.

#### Scenario: Customer starts an item reorder
- **WHEN** a customer activates `Re-order` for an eligible Order History item
- **THEN** that item's re-order action immediately displays a loading indicator
- **AND** the action cannot be activated again while the request is pending

#### Scenario: Screen-reader user starts an item reorder
- **WHEN** a customer activates `Re-order` for an eligible Order History item
- **THEN** a polite screen-reader status announces that the item is being re-ordered
- **AND** the status is cleared when the reorder flow settles

#### Scenario: Another item did not initiate the reorder
- **WHEN** one Order History item is being reordered
- **THEN** other re-order actions do not display the initiating item's loading indicator
- **AND** the existing shared reorder and cart-sync guards keep conflicting re-order actions disabled

### Requirement: Loading state always resets
The storefront SHALL clear the initiating re-order action's loading state when the existing reorder flow succeeds or fails.

#### Scenario: Re-order succeeds
- **WHEN** the existing reorder flow succeeds
- **THEN** the existing success notification is shown
- **AND** the item is added to the refreshed cart as before
- **AND** the initiating action returns to its normal state

#### Scenario: Re-order fails
- **WHEN** the existing reorder flow fails
- **THEN** the existing customer-facing error notification is shown
- **AND** the initiating action returns to its normal state

### Requirement: Existing action behavior is preserved
The storefront SHALL preserve the behavior of cart synchronization and all unrelated Order History actions.

#### Scenario: Re-order is in progress beside another action
- **WHEN** an item reorder is in progress
- **THEN** unrelated eligible Order History actions retain their existing state and behavior
