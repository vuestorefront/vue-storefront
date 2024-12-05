import nextPlugin from "@next/eslint-plugin-next";
import { concat, defineFlatConfig } from "eslint-flat-config-utils";
import jsdocPlugin from "eslint-plugin-jsdoc";
import a11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

/**
 * Generates an ESLint Flat Config for a Next.js project.
 *
 * @param {{ files?: string | { general: string | string[], components: string | string[], hooks: string | string[] }, isStrict?: boolean }} config - The base configuration object with optional files and isStrict fields.
 * @param {...import('eslint').Linter.Config} overrides - Additional configuration overrides.
 * @returns {import('eslint').Linter.Config} The concatenated ESLint configuration.
 */
export function nextjs(config, ...overrides) {
  const { files = "**/*.{mjs,cjs,js,jsx,ts,tsx,mts,cts,mtsx,ctsx}", isStrict = true } = config ?? {};

  let filesObj = files;
  if (typeof files === "string") {
    filesObj = { components: files, general: files, hooks: files };
  }

  filesObj = {
    components: Array.isArray(filesObj.components) ? filesObj.components : [filesObj.components],
    general: Array.isArray(filesObj.general) ? filesObj.general : [filesObj.general],
    hooks: Array.isArray(filesObj.hooks) ? filesObj.hooks : [filesObj.hooks],
  };

  return concat(
    defineFlatConfig({
      ignores: ['**/public/*'],
    }),
    defineFlatConfig({
      files: filesObj.general,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      name: "a11y",
      plugins: {
        "jsx-a11y": a11yPlugin,
      },
      rules: {
        "jsx-a11y/alt-text": [
          "warn",
          {
            elements: ["img"],
            img: ["Image"],
          },
        ],
        "jsx-a11y/aria-props": "warn",
        "jsx-a11y/aria-proptypes": "warn",
        "jsx-a11y/aria-unsupported-elements": "warn",
        "jsx-a11y/role-has-required-aria-props": "warn",
        "jsx-a11y/role-supports-aria-props": "warn",
      },
    }),
    defineFlatConfig({
      ...reactPlugin.configs.flat["jsx-runtime"],
      files: filesObj.general,
      name: "react",
      plugins: {
        react: reactPlugin,
        "react-hooks": reactHooksPlugin,
      },
      rules: {
        ...reactPlugin.configs.flat["jsx-runtime"].rules,
        ...reactHooksPlugin.configs.recommended.rules,
        "react/jsx-no-bind": "off",
        "react/jsx-no-target-blank": "off",
        "react/jsx-props-no-spreading": "off",
        "react/no-unknown-property": "off",
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react-hooks/exhaustive-deps": "warn",
        "react-hooks/rules-of-hooks": "warn",
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    }),
    defineFlatConfig({
      files: filesObj.general,
      name: "next",
      plugins: {
        "@next/next": nextPlugin,
      },
      rules: {
        ...nextPlugin.configs["core-web-vitals"].rules,
        "no-restricted-imports": [
          "error",
          {
            paths: [
              {
                message: "For the i18n support please use Link from @/config/navigation instead.",
                name: "next/link",
              },
              {
                importNames: ["useRouter"],
                message: "For the i18n support please use useRouter from @/config/navigation instead.",
                name: "next/router",
              },
              {
                importNames: ["redirect", "useRedirect"],
                message: "For the i18n support please use @/config/navigation instead.",
                name: "next/navigation",
              },
            ],
          },
        ],
        "no-restricted-properties": [
          "error",
          {
            message:
              "Use the env function from next-runtime-env to resolve environment variables instead process.env. See https://github.com/expatfile/next-runtime-env/",
            object: "process",
            property: "env",
          },
        ],
      },
    }),
    isStrict
      ? [
          defineFlatConfig({
            files: filesObj.general,
            name: "strict/react",
            rules: {
              // prefer props destructuring function Component({ prop }) https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
              "react/destructuring-assignment": ["error", "always"],
              // prefer function declaration for components https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
              "react/function-component-definition": [
                "error",
                {
                  namedComponents: "function-declaration",
                  unnamedComponents: "arrow-function",
                },
              ],
              // enforce PascalCase for React components https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
              "react/jsx-pascal-case": ["error"],
            },
          }),
          defineFlatConfig({
            files: filesObj.hooks,
            name: "strict/hooks",
            plugins: {
              jsdoc: jsdocPlugin,
            },
            rules: {
              "jsdoc/require-jsdoc": [
                "error",
                {
                  contexts: ["TSMethodSignature", "TSPropertySignature"],
                  fixerMessage: " TODO: Add JSDoc comment",
                  publicOnly: true,
                },
              ],
            },
          }),
          defineFlatConfig({
            files: filesObj.components,
            name: "strict/default-export",
            rules: {
              // prefer default export for React components
              "import/prefer-default-export": ["error"],
            },
          }),
          defineFlatConfig({
            files: filesObj.components,
            name: "strict/components",
            plugins: {
              jsdoc: jsdocPlugin,
            },
            rules: {
              // prefer "interface" over "type" for component props
              "@typescript-eslint/consistent-type-definitions": "error",
              // require JSDoc for components
              "jsdoc/require-jsdoc": [
                "error",
                {
                  contexts: ["TSMethodSignature", "TSPropertySignature"],
                  fixerMessage: " TODO: Add JSDoc comment",
                  publicOnly: true,
                  require: {
                    FunctionDeclaration: false,
                  },
                },
              ],
            },
          }),
        ]
      : [],
    overrides,
  );
}
