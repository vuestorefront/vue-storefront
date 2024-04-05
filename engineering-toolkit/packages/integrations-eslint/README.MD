# @vue-storefront/eslint-config-integrations

> Common eslint configuration for Alokai Integrations

## Usage

### Install

```bash
yarn add -D @vue-storefront/eslint-config-integrations
```

### Extending tsconfig

You need a configuration file in your package root:

```json
{
  "extends": "@vue-storefront/eslint-config-integrations"
}
```

### Troubleshooting

If you ever come across the error that `ESLint couldn't find the plugin "@typescript-eslint/eslint-plugin".`, and ./node_modules/@typescript-eslint/eslint-plugin is indeed non-existent,
try removing eslint from the root package.json. Your package manager will then fetch the matching ESLint version that are given by this package.
