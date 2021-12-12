module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
  },
  settings: {
    jest: {
      version: 27
    }
  },
  plugins: ['simple-import-sort', 'jest'],
  env: {
    "commonjs": true,
    "es6": true,
    "node": true
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: true,
        tabWidth: 2,
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'none',
        jsxBracketSameLine: false
      },
      { usePrettierrc: false }
    ],
    'import/no-extraneous-dependencies': ['error', { peerDependencies: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'always',
        'cjs': 'always',
        'mjs': 'always',
      }
    ],
    'no-underscore-dangle': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  overrides: [
    {
      files: [
        '**/__tests__/(unit|integration)/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
        '**/__mocks__/**/*.[jt]s?(x)'
      ],
      extends: ['plugin:jest/recommended']
    }
  ]
};
