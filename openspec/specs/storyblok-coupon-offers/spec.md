# storyblok-coupon-offers Specification

## Purpose

Defines Storyblok coupon offers and their integration with the storefront cart coupon workflow.

## Requirements

### Requirement: Storyblok landing-page coupon offers are actionable
The system SHALL provide a dedicated Storyblok landing-page coupon-offer component that renders a configured coupon code as a coupon action. The component SHALL use the same reusable coupon-item presentation as the detailed cart coupon offer.

#### Scenario: Customer applies an eligible coupon from a landing page
- **WHEN** a customer activates a Storyblok coupon offer, no different coupon is active, and the cart accepts the configured code
- **THEN** the system MUST dispatch the existing cart coupon application flow for that code
- **THEN** the system MUST show that the coupon was applied

#### Scenario: Existing Storyblok link button is rendered
- **WHEN** a Storyblok `button_item` is rendered on a landing page
- **THEN** the system MUST retain its existing link behavior independently of coupon-offer configuration

#### Scenario: Coupon offer is rendered in the detailed cart
- **WHEN** the detailed cart renders an eligible existing cart-line coupon offer
- **THEN** the system MUST render that offer through the shared coupon-item presentation
- **THEN** the offer MUST retain its existing coupon code, configured promotion text, and cart coupon state behavior

#### Scenario: Coupon offer is rendered in Storyblok editor preview
- **WHEN** a Storyblok coupon offer is rendered in editor preview mode
- **THEN** the coupon action MUST be disabled

### Requirement: Landing-page coupon offers without a server cart are saved in the cart
The existing cart module SHALL persist one pending coupon code when a customer selects a merchant-configured Storyblok coupon offer before a server cart exists. The customer-facing confirmation MUST state that the coupon was saved and will be applied automatically after a cart is created, not that it was applied.

#### Scenario: Customer selects a coupon before a server cart exists
- **WHEN** a customer activates an actionable Storyblok coupon offer while the cart has no server token
- **THEN** the system MUST save that code as the pending coupon intent
- **THEN** the system MUST notify the customer that the coupon was saved and will be applied automatically after a cart is created rather than applied immediately

#### Scenario: Pending intent survives a client refresh
- **WHEN** a pending coupon intent has been saved and the customer reloads the storefront in the same browser
- **THEN** the system MUST restore the pending coupon intent on the client

#### Scenario: Customer selects a coupon with a server cart
- **WHEN** a customer activates a Storyblok coupon offer while the cart has a server token
- **THEN** the system MUST follow the existing cart-line coupon offer application and interaction-state behavior
- **THEN** the system MUST NOT save a pending coupon merely because direct application does not succeed

#### Scenario: Cart is cleared
- **WHEN** the cart is cleared while a pending coupon intent is stored
- **THEN** the system MUST clear the pending coupon intent from state and browser storage

### Requirement: Pending coupon is applied from the existing cart connection flow
The existing cart module SHALL attempt to apply the pending coupon through the existing cart coupon flow after its normal connection flow creates or connects a server cart and completes required cart synchronization. It MUST preserve the existing coupon interaction safeguards.

#### Scenario: Product addition creates a server cart after the coupon was saved
- **WHEN** a pending coupon intent exists and adding a product creates a server cart through the normal cart connection flow
- **THEN** the system MUST attempt to apply the saved code once through the existing cart coupon application flow after cart connection and synchronization are complete
- **THEN** the system MUST clear the pending coupon intent if the application succeeds

#### Scenario: Customer login creates or connects a server cart
- **WHEN** a pending coupon intent exists and customer login creates or connects a server cart through the normal cart connection flow
- **THEN** the system MUST attempt to apply the saved code once through the existing cart coupon application flow after cart connection and synchronization are complete
- **THEN** the system MUST clear the pending coupon intent if the application succeeds

#### Scenario: Server cart is not created or connected
- **WHEN** a pending coupon intent exists but the normal cart connection flow does not create or connect a server cart
- **THEN** the system MUST retain the pending coupon intent
- **THEN** the system MUST NOT attempt to apply it

#### Scenario: Pending coupon does not apply after cart connection
- **WHEN** a pending coupon application from the cart connection flow does not apply the code
- **THEN** the system MUST retain the pending coupon intent
- **THEN** the system MUST NOT create a separate mutation, EventBus, or background retry schedule

#### Scenario: A different coupon is active when the cart is connected
- **WHEN** a different coupon is active when the cart connection flow handles a pending coupon
- **THEN** the system MUST NOT replace the active coupon
- **THEN** the system MUST preserve the existing cart coupon interaction safeguards
