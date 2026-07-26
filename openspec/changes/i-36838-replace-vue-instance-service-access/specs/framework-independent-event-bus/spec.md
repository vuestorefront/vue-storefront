## ADDED Requirements

### Requirement: Framework-independent EventBus facade
The storefront SHALL expose the established EventBus through an explicit project import backed by a framework-independent implementation and MUST NOT construct a Vue instance or expose `$bus` on Vue components.

#### Scenario: Module publishes an event
- **WHEN** a module calls `$emit` on the imported EventBus facade
- **THEN** registered listeners receive the forwarded arguments in registration order

#### Scenario: Component uses EventBus
- **WHEN** a migrated Options API or Composition API component publishes or subscribes
- **THEN** it imports the EventBus facade instead of reading `this.$bus`, `root.$bus`, or `Vue.prototype.$bus`

### Requirement: Listener compatibility
The EventBus SHALL preserve the existing `$on`, `$off`, `$once`, and `$emit` listener lifecycle used by storefront modules.

#### Scenario: Once listener fires
- **WHEN** an event with a `$once` listener is emitted more than once
- **THEN** that listener runs exactly once and can be removed through its original callback

#### Scenario: Specific listener is removed
- **WHEN** `$off` receives an event and callback
- **THEN** only that callback is removed from that event

#### Scenario: Event or bus listeners are cleared
- **WHEN** `$off` receives only an event or receives no arguments
- **THEN** it respectively clears all listeners for that event or all EventBus listeners

### Requirement: Filter compatibility
The EventBus SHALL preserve `$filter` and `$emitFilter` behavior for asynchronous extension filters.

#### Scenario: One filter argument is emitted
- **WHEN** `$emitFilter` receives one value
- **THEN** it first emits the ordinary event, passes the scalar value to every registered filter, and resolves all filter results

#### Scenario: Multiple filter arguments are emitted
- **WHEN** `$emitFilter` receives multiple values
- **THEN** it first emits the ordinary event, passes the argument array to every registered filter, and resolves results in filter registration order through `Promise.all`

### Requirement: Existing inter-module contracts remain stable
The EventBus replacement MUST preserve existing event names, authentication transitions, checkout/payment events, and filter registration boundaries.

#### Scenario: Authentication state changes
- **WHEN** existing login or logout flows emit their established events
- **THEN** subscribed feature modules retain their current fetch or clearing behavior without direct user-module coupling
