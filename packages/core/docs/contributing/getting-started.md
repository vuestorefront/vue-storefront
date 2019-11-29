# Getting started

## Project setup

1. Clone the repo
```bash
git clone https://github.com/filrak/next.git
```
2. Install dependencies
```bash
yarn
```
3. Build packages (`api-client`, `composables`, `core`)
```bash
yarn build:tools
```

**For development:**
1. Run project
```bash
yarn dev
```
2. (optional) Watch for changes in `api-client` in another terminal window
```bash
yarn dev:api-client
```
**For production:**
1. Build project with raw/esm versions of dependencies
```
yarn build
```
## Packages

### `api-client`

Tiny abstraction layer over VSF API.

**Independent build**
```
yarn build:api-client
```

### `core`

TypeScript interfaces for Vue Storefront Integrations.

**Independent build:**
```
yarn build:core
```


### `composables`

Default Vue Storefront integration with `vue-storefront-api`. Contains helpers and Vue composables

**Independent build:**
```
yarn build:composables
```

### `theme`

Boilerplate for Nuxt-based Vue Storefront theme. Currently only for standard integration with `vue-storefront-api`

### `docs`

Documentation

**Independent build:**
```
yarn build:docs
```