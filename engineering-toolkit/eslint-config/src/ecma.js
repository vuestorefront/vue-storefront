module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "plugin:sonarjs/recommended",
  ],
  plugins: [
    "promise",
    "sonarjs",
    "unicorn",
    "no-secrets",
    "@microsoft/sdl",
    "unused-imports",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: [
    "*.min.*",
    "*.d.ts",
    "CHANGELOG.md",
    "dist",
    "LICENSE*",
    "output",
    "out",
    "coverage",
    "public",
    "temp",
    "package-lock.json",
    "pnpm-lock.yaml",
    "yarn.lock",
    "__tests__",
    "__snapshots__",
    "*.css",
    "*.png",
    "*.ico",
    "*.toml",
    "*.patch",
    "*.txt",
    "*.crt",
    "*.key",
    "Dockerfile",
  ],
  rules: {
    /* General */

    /* Enforce a maximum cyclomatic complexity allowed in a program */
    complexity: ["error", 6],
    /* Cognitive complexity is a measure of how hard the control flow of a function is to understand */
    "sonarjs/cognitive-complexity": ["error", 15],
    /* Enforce a maximum depth that blocks can be nested */
    "max-depth": ["error", 4],
    /* Enforce a maximum number of statements allowed per line */
    "max-statements-per-line": ["error", { max: 1 }],
    /* Enforce a maximum number of lines per file */
    "max-lines": ["error", { max: 300 }],
    /* Enforce a maximum number of lines of code in a function */
    "max-lines-per-function": ["error", { max: 60, skipBlankLines: true }],
    /* Enforce a maximum number of statements allowed in function blocks */
    "max-statements": ["error", 10],
    /* Enforce a maximum depth that callbacks can be nested */
    "max-nested-callbacks": ["error", 5],
    /* Enforce a maximum number of parameters in function definitions */
    "max-params": ["error", 3],
    /* Require parentheses around arrow function arguments */
    "arrow-parens": ["error", "as-needed", { requireForBlockBody: true }],
    /* Disallow specified syntax */
    "no-restricted-syntax": [
      "error",
      "DebuggerStatement",
      "LabeledStatement",
      "WithStatement",
    ],
    /* Disallow the use of debugger */
    "no-debugger": "error",
    /* Disallow the use of console */
    "no-console": ["error", { allow: ["warn", "error"] }],
    /* Do not allows to import modules that are not used */
    "unused-imports/no-unused-imports": "error",
    /* Eliminating unused variables, functions, and function parameters */
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    /* Best practices */

    /* Enforce return statements in callbacks of array methods */
    "array-callback-return": "error",
    /* Disallow the use of alert, confirm, and prompt */
    "no-alert": "warn",
    /* Require the use of === and !== */
    eqeqeq: ["error", "smart"],
    /* Disallow multiple spaces */
    "no-multi-spaces": "error",
    /* Disallow the use of variables before they are defined */
    "no-use-before-define": [
      "error",
      { functions: false, classes: false, variables: true },
    ],
    /* Require let or const instead of var */
    "no-var": "error",

    /* Unicorns */

    /* Enforce to pass error message when throwing errors */
    "unicorn/error-message": "error",
    /* Enforce usage of Array.isArray instead of instanceof Array */
    "unicorn/no-instanceof-array": "error",
    /* Perfer includes over indexOf when checking for existence */
    "unicorn/prefer-includes": "error",
    /* Prefer startsWith() and endsWith() over using a regex with /^foo/ or /foo$/. */
    "unicorn/prefer-string-starts-ends-with": "error",
    /* Enforce throwing TypeError when throwing error while checking typeof */
    "unicorn/prefer-type-error": "error",
    /* Enforce to use new keyword when throwing error */
    "unicorn/throw-new-error": "error",
    /* Enforce combining multiple Array#push() into one call */
    "unicorn/no-array-push-push": "error",
    /* Disallow identifiers starting with new or class */
    "unicorn/no-keyword-prefix": "error",
    /* Prevent calling EventTarget#removeEventListener() with the result of an expression. */
    "unicorn/no-invalid-remove-event-listener": "error",
    /* This rule makes it possible to pass arguments to TODO, FIXME comments */
    "unicorn/expiring-todo-comments": [
      "error",
      {
        ignoreDatesOnPullRequests: true,
      },
    ],
    /* Prevents usage of document.cookie directly. */
    "unicorn/no-document-cookie": "error",
    /* Disallow nested ternary expressions. */
    "unicorn/no-nested-ternary": "error",
    /* Prefer Date.now() to get the number of milliseconds since the Unix Epoch. */
    "unicorn/prefer-date-now": "error",
    /* Disabled as VueStorefront delivers CommonJS and ES modules */
    "unicorn/prefer-module": "off",
    /* Using Array.prototype.forEach is not restricted */
    "unicorn/no-array-for-each": "off",
    /* Using Array.prototype.reduce and reduceRight is not restricted */
    "unicorn/no-array-reduce": "off",
    /* Using null literal is not restriced  */
    "unicorn/no-null": "off",
    /* Prevent usage of abbreviations  */
    "unicorn/prevent-abbreviations": [
      "warn",
      {
        replacements: {
          e: false,
          err: false,
          req: false,
          params: false,
          props: false,
          attrs: false,
        },
      },
    ],
    /* Enforce camelCase and PascalCase for filenames */
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
          kebabCase: false,
          snakeCase: false,
        },
      },
    ],
    /* Prevent abusive eslint disable in comments */
    "unicorn/no-abusive-eslint-disable": "error",

    /* Security and Misconfiguration */

    /* Prefer to use Web Storage, IndexedDB or other modern methods for client side storage */
    "@microsoft/sdl/no-cookies": "warn",
    /* Writes to document.domain property must be reviewed to avoid bypass of same-origin checks. */
    "@microsoft/sdl/no-document-domain": "error",
    /* Prevent writes to DOM directly using document.write */
    "@microsoft/sdl/no-document-write": "error",
    /* Do not write to DOM directly using innerHTML method */
    "@microsoft/sdl/no-inner-html": "error",
    /* Do not use insecure URLs */
    "@microsoft/sdl/no-insecure-url": "error",
    /* Do not use * as target origin when sending data to other windows */
    "@microsoft/sdl/no-postmessage-star-origin": "error",
    /* Prevents from exposing secrets or keys in the code */
    "no-secrets/no-secrets": "error",
  },
};
