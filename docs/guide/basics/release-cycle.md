# Release Cycle

This document describes how Vue Storefront code versions are released. You'll learn how the release process looks like, what are the acceptance criteria, what is our git flow and which branch to use as a stable one.

# How Vue Storefront versions are released

From version 1.9 we release each of VSF versions in two phases
- **Release Candidate phase (RC)** also called "feature version". This version contains all the new features, improvements and additions to the API along with minor bugfixes. New features and additions are merged and released **only** during this phase. The API of features introduced during this phase may slightly change.
- **Stabilization phase** is the one that ends up with production-ready version. During this phase we do only stabilization and bugfixing for previously introduced features. No new features and API additions are merged. PRs from RC version are tested and their API is simplified and/or adjusted according to feedback. 

So assuming next version is 1.x the two-month cycle will look as following:
- v1.x-RC.y - unstable version with cutting-edge features ready to test and feedback
- v1.x.y - stable version of the software **ready for production use**.

# How new features are merged

During RC features Pull Request with new features after feedback and acceptance are normally merged to `develop` branch. 
After entering the Stabilization Phase we are tagging current develop branch, creating a `RC-x` (where `x` is a number of current version) branch from it and working on stabilization there. 
During the stabilization phase new features are merged to develop branch and will be merged on next `RC` phase.

