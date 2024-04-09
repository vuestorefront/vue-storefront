module.exports = {
  plugins: ["@typescript-eslint"],
  overrides: [
    {
      files: ["**/*.{ts,tsx,mts,cts}"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:etc/recommended",
      ],
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: "latest",
        project: "tsconfig.json",
      },
      rules: {
        /* Disable recommended naming convetion */
        "@typescript-eslint/naming-convention": "off",
        /* Do not enforce explicit return type annotation */
        "@typescript-eslint/explicit-function-return-type": "off",
        /* Enforces that generic types are not single-character parameters */
        "etc/no-t": "error",
        /* Enforces to throw Error or DOMException instances */
        "etc/throw-error": "error",
      },
    },
    {
      files: ["**/*.d.ts"],
      rules: {
        "etc/no-t": "off",
      },
    },
  ],
};
