# Changesets

To make sure that the adopters of our products and integrations can always use the latest and greaters versions we implemented a standarization for Release Notes and Migration Guides. The goal is to make the migration process to the newer version of each package as smooth and effortless as possible.

To facilitate the process of creating the release notes and migration guides we use the [changesets](https://github.com/changesets/changesets), and `@vue-storefront/changesets` that provides a custom changelog format for the `changesets` package.

## Installation

```sh
yarn add -D @vue-storefront/changesets
```

## Usage

Add the following to your `changeset/config.json` file:

```json
{
  "changelog": "@vue-storefront/changesets",
}
```

This will use the `@vue-storefront/changesets` package to [modify the changelog format](https://github.com/changesets/changesets/blob/main/docs/modifying-changelog-format.md). 

## Example

1. [Use the `changeset` CLI to create a new changeset](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md#i-am-in-a-multi-package-repository-a-mono-repo)
2. Provide a changeset, following the [conventions](#conventions) eg. `[REMOVED] getPhysicalStores method was removed from the Middleware and SDK.`
3. Provide another changeset eg. `[ADDED] getPhysicalStores method that allows fetching a list of physical stores and filtering it by their location.`
4. Merge changes to the main branch

Changeset will create a PR for relase, and the following markdown:

```md
[REMOVED] getPhysicalStores method was removed from the Middleware and SDK.
[ADDED] getPhysicalStores method that allows fetching a list of physical stores and filtering it by their location.
```

will be transformed into:

```md
- **[REMOVED]** getPhysicalStores method was removed from the Middleware and SDK.
- **[ADDED]** getPhysicalStores method that allows fetching a list of physical stores and filtering it by their location.
```

In the changeset's release PR makes sure, that the migration guide is provided in the CHANGELOG.md file.

## Conventions

- [ADDED] { what was added, with link to the docs }, { what new capabilities it introduced }{ example usage }
- [CHANGED] { what has changed }, { why it has changed }{ before / after code }
- [FIXED] { what was fixed }, { what was the previous behaviour}. { what is the new behaviour }
- [REMOVED] { what was removed }, { why }. { additional context for ones using this feature eg. it is now handled in a different way in a different place }

## Migration Guide

Below each version release, there should be a migration guide showing how to migrate to the new version of the package step by step even if it repeats some parts from the Release Notes. The migration Guide should describe actionable steps that will allow to migrate to the new version of the package  and cover all breaking changes

### Definition of breaking change

As a rule of thumb a “breaking change” is any kind of change that could result in failed application build or change in its functionality after automatically bumping the package to the newer version. We should treat specifically (but not exclusively) the following changes as breaking changes

**API Contract change**

- package was removed/renamed
- method was removed/renamed
- property was removed/renamed
- event names/payloads have changed,
- number/types of method arguments have changed

**Functional change**

- A feature works differently under the hood
- Compatibility change
- A feature/package requires to bump/install another package

### How to write Migration Guide?

1. Always describe the action that needs to be taken.
2. Always provide before/after code.
3. If the user needs to bump  other packages for this version to work always mention it in the guide and provide links to the changelogs/migration guides of those versions.

Check the [reference-changelog.md](./reference-changelog.md) to see the format of the release notes and migration guides.