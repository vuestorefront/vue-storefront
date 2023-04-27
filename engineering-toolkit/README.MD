# @vuestorefront/engineering-toolkit

> Vue Storefront engineering standards

## Information

Welcome to our GitHub repository! This repository is dedicated to describing engineering standards for our projects. Here, you'll find guidelines and best practices for code conventions, ESLint configurations, and other engineering tools.

Code conventions are important for us to maintaining a consistent and readable codebase. By following the guidelines in this repository, our team can ensure that our code is easy to read, understand, and maintain. We'll also reduce the chance of introducing errors or inconsistencies.

We believe that following engineering standards is essential for building high-quality, maintainable software.

## 🔧 Installation

Please follow the steps described below to correctly setup repository.

#### Required system dependencies

-   [NodeJS](https://nodejs.org/en/) -  JavaScript runtime environment.
-   [yarn](https://yarnpkg.com/) - package manager used to maintain project dependencies

### a. NodeJS

Install `NodeJS` JavaScript runtime based on your environment of choice:

For Homebrew on OS X and macOS

```sh
brew install node
```

You can also download and install NodeJS directly from the [official website](https://nodejs.org/en/).

Ensure that `NodeJS` environment is at least v16.

### b. Yarn

Install `yarn` [package manager](https://yarnpkg.com/getting-started/install):

### c. Checkout repository

Checkout repository from `main` branch.

### d. Install dependencies

Execute `yarn` command in terminal to install all required dependencies.

### e. Configure GIT hooks

Execute `yarn prepare` command in terminal to setup GIT `pre-commit` and `commit-msg` hooks integration.


## Structure
This project repository follows the mono-repository pattern, and it's split into two workspaces:

- `github-actions`
- `packages`

The directory named `packages` is exclusively reserved for NPM packages used throughout the engineering organization.

In the directory `github-actions`, a collection of GitHub actions are available that can be conveniently incorporated into GitHub Workflows.

## ✨ npm scripts

List of useful commands that could be used by developers. Execution in the command-line interface should be prefixed with `yarn` package manager.

| Command  | Description                                          |
| -------- | ---------------------------------------------------- |
| `build`  | build distributions                                  |
| `lint`   | run linter against codebase.                         |
| `format` | run code formatter process against current codebase. |


## License

[MIT License](./LICENSE)

Copyright (c) Vue Storefront