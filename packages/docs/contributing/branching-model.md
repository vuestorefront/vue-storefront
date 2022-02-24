# Branching model

Our branching model is inspired by the [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). In short, every repository in our GitHub organization should have two primary branches: `main` and `develop`.

The `main` branch contains the latest released and stable version of the package (or multiple packages, if it's a monorepo). The `develop` branch, on the other hand, contains the next minor version and might be unstable.

## Branches

### `main` branch

The `main` branch contains the code for the **latest released version**. We update this branch only to:

* fix a bug present in the current version,
* release new minor- or patch-level version.

This means that we **don't add new features or introduce breaking changes** to this branch. The only time breaking change is allowed is when we identify a serious bug (especially security- or performance-related) that must be patched as soon as possible.

We treat this branch as "production", so it should be stable, tested, and documented. It's also the default branch shown in our GitHub repositories, so it's also the showpiece of what we offer.

### `develop` branch

The `develop` branch contains the code for the **next minor version**. All new features, breaking changes, and bug fixes must be merged into this branch.

Because it's a development branch, it might have some rough edges, be unstable, or lack some tests or documentation. However, we **don't merge unfished work**. If given functionality requires a few separate Pull Requests, we create a feature branch and merge it to the `develop` once it's finished.

## Common scenarios

Let's go over a few common scenarios to get a better understanding of how this works.

### Adding new feature or introducing breaking changes

1. Create a new branch from the `develop` branch.
2. Work on the feature. 🔨
3. Create a Pull Request targeted at the `develop` branch following our [How to submit a Pull Request](./how-to-submit-pull-request.html) guide.

### Fixing a bug present in the latest released package

1. Create a new branch from the `main` branch.
2. Fix the bug. 🔨
3. Create a Pull Request targeted at the `main` branch following our [How to submit a Pull Request](./how-to-submit-pull-request.html) guide.
4. If the bug is also present in the `develop` branch, create an additional Pull Request targeted at this branch.

### Fixing a bug present only on the `develop` branch

1. Create a new branch from the `develop` branch.
2. Fix the bug. 🔨
3. Create a Pull Request targeted at the `develop` branch following our [How to submit a Pull Request](./how-to-submit-pull-request.html) guide.

### Adding a big feature in a few Pull Requests

1. Create a new **feature branch** from the `develop` branch. While it's not a hard requirement, we suggest that its name starts with `feature/`.
2. Create a new branch from the **feature branch**.
3. Work on the feature. 🔨
4. Create a Pull Request targeted at the **feature branch** following our [How to submit a Pull Request](./how-to-submit-pull-request.html) guide.
5. Repeat steps 2-4 until the whole feature is complete.
6. Create a Pull Request targeted at the `develop` branch following our [How to submit a Pull Request](./how-to-submit-pull-request.html) guide.
