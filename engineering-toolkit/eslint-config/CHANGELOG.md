# @vue-storefront/eslint-config

## 4.0.2

### Patch Changes

- **[CHANGED]** Update typescript-eslint to version that supports the new TypeScript 5.7

## 4.0.1

### Patch Changes

**[FIXED]**: Additional configuration overrides type.

## 4.0.0

### Major Changes

**[BREAKING]**: The `@vue-storefront/eslint-config` is migrated to support ESLint v9 and FlatConfig. Please upgrade following way:

**Step 1: Update Dependencies**

First, update your project dependencies to use the latest versions of ESLint and Prettier.

```bash
yarn add -D eslint@^9 prettier@^3 @vue-storefront/eslint-config@^4
```

**Step 2: Update ESLint Configuration**

Replace your existing ESLint configuration with the new configuration format. Below is a basic example from the `README.md`:

```js
import { ecma, typescript, style, concat } from "@vue-storefront/eslint-config";

export default concat(
  ecma(),
  typescript(),
  style()
  // Here it's a place for you custom configuration
);
```

Read more about FlatConfig in [ESLint docs](https://eslint.org/docs/latest/use/configure/).

## 3.1.3

### Patch Changes

- **[CHANGED]** Filename casing lint rule in `@vue-storefront/eslint-config/next`. From now kebab-case is preferred for filenames.

## 3.1.2

### Patch Changes

- **[FIXED]** Next strict configuration error

## 3.1.1

### Patch Changes

- **[FIXED]** - Eslint plugin installation error

## 3.1.0

### Minor Changes

**[ADDED]** Eslint rules for Next.js v14

## 3.0.0

### Major Changes

- **[CHANGED]** Changed minimum Node version from 16 to 18. The condition that was forcing the Node version to be lower than 19 is also removed.

## 2.0.0

### Patch Changes

- **[REMOVED]** Plugin "eslint-plugin-no-unsanitized" was removed due to a license that was noncompliant with our Open Source Guidelines
