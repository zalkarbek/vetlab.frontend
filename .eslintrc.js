module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential'
    // "plugin:vue/recommended",
    // "plugin:prettier/recommended",
  ],
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // 'semi': [2, 'never'],
    // 'no-console': 'off',
    // 'vue/max-attributes-per-line': 'off',
    // 'prettier/prettier': ['error', { 'semi': false }]
    quotes: ['error', 'single'],
    'no-unused-vars': ['error', { 'vars': 'all', 'args': 'none', 'ignoreRestSiblings': false }],
    'vue/valid-v-for': 'off'
  },
}
