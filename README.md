# Vue Storefront Next

[![Coverage Status](https://coveralls.io/repos/github/DivanteLtd/next/badge.svg?branch=master)](https://coveralls.io/github/DivanteLtd/next?branch=master)

This project is on the early stages of development. It's not usable yet. Once its production ready this repo will be merged into the [main repo](https://github.com/DivanteLtd/vue-storefront/).

## What you need
* [Lerna](https://github.com/lerna/lerna) - Monorepo manager
* [Typescript](https://www.typescriptlang.org/docs/home.html) - JavaScript superset


## Development
**Installing dependencies:**
In root:

```sh
$ lerna bootstrap
```

**Verify by building packages:**
In root:

```sh
yarn build:prismic
yarn build:ct:tools
```

**Run the commercetools application**
```sh
yarn dev:ct
```