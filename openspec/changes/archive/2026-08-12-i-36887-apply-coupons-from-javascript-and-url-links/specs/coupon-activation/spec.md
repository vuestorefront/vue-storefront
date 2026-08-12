## ADDED Requirements

### Requirement: Public browser coupon activation API
The storefront SHALL expose `window.budsies.applyCoupon(couponCode: string)` after client initialization. The method SHALL augment the existing `window.budsies` namespace, trim leading and trailing whitespace from the supplied code, reuse the existing cart coupon mechanics, and resolve an object with exactly one of the statuses `applied`, `saved`, `already-applied`, `conflict`, or `rejected`. It SHALL NOT be exposed or invoke coupon behavior during SSR or Storyblok preview mode.

#### Scenario: External integration applies a valid coupon
- **WHEN** an external browser integration calls `window.budsies.applyCoupon` with a valid code and a usable cart without an active coupon
- **THEN** the system MUST use the existing Magento coupon application and cart totals synchronization flow
- **THEN** the Promise MUST resolve with status `applied` only after that existing flow succeeds

#### Scenario: External integration requests a coupon before a usable cart exists
- **WHEN** an external browser integration requests a non-empty code before the cart has a usable server cart
- **THEN** the system MUST use the existing pending-coupon persistence behavior without sending a Magento coupon request
- **THEN** the Promise MUST resolve with status `saved`
- **THEN** the customer MUST receive the existing localized feedback that the coupon was saved for automatic application rather than applied

#### Scenario: External integration requests the active coupon
- **WHEN** an external browser integration requests the same code that is already active on the cart
- **THEN** the system MUST NOT issue a Magento replacement request
- **THEN** the Promise MUST resolve with status `already-applied`

#### Scenario: External integration requests a different active coupon
- **WHEN** an external browser integration requests a code that differs from the active cart coupon
- **THEN** the system MUST preserve the active coupon and MUST NOT issue a Magento replacement request
- **THEN** the customer MUST receive the existing localized active-coupon error feedback
- **THEN** the Promise MUST resolve with status `conflict`

#### Scenario: External integration requests a coupon during Cart synchronization
- **WHEN** an external browser integration requests a coupon while Cart synchronization is active
- **THEN** the system MUST wait for the active synchronization to complete before evaluating coupon state
- **THEN** the system MUST apply, save, preserve, or reject the coupon according to the synchronized Cart state

#### Scenario: Cart synchronization requests overlap
- **WHEN** another Cart synchronization is requested before the active synchronization completes
- **THEN** the system MUST execute the requested reconciliation after the active synchronization rather than in parallel
- **THEN** the queued reconciliation MUST evaluate the current Cart state before deciding whether synchronization remains necessary

#### Scenario: Active synchronization reconnects the Cart
- **WHEN** an active Cart synchronization reconnects the Cart and requires another reconciliation
- **THEN** the reconnect reconciliation MUST execute inside the active serialized operation without waiting on its own synchronization lock
- **THEN** pending-coupon handling MUST execute as an awaited part of the owning serialized operation after the reconnect reconciliation completes
- **THEN** the system MUST keep later Cart synchronization requests behind the pending-coupon request and its totals update

#### Scenario: External integration requests a coupon during session startup
- **WHEN** an external browser integration requests a coupon before the user session has started
- **THEN** the system MUST wait for user session startup before evaluating Cart state
- **THEN** the system MUST apply, save, preserve, or reject the coupon according to the initialized Cart state

#### Scenario: External integration requests an invalid or unavailable coupon
- **WHEN** an external browser integration submits an empty or whitespace-only code, reaches the existing cart-operation guard after Cart synchronization completes, or Magento rejects the code
- **THEN** the system MUST NOT report the coupon as applied or saved after a usable cart exists
- **THEN** the Promise MUST resolve with status `rejected`

#### Scenario: Coupon activation is requested in Storyblok preview
- **WHEN** a browser API or URL coupon request is handled in Storyblok preview mode
- **THEN** the system MUST NOT persist a pending coupon, call Magento, or otherwise mutate cart state
- **THEN** a browser API request MUST resolve with status `rejected`

### Requirement: Initial URL coupon activation is client-only
The storefront SHALL process the initial `coupon_code` query parameter through the public browser coupon activation API after client initialization. It SHALL read the parameter from Vue Router's current route query, support URL-encoded values, and submit a decoded code once during the initial router-ready callback.

#### Scenario: Campaign URL activates a coupon
- **WHEN** a customer loads a storefront URL containing `coupon_code=<encoded-code>` outside SSR
- **THEN** the system MUST wait for user session startup when it is not yet complete
- **THEN** the system MUST read the decoded query value from Vue Router's current route
- **THEN** the system MUST invoke the public browser coupon activation API after client initialization

#### Scenario: URL coupon is rendered on the server
- **WHEN** the server renders a URL containing `coupon_code`
- **THEN** the system MUST NOT persist a pending coupon, call Magento, or otherwise mutate cart state during SSR

### Requirement: Coupon URLs do not fragment SSR page cache entries
The SSR cache-key generator SHALL ignore the `coupon_code` query parameter when generating a page cache key.

#### Scenario: Cache key is generated for campaign URLs
- **WHEN** the server generates cache keys for otherwise identical storefront URLs with and without different `coupon_code` values
- **THEN** the cache keys MUST be identical after other cache-key rules are applied
