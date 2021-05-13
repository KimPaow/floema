module.exports = {
  root: true,
  extends: ['plugin:prettier/recommended'],
  globals: {
    IS_DEVELOPMENT: 'readonly',
  },
  parserOptions: {
    ecmasVersion: 2020,
    sourceType: 'module',
  },
  env: {
    es6: true,
  },
}
