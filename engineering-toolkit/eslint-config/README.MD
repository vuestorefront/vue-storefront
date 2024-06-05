# @vue-storefront/eslint-config

> Common eslint configuration used in alokai projects

## Usage

#### Install

```bash
yarn add -D eslint prettier @vue-storefront/eslint-config
```

#### Config `.eslintrc`

```json
{
  "extends": "@vue-storefront/eslint-config"
}
```

### Without Prettier `.eslintrc`

If you do not want to use `prettier`, you can easily compose your own config:

```json
{
  "extends": [
    "@vue-storefront/eslint-config/ecma",
    "@vue-storefront/eslint-config/typescript",
    "@vue-storefront/eslint-config/json"
  ]
}
```

### Usage with React `.eslintrc`

Vue Storefront `React` specific linting rules.

```json
{
  "extends": [
    "@vue-storefront/eslint-config",
    "@vue-storefront/eslint-config/react"
  ]
}
```

### Usage with Vue `.eslintrc`

Vue Storefront `Vue` specific linting rules.

```json
{
  "extends": [
    "@vue-storefront/eslint-config",
    "@vue-storefront/eslint-config/vue"
  ]
}
```

### Usage with Vue3 `.eslintrc`

Vue Storefront `Vue3` specific linting rules.

```json
{
  "extends": [
    "@vue-storefront/eslint-config",
    "@vue-storefront/eslint-config/vue3"
  ]
}
```

### Usage with NextJs `.eslintrc`

Vue Storefront `NextJs` specific linting rules.

```json
{
  "extends": [
    "@vue-storefront/eslint-config/next"
  ]
}
```

## Used rulesets & plugins

- [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [no-secrets](https://github.com/nickdeis/eslint-plugin-no-secrets)
- [promise](https://github.com/eslint-community/eslint-plugin-promise)
- [sonarjs](https://github.com/SonarSource/eslint-plugin-sonarjs)
- [@microsoft/sdl](https://github.com/microsoft/eslint-plugin-sdl)
- [unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports)
- [prettier](https://github.com/prettier/eslint-plugin-prettier)

