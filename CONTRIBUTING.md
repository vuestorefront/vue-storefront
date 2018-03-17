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

Here’s how to submit a pull request:

1. Fork the repository and clone it locally. Connect your local repository to the original “upstream” repository by adding it as a remote repository. Pull in changes from “upstream” often in order to stay up to date so that when you submit your pull request, merge conflicts will be less likely.
2. Create a branch for your edits. Use the following branch naming conventions:
 * bugfix/task-title
 * feature/task-name
3. Reference any relevant issues or supporting documentation in your PR (ex. “Issue: 39. Issue title.”).
4. Test your changes! Run your changes against any existing tests and create new ones when needed. Make sure your changes don’t break the existing project.
5. Make sure that your pull request also meets the case-specific requirements listed below.
6. If you have found a potential security vulnerability, please DO NOT report it on the public issue tracker. Instead, send it to us at contributors@vuestorefront.io. We will work with you to verify and fix it as soon as possible.

### Visual changes/new features

1. Be sure that you are following all theme conventions (you can find most of them linked in [README](https://github.com/DivanteLtd/vue-storefront/blob/master/README.md#documentation--table-of-contents))
2. Include screenshots of the new feature or the before and after if your changes include differences in HTML/CSS. Drag and drop the images into the body of your pull request.

### New core components

1. Each new core component should be properly docummented (create docs file with PR). If the component should be accesible via mixin you should specify the public data and methods that will be available in the theme components using this mixin. Before creating the docs taka a look at other core components guideness and try to do something similar (see it [here](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/components))
2. Core components shouldn't provide any html/css. The exception is when the component's behavior depends on css (for example Modal component)
3. Read [Working with components](https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/Working%20with%20components.md) guideness before creating new component.
