# storefront-request-services Specification

## Purpose
TBD - created by archiving change i-36838-replace-vue-instance-service-access. Update Purpose after archive.
## Requirements
### Requirement: Narrow request metadata services
The storefront SHALL expose confirmed component request needs through narrow project-owned services and MUST NOT provide the complete renderer, Express request, Express response, or component `$ssrContext`.

#### Scenario: Server component reads request metadata
- **WHEN** a component needs the request host, user agent, or a named cookie during SSR
- **THEN** it receives that value from the request service created for the current render

#### Scenario: Browser component reads request-equivalent metadata
- **WHEN** the same helper runs in the browser
- **THEN** it reads guarded browser location, navigator, or cookie APIs without evaluating those globals on the server

#### Scenario: Server redirect is requested
- **WHEN** an existing component/server-prefetch flow must redirect an SSR response
- **THEN** it invokes a narrow server redirect operation without receiving the raw response object

### Requirement: Request service isolation
Each SSR application SHALL receive request services bound only to its render context.

#### Scenario: Consecutive requests differ
- **WHEN** consecutive SSR applications have different hosts, cookies, or user agents
- **THEN** each rendered result and request-service consumer observes only its own values

#### Scenario: Concurrent requests differ
- **WHEN** request services from two SSR applications are used concurrently
- **THEN** neither service reads or mutates the other application's request state

### Requirement: Explicit non-component context remains explicit
Server entrypoints, async-data loaders, resolvers, and mapping fallbacks that already receive a scoped context SHALL retain explicit narrow parameters rather than calling a component composable.

#### Scenario: Mapping fallback handles a server redirect
- **WHEN** a mapping fallback receives an explicit server context
- **THEN** it performs its redirect through that explicit boundary without Vue injection or a Vue instance

### Requirement: Cache tags remain a separate request-local capability
This change MUST NOT introduce cache tags into the general request service, and new code MUST NOT add cache-tag access through `$ssrContext` or `Vue.prototype`.

#### Scenario: Existing cache-tag-only call site is reviewed
- **WHEN** the migration encounters a cache-tag-only `$ssrContext` or `Vue.prototype.$cacheTags` consumer
- **THEN** the call site remains assigned to the dependent cache-tag change rather than receiving a partial generic request-service replacement

