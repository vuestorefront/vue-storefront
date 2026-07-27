## ADDED Requirements

### Requirement: Explicit setup template refs
Composition API components SHALL use setup-owned template refs for elements and child component public instances and MUST NOT retrieve their `$refs` map through a current Vue instance.

#### Scenario: Static element or component ref is mounted
- **WHEN** a template ref matches a setup-owned returned ref
- **THEN** the ref contains the mounted element or typed child public instance and is cleared on teardown according to Vue 2.7 behavior

#### Scenario: Ref target is absent
- **WHEN** conditional rendering removes a referenced element or component
- **THEN** consuming logic handles the empty ref without inspecting the parent component instance

### Requirement: Repeated and dynamic ref behavior
Repeated and dynamically selected fields SHALL expose explicit typed ref collections or mappings whose order and lookup behavior match the rendered form.

#### Scenario: Ref is rendered under v-for
- **WHEN** repeated customization or form fields mount, reorder, or unmount
- **THEN** the setup-owned ref collection represents the current child instances in rendered order without reading the complete `$refs` object

#### Scenario: Validation anchor is selected dynamically
- **WHEN** validation identifies the first invalid dynamic field
- **THEN** an explicit field-to-anchor mapping resolves the intended scroll and focus target

### Requirement: Nested form contracts
Shared form-validation logic SHALL accept only the child validation/focus handles it needs and MUST NOT traverse arbitrary parent or child private `$refs` maps.

#### Scenario: Nested form validation fails
- **WHEN** a nested child validator reports an error
- **THEN** the form scrolls to and focuses the same first invalid field through the explicit typed contract

#### Scenario: Nested form validation succeeds
- **WHEN** all registered child validation handles pass
- **THEN** the existing submission path proceeds without ref-order or focus regressions
