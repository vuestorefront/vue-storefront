# Contributing

Yeay! You want to contribute to @vuestorefront/redis-driver. That's amazing! To smoothen everyone's experience involved with the project please take note of the following guidelines and rules.


## Found an Issue?

Thank you for reporting any issues you find. We do our best to test and make @vuestorefront/redis-driver as solid as possible, but any reported issue is a real help.

Please follow these guidelines when reporting issues:

- Provide a title in the format of `<Error> when <Task>`
- Tag your issue with the tag `bug`
- Provide a short summary of what you are trying to do
- Provide the log of the encountered error if applicable
- Provide the exact version of @vuestorefront/redis-driver.
- Be awesome and consider contributing a [pull request](#want-to-contribute)

## Want to contribute?

You consider contributing changes to @vuestorefront/redis-driver – we dig that!
Please consider these guidelines when filing a pull request:

> @vuestorefront/redis-driver pull requests

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

To keep the code base of @vuestorefront/redis-driver neat and tidy the following rules apply to every change

> Coding standards

- `eslint` is king
- Favor micro library over swiss army knives (rimraf, ncp vs. fs-extra)
- Be awesome

## Commit Rules

To help everyone with understanding the commit history of commitlint the following commit rules are enforced.
To make your life easier @vuestorefront/redis-driver is commitizen-friendly and provides the npm run-script `commit`.

> Commit standards

- [conventional-changelog](https://github.com/conventional-changelog)
- husky commit message hook available
- present tense
- maximum of 100 characters
- message format of `$type($scope): $message`

## Definition of done
Issue is considered complete when:
1. The issue has precise requirements (acceptance criteria) - if issue description is not clear, please reach us out by adding the comment to the issue
2. Those requirements are implemented in the code
3. Code is covered by tests (at least unit or integration)
4. Code is reviewed and approved by at least 1 person
5. Code is deployed to the dev environment and tested by the developer
6. Code is deployed to the stage as a part of a release. (we will be releasing a new version after each sprint) and tested by the Q.A. engineer
   1. tests including manual regression testing, usability, accessibility, and whether the business requirements are met
7. Finally, the ticket is approved by the team leader/product owner and marked as done
