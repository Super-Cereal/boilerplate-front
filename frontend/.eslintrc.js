/* eslint-disable */

module.exports = {
  extends: [
    "plugin:nimbus-clean/common",
    "plugin:nimbus-clean/prettier",
    // "plugin:nimbus-clean/import",
    "plugin:nimbus-clean/simpleImportSort",
    "plugin:nimbus-clean/react",
    "plugin:nimbus-clean/promise",
    // "plugin:nimbus-clean/unicorn",
    // "plugin:nimbus-clean/sonarjs",
    "plugin:nimbus-clean/typescript",
    // "plugin:nimbus-clean/perfectionist",
  ],

  ignorePatterns: ["node_modules", "dist"],

  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
      modules: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["nimbus-clean"],

  rules: {
    "@typescript-eslint/naming-convention": [0],
  },

  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      fragment: "Fragment",
      pragma: "React",
      version: "detect",
    },
  },
};
