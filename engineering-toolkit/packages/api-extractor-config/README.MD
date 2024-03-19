# @vue-storefront/api-extractor-config

> Common API Extractor configuration for Alokai Integrations

## Usage

### Install

```bash
yarn add -D @vue-storefront/api-extractor-config
```

### Package configuration

First, you need a configuration file in your package root:

```json
{
  "extends": "@vue-storefront/api-extractor-config",
  "mainEntryPointFilePath": "./lib/api-extractor-data.d.ts",
  "projectFolder": ".",
  "compiler": {
    "tsconfigFilePath": "<projectFolder>/tsconfig.json"
  },
  "dtsRollup": {
    "untrimmedFilePath": "./lib/<unscopedPackageName>.d.ts"
  },
  "docModel": {
    "apiJsonFilePath": "<projectFolder>/../../docs/reference/api/<unscopedPackageName>.api.json"
  }
}
```

This configuration assumes, that you have also a file `src/api-extractor-data.ts` in your project that exports the API definitions:

```ts
/**
 * Package documentation description.
 *
 * @packageDocumentation
 */

export * from "./types";
// etc...
```

`mainEntryPointFilePath` points to `lib`, so you need to build your package before running API Extractor.
