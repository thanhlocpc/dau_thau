// module.exports = {
//   root: true,
//   extends: '@react-native-community',
// };

module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {},
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      js: true,
      json: true
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "import", "react-hooks"],
  ignorePatterns: ["node_modules/"],
  rules: {},
  settings: {
    react: {
      version: "latest", // "detect" automatically picks the version you have installed.
    },
  },
};