// Frank: dit was het origineel
// module.exports = {
//   root: true,
//   env: {
//     es6: true,
//     node: true,
//   },
//   extends: [
//     "eslint:recommended",
//     "google",
//   ],
//   rules: {
//     quotes: ["error", "double"],
//   },
// };

// gevonden als oplossing bij '188. creating your own cloud functions'
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "indent": "off",
    "no-undef": "off",
    "comma-dangle": "off",
    "object-curly-spacing": "off",
    "eol-last": "off",
  },
  parserOptions: {
    "ecmaVersion": 8,
  },
};