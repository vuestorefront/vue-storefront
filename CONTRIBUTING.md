# How to Contribute

Already a JS/Vue.js developer? Pick an issue, push a PR and instantly become a member of the vue-storefront contributors community.
We've marked some issues as "Easy first pick" to make it easier for newcomers to begin!

Thank you for your interest in, and engagement!

Before you type an issue please read about out [release lifecycle](https://docs.vuestorefront.io/guide/basics/project-structure.html)

# Branches

You should fork the project or create a branch for new features.
The main branches used by the core team are:

- master - where we store the stable release of the app (that can be deployed to our demo instances),
- develop - the most recent version of the app - kind of "nightly" build.
- RC-x (`x` is current version) - release candidate branch with features that will land in next version.

Please use "develop" or "RC" for development purposes as the "master" can be merged just as the new release is coming out (about once a month)!

## Issue reporting guidelines:

Always define the type of issue:
* Bug report
* Feature request

While writing issues, be as specific as possible
All requests regarding support with implementation or application setup should be sent to contributors@vuestorefront.io

**Tag your issues properly**. If you found a bug tag it with `bug` label. If you're requesting new feature tag it with `feature request`  label.

## Git flow
We're introducing TypeScript to Vue Storefront core, so You can use it where it's appropriate - but please be pragmatic.
Here are some thoughts on how to use TS features in Vue Storefront: [TypeScript Action Plan](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/TypeScript%20Action%20Plan.md).

## Pull request Checklist

Here’s how to submit a pull request. <b>Pull request that don't meet these requirements will not be merged.</b>

**ALWAYS** use [Pull Request template](https://github.com/DivanteLtd/vue-storefront/blob/master/PULL_REQUEST_TEMPLATE.md) it's automatically added to each PR.
1. Fork the repository and clone it locally fro the 'develop' branch. Make sure it's up to date with current `develop` branch
2. Create a branch for your edits. Use the following branch naming conventions:
 * bugfix/task-title
 * feature/task-name
3. Use Pull Request template and fill as much fields as possible to describe your solution.
4. Reference any relevant issues or supporting documentation in your PR (ex. “Issue: 39. Issue title.”).
5. If you are adding new feature provide documentation along with the PR. Also, add it to [upgrade notes](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Upgrade%20notes.md)
6. If you are removing/renaming something or changing its behavior also include it in [upgrade notes](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Upgrade%20notes.md)
7. Test your changes! Run your changes against any existing tests and create new ones when needed. Make sure your changes don’t break the existing project. Make sure that your branch is passing Travis CI build. 
8. If you have found a potential security vulnerability, please DO NOT report it on the public issue tracker. Instead, send it to us at contributors@vuestorefront.io. We will work with you to verify and fix it as soon as possible.
(https://github.com/DivanteLtd/vue-storefront/blob/master/README.md#documentation--table-of-contents))

## Acceptance criteria

Your pull request will be merged after meeting following criteria:
- Everything from "Pull Request Checklist"
- PR is proposed to appropiate branch 
- There are at least two approvals from core team members