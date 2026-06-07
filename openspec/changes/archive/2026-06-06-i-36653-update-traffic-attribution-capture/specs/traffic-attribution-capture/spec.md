## ADDED Requirements

### Requirement: Initial Landing Raw Touch Capture

The system SHALL capture traffic attribution from the initial client-side SPA landing context as a raw touch payload containing a clean landing page URL, referrer URL, filtered query parameters, and detection timestamp.

#### Scenario: Initial landing has query parameters and referrer

- **WHEN** the storefront module initializes in the browser on a URL with query parameters and `document.referrer` is available
- **THEN** the captured touch contains `landing_page_url`, `referrer_url`, `query_params`, and `detected_at`
- **AND** `landing_page_url` contains the origin and pathname without query parameters
- **AND** the captured touch does not contain storefront-classified channel, source, medium, or campaign interpretation beyond the raw query parameter values

#### Scenario: Initial landing is direct

- **WHEN** the storefront module initializes in the browser with no usable referrer and no acquisition query parameters
- **THEN** the captured touch still contains the clean landing page URL, empty or absent referrer URL, filtered query parameters, and detection timestamp

#### Scenario: Server-side rendering

- **WHEN** the storefront module is initialized during SSR
- **THEN** the system does not access browser-only globals and does not capture or persist a touch

### Requirement: First Touch Persistence

The system SHALL persist first touch as a write-once local storage buffer within the existing traffic attribution module storage.

#### Scenario: First touch is empty

- **WHEN** no unexpired first touch exists during initial SPA synchronization
- **THEN** the system stores the captured raw touch as first touch
- **AND** the system stores the same captured raw touch as last touch

#### Scenario: First touch already exists

- **WHEN** an unexpired first touch already exists during initial SPA synchronization
- **THEN** the system preserves the existing first touch
- **AND** the system does not replace first touch with a later ad, UTM, click-id, referral, or direct touch

### Requirement: Last Touch Acquisition Gate

The system SHALL update last touch only when the initial SPA landing contains a coarse acquisition signal or when first touch is being initialized.

#### Scenario: UTM acquisition signal

- **WHEN** first touch exists and the captured landing query parameters include `utm_source` or `utm_medium`
- **THEN** the system stores the captured raw touch as last touch if it differs from the current last touch

#### Scenario: Click-id acquisition signal

- **WHEN** first touch exists and the captured landing query parameters include a configured click-id parameter
- **THEN** the system stores the captured raw touch as last touch if it differs from the current last touch

#### Scenario: External referrer acquisition signal

- **WHEN** first touch exists and the captured landing has a referrer whose host is not in the configured ignored hosts
- **THEN** the system stores the captured raw touch as last touch if it differs from the current last touch

#### Scenario: Direct landing after existing first touch

- **WHEN** first touch exists and the captured landing has no UTM signal, no configured click-id signal, and no usable external referrer
- **THEN** the system preserves the current last touch

#### Scenario: Ignored referrer host

- **WHEN** first touch exists and the captured landing referrer host is in the configured ignored hosts
- **THEN** the referrer does not qualify the captured touch as an acquisition signal

#### Scenario: Sibling storefront referrer

- **WHEN** first touch exists and the captured landing referrer host is another owned storefront domain
- **THEN** the referrer qualifies the captured touch as an acquisition signal unless that host is explicitly configured as ignored

#### Scenario: Payment gateway referrer

- **WHEN** first touch exists and the captured landing referrer host is a configured payment gateway host
- **THEN** the referrer does not qualify the captured touch as an acquisition signal

### Requirement: Sensitive Query Filtering

The system SHALL exclude sensitive and operational query parameters from persisted and submitted raw touch payloads.

#### Scenario: Landing URL contains sensitive parameters

- **WHEN** the initial landing URL contains query parameters configured as sensitive or operational
- **THEN** those parameters are omitted from the captured touch `query_params`
- **AND** those parameters are not submitted to Magento by the traffic attribution module
- **AND** those parameters are not included in `landing_page_url`

#### Scenario: Landing URL contains attribution parameters

- **WHEN** the initial landing URL contains non-sensitive attribution parameters
- **THEN** those parameters are preserved in the captured touch `query_params` exactly as raw query values after route query normalization

### Requirement: No Session Identifier Payload

The system SHALL NOT include a generated `session_id` in stored or submitted storefront traffic attribution payloads for this iteration.

#### Scenario: Raw touch is captured

- **WHEN** the system captures a raw touch
- **THEN** the stored touch payload does not contain `session_id`

#### Scenario: Raw touch is submitted

- **WHEN** the system submits a touch to Magento
- **THEN** the submitted request payload does not contain `session_id`

### Requirement: Cart Lifecycle Attribution Submission

The system SHALL submit stored traffic attribution touches to Magento through the existing traffic attribution endpoint when current cart lifecycle events request reporting.

#### Scenario: First touch has not been sent

- **WHEN** the report action runs and first touch exists with `isSent` false
- **THEN** the system submits the first touch raw payload to Magento using `TaskQueue`
- **AND** the system marks first touch sent only after a successful response

#### Scenario: Last touch differs from first touch

- **WHEN** the report action runs and last touch exists with `isSent` false and differs from first touch
- **THEN** the system submits the last touch raw payload to Magento using a separate request
- **AND** the system marks last touch sent only after a successful response

#### Scenario: Last touch equals first touch

- **WHEN** the report action runs and last touch has the same raw payload as first touch
- **THEN** the system does not submit a duplicate last touch request

#### Scenario: Reporting is triggered by cart lifecycle

- **WHEN** the storefront receives the existing `cart-created` or `cart-connected` event
- **THEN** the system dispatches the traffic attribution report action

### Requirement: Non-Blocking Checkout Behavior

The system SHALL keep traffic attribution submission non-blocking for checkout, cart synchronization, and order placement flows.

#### Scenario: Attribution submission fails

- **WHEN** Magento returns a non-success response for a traffic attribution submission
- **THEN** the system logs the failure without blocking checkout, cart synchronization, or order placement
- **AND** the corresponding touch remains eligible for a later report attempt according to the existing sent-flag behavior

### Requirement: Attribution Query Cache Ignoring

The system SHALL include attribution-only query parameters in SSR ignored query parameter handling when those parameters should not fragment page cache entries.

#### Scenario: Landing URL contains attribution-only parameter

- **WHEN** SSR cache key generation receives a URL containing an attribution-only query parameter configured for ignoring
- **THEN** the generated cache key omits that parameter

#### Scenario: Landing URL contains functional parameter

- **WHEN** SSR cache key generation receives a URL containing a functional query parameter that affects page behavior
- **THEN** the generated cache key preserves that parameter unless it is already intentionally ignored by existing cache rules

### Requirement: Client Module Registration

The system SHALL provide traffic attribution as a Vue Storefront client module with a namespaced Vuex store and client-only persistence/reporting side effects.

#### Scenario: Client module registration

- **WHEN** storefront client modules are registered in the browser
- **THEN** the traffic attribution module is registered
- **AND** the namespaced traffic attribution Vuex store is available
- **AND** the traffic attribution storage collection is initialized

#### Scenario: SSR module execution

- **WHEN** the traffic attribution module is executed during SSR
- **THEN** the Vuex module may be registered for state shape consistency
- **AND** browser-only storage synchronization, storage event listeners, cart event listeners, and raw touch capture are not initialized

### Requirement: Local Storage Persistence

The system SHALL persist first and last touch state through the traffic attribution module storage collection and keep Vuex state synchronized with storage mutations.

#### Scenario: Store mutation persists first touch

- **WHEN** first touch is set in Vuex state
- **THEN** the system persists the first touch value to traffic attribution storage

#### Scenario: Store mutation persists last touch

- **WHEN** last touch is set in Vuex state
- **THEN** the system persists the last touch value to traffic attribution storage

#### Scenario: Sent flag mutation persists touch state

- **WHEN** first touch or last touch is marked sent
- **THEN** the system persists the updated touch state including the sent flag

#### Scenario: Clear mutation removes persisted touch

- **WHEN** first touch or last touch is cleared from Vuex state
- **THEN** the system removes the corresponding value from traffic attribution storage

#### Scenario: Cross-tab storage update

- **WHEN** another browser tab updates or removes a stored first or last touch value
- **THEN** the current tab updates the traffic attribution Vuex state to match the storage event

### Requirement: Stored Touch Expiration

The system SHALL treat stored first and last touches as expired when their stored expiration timestamp is missing or not later than the current time.

#### Scenario: Stored first touch is unexpired

- **WHEN** an unexpired first touch exists in traffic attribution storage during synchronization
- **THEN** the system loads it into Vuex state

#### Scenario: Stored first touch is expired

- **WHEN** an expired first touch exists in traffic attribution storage during synchronization
- **THEN** the system clears first touch from Vuex state and storage

#### Scenario: Stored last touch is unexpired

- **WHEN** an unexpired last touch exists in traffic attribution storage during synchronization
- **THEN** the system loads it into Vuex state

#### Scenario: Stored last touch is expired

- **WHEN** an expired last touch exists in traffic attribution storage during synchronization
- **THEN** the system clears last touch from Vuex state and storage

### Requirement: Attribution Configuration

The system SHALL use traffic attribution configuration for retention windows, acquisition signal keys, ignored referrer hosts, and sensitive query filtering.

#### Scenario: Configured expiration values exist

- **WHEN** positive first-touch and last-touch expiration day values are configured
- **THEN** newly created touch wrappers use those values to calculate `expiresAt`

#### Scenario: Configured expiration values are absent or invalid

- **WHEN** first-touch or last-touch expiration day values are absent or not positive
- **THEN** newly created touch wrappers use the module defaults

#### Scenario: Configured click-id keys exist

- **WHEN** traffic attribution click-id keys are configured
- **THEN** the acquisition gate uses those keys to detect click-id acquisition signals

#### Scenario: Configured ignored hosts exist

- **WHEN** traffic attribution ignored referrer hosts are configured
- **THEN** the acquisition gate excludes those hosts from external referrer acquisition signals

#### Scenario: Configured sensitive query keys exist

- **WHEN** traffic attribution sensitive query keys are configured
- **THEN** raw touch capture omits those keys from persisted and submitted query parameters

### Requirement: Magento Endpoint Contract

The system SHALL submit each reportable touch to the existing Magento traffic attribution endpoint using the Vue Storefront `TaskQueue` abstraction.

#### Scenario: Report request is created

- **WHEN** the system submits a traffic attribution touch
- **THEN** it sends a POST request to the configured Budsies endpoint path `/carts/traffic-attributions?token={{token}}&cartId={{cartId}}`
- **AND** the request body is JSON containing `{ "request": <raw touch payload> }`
- **AND** the request is executed through `TaskQueue`

#### Scenario: Report response succeeds

- **WHEN** Magento returns result code `200` for a traffic attribution request
- **THEN** the system treats the touch submission as successful

#### Scenario: Report response fails

- **WHEN** Magento returns a result code other than `200` for a traffic attribution request
- **THEN** the system treats the touch submission as failed
- **AND** the system does not mark the touch sent

### Requirement: Sequential First And Last Reporting

The system SHALL preserve first-touch-before-last-touch report ordering when both touches need submission.

#### Scenario: First and last touch both need reporting

- **WHEN** first touch is unsent and last touch is unsent and last touch differs from first touch
- **THEN** the system attempts to submit first touch before attempting to submit last touch

#### Scenario: First touch submission fails before last touch

- **WHEN** first touch submission fails and last touch is also eligible for submission
- **THEN** the system may still attempt last touch submission according to the current non-blocking report flow
- **AND** failed touches remain unmarked as sent

### Requirement: In-Flight Report De-duplication

The system SHALL avoid starting duplicate traffic attribution report executions while a report execution is already in flight.

#### Scenario: Report action is already running

- **WHEN** the report action is dispatched while a previous report action promise is still in flight
- **THEN** the system returns the in-flight promise instead of starting a second report execution

#### Scenario: Report action completes

- **WHEN** the in-flight report action settles
- **THEN** the system clears the in-flight report lock so a future report event can run

### Requirement: Storefront Architecture Compliance

The system SHALL keep traffic attribution side effects inside the traffic attribution Vuex module and its actions.

#### Scenario: Attribution data is submitted

- **WHEN** traffic attribution data is submitted to Magento
- **THEN** the submission is performed by a Vuex action using `TaskQueue`
- **AND** Vue components do not perform direct attribution API calls

#### Scenario: Attribution state changes

- **WHEN** first touch, last touch, sent flags, or cleared state changes
- **THEN** the state change is performed through synchronous Vuex mutations

