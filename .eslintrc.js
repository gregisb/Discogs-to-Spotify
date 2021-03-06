module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-plusplus': 'off',
    'no-await-in-loop': 'off',
    'no-unused-vars': [1, { argsIgnorePattern: '^_' }],
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-props-no-spreading': 'off',
    'consistent-return': 'off',
  },
};
