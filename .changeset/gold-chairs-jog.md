---
"@vue-storefront/eslint-config": major
---

**[BREAKING]**: The ``@vue-storefront/eslint-config` is migrated to support ESLint v9 and FlatConfig. Please upgrade following way:

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
  style(),
  // Here it's a place for you custom configuration
);
```

Read more about FlatConfig in [ESLint docs](https://eslint.org/docs/latest/use/configure/).
