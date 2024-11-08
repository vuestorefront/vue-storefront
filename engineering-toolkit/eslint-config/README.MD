# @vue-storefront/eslint-config

> Common ESLint configuration used in Alokai projects. These configurations are compatible with ESLint 9.

## Usage

### Install

```bash
yarn add -D eslint prettier @vue-storefront/eslint-config
```

### Building Blocks

This ESLint configuration is composed of several building blocks, each tailored for specific use cases:

- `ecma`: For ECMAScript projects.
- `typescript`: For TypeScript projects.
- `style`: For Prettier and Perfectionist plugins.
- `nextjs`: For Next.js projects.
- `playwright`: For Playwright projects.
- `architecture`: For enforcing architectural rules.

### Options

All options are optional. You don't have to set these options if you are okay with the default configuration.

#### `ecma`

- `files` (default: `"**/*.{mjs,cjs,js,jsx}"`): The glob pattern for files to lint.
- `isStrict` (default: `true`): Enables extra rules for stricter checking.
- `withImport` (default: `true`): Enables `eslint-plugin-import`.


#### `typescript`

- `files` (default: `"**/*.{ts,tsx,mts,cts,mtsx,ctsx}"`): The glob pattern for files to lint.
- `isStrict` (default: `true`): Enables extra rules for stricter checking.
- `withImport` (default: `true`): Enables `eslint-plugin-import`.

### `style`

- `files` (default: `"**/*.{mjs,cjs,js,jsx,ts,tsx,mts,cts,mtsx,ctsx}"`): The glob pattern for files to lint.

### `nextjs`

- `files` (default: `"**/*.{mjs,cjs,js,jsx,ts,tsx,mts,cts,mtsx,ctsx}"`): The glob pattern for files to lint.
Here you can pass the general file glob pattern for all directories with Next.js/React code. But for better results please pass the glob for the components folders and hooks. Those two are passed to the special rules just for them.

```ts
files: {
  general: "**/*.{js,jsx,ts,tsx}",
  components: "src/components/**/*.{js,jsx,ts,tsx}",
  hooks: "src/hooks/**/*.{js,jsx,ts,tsx}"
}
```

- `isStrict` (default: `true`): Enables extra rules for stricter checking.

### `playwright`

- `files` (default: `"**/*.test.ts"`): The glob pattern for files to lint.

### `architecture`

- `files` (default: `"**/*.{mjs,cjs,js,jsx,ts,tsx,mts,cts,mtsx,ctsx}"`): The glob pattern for files to lint.
- `maxComplexity` (default: `6`): The maximum cyclomatic complexity allowed in a program.
- `maxDepth` (default: `4`): The maximum depth that blocks can be nested.
- `maxStatementsPerLine` (default: `1`): The maximum number of statements allowed per line.
- `maxLines` (default: `300`): The maximum number of lines per file.
- `maxLinesPerFunction` (default: `60`): The maximum number of lines of code in a function.
- `maxStatements` (default: `10`): The maximum number of statements allowed in function blocks.
- `maxNestedCallbacks` (default: `5`): The maximum depth that callbacks can be nested.
- `maxParams` (default: `3`): The maximum number of parameters in function definitions.


## Example configurations

### Config `eslint.config.js`

```javascript
import { ecma, typescript, style } from "@vue-storefront/eslint-config";

export default [
  ecma(),
  typescript(),
  style()
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

## Used rulesets & plugins

- [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [no-secrets](https://github.com/nickdeis/eslint-plugin-no-secrets)
- [promise](https://github.com/eslint-community/eslint-plugin-promise)
- [unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports)
- [prettier](https://github.com/prettier/eslint-plugin-prettier)
