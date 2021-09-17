# Contribution basics

We are delighted that you want to contribute to Vue Storefront. But first, you need to know that we use some standards to maintain a good community and have an aligned code history.

## Starting

To start your contribution, you first can pick an issue from our [GitHub](https://github.com/DivanteLtd/vue-storefront/) that has a label [`bug`](https://github.com/vuestorefront/vue-storefront/issues?q=is%3Aopen+is%3Aissue+label%3Abug), [`feature request`](https://github.com/vuestorefront/vue-storefront/issues?q=is%3Aopen+is%3Aissue+label%3A%22feature+request%22), [`docs`](https://github.com/vuestorefront/vue-storefront/issues?q=is%3Aopen+is%3Aissue+label%3Adocs), [`good first issue`](https://github.com/vuestorefront/vue-storefront/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) or you can create your issue alongside your pull request.

## Coding Rules

To keep the code base of our repository neat, we apply a set of rules for our contributors. These rules are established by our core maintainers, so you will find an organized code repository no matter where you come.

## Code Standards

- `eslint` is king
- Favor micro-library over swiss army knives (`rimraf`, `ncp` vs. `fs-extra`) - Just in case you really need one :)
- Follow the coding naming [style and conventions](api-design-philosophy.html)
- Always provide a [changelog](creating-changelog.html) and update the documentation if needed
- Add tests for your changes, and see if the current tests are no conflicting with the changes you made

## Commit standards

To create a commit history line where everyone can understand and follow the core maintainers, use a set of common rules that is simple and easy to use.

>To make everyone's life easier, the repository is commitizen friendly and provides the npm run-script `commit`.

- Use the [conventional-changelog](https://github.com/conventional-changelog) pattern
- We have husky commit message hook available
- Always use present tense phrases
- The commit message must have a maximum of 100 characters
- The commit message format must be in the format `$type($scope): $message`

## Create a pull request

Being part of an open-source project is one of a kind experience. Where you will learn, improve your skill and help everyone in the community at the same time.

We have to remember to check our checklist before opening a pull request and make sure that the PR follows the standards so it can be approved faster.

- The code follow our [code standards](#code-standards)
- The commit line follow our [commit standards](#commit-standards)
- The docs have been updated (if needed)
- The changelog has been updated
- The pull request template is fully filled with information about the PR
- The CLA on the PR is signed by the commits authors
- There are no conflicts on the pull request
- All GitHub actions has passed
