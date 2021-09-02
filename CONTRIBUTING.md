# Contributing

We are very happy that you want to contribute to Vue Storefront. 
To create a perfect experience for everyone in the community, there are a set of rules and best practices which our repository got.

Please take note of the following guidelines and rules.

## Found an Issue?

Thank you for reporting any issues you find. 

We do our best to test and make our repository as solid as possible, but any reported issue is a real help.

Please follow these guidelines when reporting issues:

- Provide a title in the format of Ex: `[BUG]: <Error> when <Task>`, `[Issue]: When I try to <x>, an <Error> appears`
- Tag your issue with the tag `triage-needed`
- Provide a short summary of what you are trying to do
- Provide the log of the encountered error if applicable
- Provide the exact version of the framework you are using.
- Be awesome and consider contributing a [pull request](#want-to-contribute)

## Want to contribute?

You consider contributing changes to our framework, this is awesome!

Please consider these guidelines when filing a pull request:

- Follow the [Coding Rules](#coding-rules)
- Follow the [Commit Rules](#commit-rules)
- Make sure you rebased the current master branch when filing the pull request
- Squash your commits when filing the pull request
- Provide a short title with a maximum of 100 characters
- Provide a more detailed description containing
  _ What you want to achieve
  _ What you changed
  _ What you added
  _ What you removed

## Coding Rules

To keep the code base of our repository neat and tidy, we apply a set of rules to every change

> Coding standards

- `eslint` is king
- Favor micro library over swiss army knives (rimraf, ncp vs. fs-extra) - Just in case you really need one :)
- Be awesome

## Commit Rules

To help everyone with understanding the commit history of commits the following rules are enforced.

To make your life easier our repository is commitizen-friendly and provides the npm run-script `commit`.

> Commit standards

- [conventional-changelog](https://github.com/conventional-changelog)
- husky commit message hook available
- present tense
- maximum of 100 characters
- message format of `$type($scope): $message`
