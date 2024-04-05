# @vue-storefront/integrations-tsconfig

> Common tsconfig configuration for Alokai Integrations

## Usage

### Install

```bash
yarn add -D @vue-storefront/integrations-tsconfig
```

### Extending tsconfig

You need a configuration file in your package root:

```json
{
  "extends": "@vue-storefront/integrations-tsconfig",
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "./lib",
    "declarationDir": "./lib",
    "declaration": true,
    "rootDir": "./src"
  },
  "exclude": ["node_modules"],
  "include": ["src/**/*"]
}
```
