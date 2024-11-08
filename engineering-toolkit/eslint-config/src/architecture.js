import { concat, defineFlatConfig } from "eslint-flat-config-utils";

/**
 * Generates an ESLint Flat Config for enforcing architectural rules.
 *
 * @param {{
 *   files?: string,
 *   maxComplexity?: number,
 *   maxDepth?: number,
 *   maxStatementsPerLine?: number,
 *   maxLines?: number,
 *   maxLinesPerFunction?: number,
 *   maxStatements?: number,
 *   maxNestedCallbacks?: number,
 *   maxParams?: number
 * }} config - The base configuration object with optional fields for files and rule parameters.
 * @param {string} [config.files="**\/*.{mjs,cjs,js,jsx,ts,tsx,mts,cts,mtsx,ctsx}"] - The glob pattern for files to lint.
 * @param {number} [config.maxComplexity=6] - The maximum cyclomatic complexity allowed in a program.
 * @param {number} [config.maxDepth=4] - The maximum depth that blocks can be nested.
 * @param {number} [config.maxStatementsPerLine=1] - The maximum number of statements allowed per line.
 * @param {number} [config.maxLines=300] - The maximum number of lines per file.
 * @param {number} [config.maxLinesPerFunction=60] - The maximum number of lines of code in a function.
 * @param {number} [config.maxStatements=10] - The maximum number of statements allowed in function blocks.
 * @param {number} [config.maxNestedCallbacks=5] - The maximum depth that callbacks can be nested.
 * @param {number} [config.maxParams=3] - The maximum number of parameters in function definitions.
 * @param {...import('eslint').Linter.Config} overrides - Additional configuration overrides.
 * @returns {import('eslint').Linter.Config} The concatenated ESLint configuration.
 */
export function architecture(config, ...overrides) {
  const {
    files = "**/*.{mjs,cjs,js,jsx,ts,tsx,mts,cts,mtsx,ctsx}",
    maxComplexity = 6,
    maxDepth = 4,
    maxLines = 300,
    maxLinesPerFunction = 60,
    maxNestedCallbacks = 5,
    maxParams = 3,
    maxStatements = 10,
    maxStatementsPerLine = 1,
  } = config ?? {};

  return concat(
    defineFlatConfig({
      files: [files],
      name: "strict/architecture",
      rules: {
        /* Require parentheses around arrow function arguments */
        "arrow-parens": ["error", "as-needed", { requireForBlockBody: true }],
        /* Enforce a maximum cyclomatic complexity allowed in a program */
        complexity: ["error", maxComplexity],
        /* Enforce a maximum depth that blocks can be nested */
        "max-depth": ["error", maxDepth],
        /* Enforce a maximum number of lines per file */
        "max-lines": ["error", { max: maxLines }],
        /* Enforce a maximum number of lines of code in a function */
        "max-lines-per-function": ["error", { max: maxLinesPerFunction, skipBlankLines: true }],
        /* Enforce a maximum depth that callbacks can be nested */
        "max-nested-callbacks": ["error", maxNestedCallbacks],
        /* Enforce a maximum number of parameters in function definitions */
        "max-params": ["error", maxParams],
        /* Enforce a maximum number of statements allowed in function blocks */
        "max-statements": ["error", maxStatements],
        /* Enforce a maximum number of statements allowed per line */
        "max-statements-per-line": ["error", { max: maxStatementsPerLine }],
        /* Disallow the use of console */
        "no-console": ["error", { allow: ["warn", "error"] }],
        /* Disallow the use of debugger */
        "no-debugger": "error",
        /* Disallow specified syntax */
        "no-restricted-syntax": ["error", "DebuggerStatement", "LabeledStatement", "WithStatement"],
      },
    }),
    overrides,
  );
}
