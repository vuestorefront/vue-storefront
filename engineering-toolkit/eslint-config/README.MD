# @vue-storefront/eslint-config

> Common ESLint configuration used in Alokai projects. These configurations are compatible with ESLint 9.

## Usage

### Install

```bash
yarn add -D eslint prettier @vue-storefront/eslint-config
```

### Config `eslint.config.js`

```javascript
import { ecma, typescript, style } from "@vue-storefront/eslint-config";

export default [
  ecma({
    files: "**/*.{js,jsx,ts,tsx}",
    // Enabling extra rules, for stricter checking, enabled by default
    isStrict: true,
    // Enabling eslint-plugin-import, enabled by default
    withImport: true,
  }),
  typescript({
    files: "**/*.{ts,tsx}",
    isStrict: true,
    withImport: true,
  }),
  style({
    files: "**/*.{js,jsx,ts,tsx}"
  })
];
```

### Usage with Next.js `eslint.config.js`

Vue Storefront `Next.js` specific linting rules.

```javascript
import { ecma, nextjs } from "@vue-storefront/eslint-config";

export default [
  ecma(),
  nextjs({
    files: {
      general: "**/*.{js,jsx,ts,tsx}",
      components: "src/components/**/*.{js,jsx,ts,tsx}",
      hooks: "src/hooks/**/*.{js,jsx,ts,tsx}"
    },
    isStrict: true
  })
];
```

### Usage with Nuxt 3

For projects using Nuxt 3, we recommend using the Nuxt ESLint module and adding styling and architecture configurations to it.

Here is a basic config using the ESLint Nuxt module:

```javascript
import withNuxt from './.nuxt/eslint.config.mjs';
import { ecma, typescript, style, architecture } from "@vue-storefront/eslint-config";

export default withNuxt(
  ecma(),
  typescript(),
  style(),
  architecture({
    maxComplexity: 10,
    maxDepth: 5,
    maxStatementsPerLine: 1,
    maxLines: 500,
    maxLinesPerFunction: 100,
    maxStatements: 15,
    maxNestedCallbacks: 3,
    maxParams: 4
  })
);
```

### Usage with Node.js `eslint.config.js`

Vue Storefront `Node.js` specific linting rules.

```javascript
import { ecma } from "@vue-storefront/eslint-config";

export default [
  ecma()
];
```

### Usage with Playwright `eslint.config.js`

Vue Storefront `Playwright` specific linting rules.

```javascript
import { ecma, playwright } from "@vue-storefront/eslint-config";

export default [
  ecma(),
  playwright({
    files: "**/*.test.ts",
    isStrict: true
  })
];
```

### Usage with TypeScript `eslint.config.js`

Vue Storefront `TypeScript` specific linting rules.

```javascript
import { ecma, typescript } from "@vue-storefront/eslint-config";

export default [
  ecma(),
  typescript()
];
```

### Usage with Architectural Rules `eslint.config.js`

Vue Storefront `Architectural` specific linting rules.

```javascript
import { ecma, architecture } from "@vue-storefront/eslint-config";

export default [
  ecma(),
  architecture({
    maxComplexity: 10,
    maxDepth: 5,
    maxStatementsPerLine: 1,
    maxLines: 500,
    maxLinesPerFunction: 100,
    maxStatements: 15,
    maxNestedCallbacks: 3,
    maxParams: 4
  })
];
```

### Using `concat` function

You can use the `concat` function to combine configurations from different sources.

```javascript
import { ecma, typescript, concat } from "@vue-storefront/eslint-config";
import customConfig from "./custom-eslint-config";

export default concat(
  ecma(),
  typescript(),
  customConfig
);
```

### Overriding rules in a factory

You can override rules in one of our factories by passing a custom rules object.

```javascript
import { ecma, typescript } from "@vue-storefront/eslint-config";

export default [
  ecma(),
  typescript({}, {
    name: 'custom-config',
    files: ['**/*.ts'],
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }]
    }
  })
];
```

## Available Configurations

- `@vue-storefront/eslint-config` - Base configuration.
- `@vue-storefront/eslint-config/ecma` - ECMAScript configuration.
- `@vue-storefront/eslint-config/typescript` - TypeScript configuration.
- `@vue-storefront/eslint-config/nextjs` - Next.js configuration.
- `@vue-storefront/eslint-config/playwright` - Playwright configuration.
- `@vue-storefront/eslint-config/architecture` - Architectural rules configuration.
- `@vue-storefront/eslint-config/style` - Style configuration with Prettier and Perfectionist plugins.

## Used rulesets & plugins

- [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [no-secrets](https://github.com/nickdeis/eslint-plugin-no-secrets)
- [promise](https://github.com/eslint-community/eslint-plugin-promise)
- [unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports)
- [prettier](https://github.com/prettier/eslint-plugin-prettier)
