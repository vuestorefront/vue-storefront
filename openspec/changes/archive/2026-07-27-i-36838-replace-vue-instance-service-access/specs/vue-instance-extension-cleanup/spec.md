## ADDED Requirements

### Requirement: Scoped Vue extensions are removed
After consumer migration, production code MUST NOT install or access the scoped custom service extensions through `Vue.prototype`, a Vue public/root instance, private component fields, or root component options.

#### Scenario: Vue extension inventory is checked
- **WHEN** production source and active Vue type augmentations are inspected
- **THEN** `$additionalContent`, `$bus`, `$config`, component-facing `$storyblokClient`, `$device`, `$ssrRequestContext`, `$extendedHead`, `_additionalContentRoot`, and `_additionalContent` are absent

#### Scenario: Cache-tag exception is checked
- **WHEN** the same inventory encounters `$cacheTags`
- **THEN** it is identified as the sole temporary exception owned by the dependent cache-tag change and no new use has been introduced

### Requirement: Temporary current-instance helpers are removed
Production code MUST NOT depend on `useRootInstance()` or use `useCurrentInstance()` to locate application services, request data, or template refs after the corresponding migrations complete.

#### Scenario: Migrated production source is searched
- **WHEN** helper imports and calls are inspected across the parent repository and theme
- **THEN** no in-scope production consumer remains and the temporary helper implementation and tests are removed or replaced

### Requirement: Affected module dependencies are explicit
Modules affected by this change SHALL receive Additional Content, request, or head services through their existing typed module options rather than retrieving them from the Vue app/root instance.

#### Scenario: Privacy or ratings module extends the document head
- **WHEN** TrueVault or Fera contributes its configured script
- **THEN** it uses the explicit head service supplied in module options

#### Scenario: AB testing reads its assignment
- **WHEN** AB-testing module setup needs the current test-group cookie
- **THEN** it uses the explicit request service supplied in module options

### Requirement: Removed access paths are enforced
Repository validation SHALL reject new production usage of the removed current-instance helpers and scoped Vue extension fields.

#### Scenario: Removed pattern is introduced
- **WHEN** a production change adds a prohibited helper import, root lookup, or scoped prototype field
- **THEN** the enforcement gate fails with the prohibited pattern and file

#### Scenario: Full migration candidate is validated
- **WHEN** the exact parent and theme revisions are prepared for integration
- **THEN** type-check, lint, maintained tests, focused compatibility tests, client/server/service-worker builds, SSR/hydration checks, and representative commerce flows pass
