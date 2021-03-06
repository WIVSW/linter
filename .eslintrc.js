module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true,
  },
  'extends': 'google',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'rules': {
    "arrow-body-style": ["error", "as-needed"],
    "no-tabs": "off",
    "indent": ["error", "tab"],
    "no-console": "error",
    "no-debugger": "error"
  },
};
