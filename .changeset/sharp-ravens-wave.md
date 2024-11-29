---
"@vue-storefront/eslint-config": minor
---

**[CHANGED]** some rules to loose up linting a bit (non-breaking). Changes include:

- `import/no-anonymous-default-export`: got turned off, as it brings no real value, more about the rule [here](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md),
- `@typescript-eslint/no-use-before-define`: `functions` option has been set as `false` to allow usage of hoisted functions. More details in [the documentation](https://eslint.org/docs/latest/rules/no-use-before-define#options).
