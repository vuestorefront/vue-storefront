# How to submit a Pull Request

:::tip Having troubles?
Want to contribute to our codebase, but face any issues following this guide? Reach out to the Vue Storefront team on our [Discord](https://discord.vuestorefront.io) server. We are happy to help you get started 😊
:::

This document will show you how to submit a Pull Request to any of our [repositories](https://github.com/vuestorefront). These steps are required to ensure high quality and ease of updating for depending projects and integrations.

## Check your tools

Like every other artisan, we need to ensure we have all the tools necessary to do our work. In our case we need [Yarn 1](https://classic.yarnpkg.com/en/docs/install) and [Git](https://git-scm.com/downloads). To verify that you have these tools installed, open the terminal and run both commands:

```bash
git --version
yarn --version
```

## Pick a target branch

Before starting to code, you need to **fork our repository** and find out which branch to base from. We recommend getting familiar with our [Branching model](./branching-model.html).

## Start coding

Before you start coding, make sure to run the following command to install all necessary dependencies:

```bash
yarn install
```

This command will install tools like `eslint`, `husky`, and a few others that will ensure that your code follows our rules and conventions.

Whenever possible, make sure to **use TypeScript and provide typings** for your code while avoiding the `any` type.

If you need to add external dependencies to our codebase, **favor micro-libraries over swiss army knives**. However, if possible, we try to avoid adding new dependencies if a few lines of code can replace them.

## Manually test the changes

Once your changes are ready, manually test them in `development` and `production` modes.

If the repository contains a Vue Storefront project (often called `theme`), run all the `build` commands defined in the `package.json` file and start the project to test it. If everything works as expected, you can go to the next section.

If there is no Vue Storefront project, create a new project using our [Installation](/getting-started/installation.html) guide. Then, open its `package.json` file and look for the name of the package you modified in the `dependencies` or `devDependencies`.

If it's there, change the version to the `link` like so:

```json
// package.json
{
  "dependencies": {
    // before
    "@vue-storefront/some-package": "^2.5.0",

    // after
    "@vue-storefront/some-package": "link:/absolute/path/to/modified/package"
  }
}
```

If it's an indirect dependency (dependency of another package) and not present in the `package.json`, use the [Selective dependency resolutions](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/), like so:

```json
// package.json
{
  "resolutions": {
    "@vue-storefront/some-package": "link:/absolute/path/to/modified/package"
  }
}
```

The steps above will tell Yarn to use your locally modified package instead of pulling it from the npm.

Then, run the following commands to update the dependencies and run your application:

```bash
yarn install
yarn dev
```

## Update unit and E2E tests

When you confirm that the application works as expected, it's time to see if the tests are still passing. If possible, it's a good practice to add new tests if the old ones don't cover your changes.

Open the `package.json` file and see if there are one or more `test` commands. If so, run them to see if there are no errors. If there are some, fix them before committing your changes.

## Update documentation

Now it's time to update the documentation. If your change is a bug fix, it likely doesn't require any updates to the documentation. However, it might be needed if you add new functionality or change the behavior of the existing one. Open the official documentation for the package and see which documents need updating. Then, look for the `docs` folder in the project and find the document you want to update - the path inside this folder will match the documentation URL.

## Commit and push your changes

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), which requires specific commit messages and Pull Request title formats. Later these messages are used to automate the changelog generation using the [Angular changelog preset](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular) to inform the community and our partners about what changed with the given release.

A commit message consists of a header, body, and footer. The header has a type, scope, and subject:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

**The header is mandatory, and the scope of the header is optional.** The subject contains a short description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes",
* don't capitalize the first letter,
* no dot (.) at the end,
* don't exceed 100 characters.

See the [Examples](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular#examples) section for more details.

## Create a Pull Request

It's time to create a Pull Request. When doing so, try to fill in the form, including the description, related issues, etc. Refer to the [Branching model](./branching-model.html) document to correctly pick the target branch.

Wait to see if all GitHub Actions completed successfully. If not, go into the details to see what caused an issue.
