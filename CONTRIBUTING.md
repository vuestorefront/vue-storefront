# How to Contribute

Already a JS/Vue.js developer? Pick an issue, push a PR and instantly become a member of the vue-storefront contributors community.
We've marked some issues as "Easy first pick" to make it easier for newcomers to begin!

Thank you for your interest in, and engagement!

Before you type an issue please check:

Main readme - https://github.com/DivanteLtd/vue-storefront/blob/master/README.md

# Branches

You should fork the project or create branch for new features.
The main branches used by the core team are:

- master - where we store the stable release of the app (that can be deployed to our demo instances),
- develop - the most recent version of the app - kind of "nightly" build.

Please use "develop" for development purposes as the "master" can be merged just as the new release is coming out (about once a month)!

## Issue reporting guidelines:

Always define type of issue:
* Bug report
* Feature request

While writing issues, be as specific as possible
All requests regarding support with implementation or application setup should be sent to contributors@vuestorefront.io

If the issue is about some changes with particular theme prefix the issue with theme name (ex. "[default] change product tile background color" )
## Pull request checklist

Here’s how to submit a pull request. <b>Pull request that dont meet this requirements will not be merged.</b>

1. Fork the repository and clone it locally fro the 'develop' branch. Make sure its up to date with current `develop` branch
2. Create a branch for your edits. Use the following branch naming conventions:
 * bugfix/task-title
 * feature/task-name
3. Desribe what you've changed. Include screenshots of the new feature or the before and after if your changes include differences in HTML/CSS. Drag and drop the images into the body of your pull request.
4. Reference any relevant issues or supporting documentation in your PR (ex. “Issue: 39. Issue title.”).
5. If you are adding new feature provide documentation along with the PR. Also add it to [upgrade notes](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Upgrade%20notes.md)
6. If you are remiving/renaming something or changing it's behavior also include it in [upgrade notes](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Upgrade%20notes.md)
7. Test your changes! Run your changes against any existing tests and create new ones when needed. Make sure your changes don’t break the existing project. Make sure that your branch is passing Travis CI build.
8. If you have found a potential security vulnerability, please DO NOT report it on the public issue tracker. Instead, send it to us at contributors@vuestorefront.io. We will work with you to verify and fix it as soon as possible.
(https://github.com/DivanteLtd/vue-storefront/blob/master/README.md#documentation--table-of-contents))


