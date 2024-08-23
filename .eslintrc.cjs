module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:jsdoc/recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
  ],
  parser: "vue-eslint-parser",
  plugins: ["vue"],
  rules: {
    "jsdoc/check-tag-names": "off",
    "jsdoc/require-param-type": "off",
    "jsdoc/require-param-description": "off",
    "jsdoc/require-returns-type": "off",
    "jsdoc/require-returns-description": "off",
    "vue/multi-word-component-names": "off",
  },
};
