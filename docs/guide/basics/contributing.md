# How to Contribute

Already a JS/Vue.js developer? Pick an issue, push a PR, and instantly become a member of the vue-storefront contributors community. We've marked some issues as `Easy first pick` to make it easier for newcomers to begin!

Thank you for your interest and engagement!

## Branches

You should fork the project or create a branch for new features. The main branches used by the core team are:

- `master` - where we store the stable release of the app (that can be deployed to our demo instances).
- `develop` - the most recent version of the app, kind of a "nightly" build.

Please use `develop` for development purposes as the `master` can be merged just as the new release is coming out (about once a month).

## Issue reporting guidelines

Always define the type of issue:

- Bug report
- Feature request

While writing issues, please be as specific as possible. All requests regarding support with implementation or application setup should be sent to [contributors@vuestorefront.io](mailto:contributors@vuestorefront.io)

If the issue is about some changes with a particular theme, please prefix the issue with the theme name (ex. `[default] change product tile background color`).

## TypeScript

We're introducing TypeScript to Vue Storefront core, so you can use it where it's appropriate, but please be pragmatic. It would be nice to TS features only in new modules and Vuex. Here are some thoughts on how to use TS features in Vue Storefront: [TypeScript Action Plan](typescript.md).

## Pull request checklist

Here’s how to submit a pull request. **Pull requests that don't meet these requirements will not be merged.**

::: warning
**ALWAYS** use [Pull Request template](https://github.com/vuestorefront/vue-storefront/blob/master/PULL_REQUEST_TEMPLATE.md), it's automatically added to each PR.
:::

1. Fork the repository and clone it locally on the 'develop' branch.
2. Create a branch for your edits. Use the following branch naming conventions:

- `bugfix/task-title`
- `feature/task-name`

3. Describe what you've changed. Include screenshots of the new feature or the before and after if your changes include differences in HTML/CSS. Drag and drop the images into the body of your pull request.

4. Reference any relevant issues or supporting documentation in your PR (ex. `Issue: 39. Issue title.`).

5. If you are adding a new feature, please provide documentation along with the PR. Also, add it to the [upgrade notes](https://github.com/vuestorefront/vue-storefront/blob/master/doc/Upgrade%20notes.md)

6. If you are removing/renaming something or changing its behavior, please also include it in the [upgrade notes](https://github.com/vuestorefront/vue-storefront/blob/master/doc/Upgrade%20notes.md)

7. Test your changes! Run your changes against any existing tests and create new ones when needed. Make sure your changes don’t break the existing project. Make sure that your branch is passing the Travis CI build.

8. If you have found a potential security vulnerability, please do not report it on the public issue tracker. Instead, send it to us at [contributors@vuestorefront.io](mailto:contributors@vuestorefront.io). We will work with you to verify and fix it as soon as possible.


## New features

If you are making any new feature, make sure it's adjusted to our new, modular approach. Read more [here](../modules/introduction.md)
