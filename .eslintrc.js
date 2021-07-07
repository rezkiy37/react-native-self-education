module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: '@react-native-community',

  parserOptions: {
    ecmaVersion: 2020,
    project: './tsconfig.eslint.json',
  },

  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
  ],

  extends: [
    'react-app',
    'react-app/jest',
    'airbnb-typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
};
