module.exports = {
  overrides: [
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
        vueFeatures: {
          filter: false,
        },
      },
    },
  ],
  extends: ["@vue/typescript/recommended", "plugin:vue/strongly-recommended"],
  rules: {
    /* Disallow use other than available lang */
    "vue/block-lang": [
      "error",
      {
        script: {
          lang: "ts",
        },
      },
    ],
    /* Do not require default prop value */
    "vue/require-default-prop": "off",
    /* Relax rule which requires the component names to be always multi-word */
    "vue/multi-word-component-names": "off",
    /* Disable import enforcement to import from vue */
    "vue/prefer-import-from-vue": "off",
    /* Enforce specific tag order */
    "vue/component-tags-order": [
      "error",
      {
        order: ["script", "template", "style"],
      },
    ],
  },
};
