// @ts-check

const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');
const sonarjs = require('eslint-plugin-sonarjs');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const unicorn = require('eslint-plugin-unicorn');
const perfectionist = require('eslint-plugin-perfectionist');
const globals = require('globals');

module.exports = tseslint.config(
  {
    languageOptions: { globals: { ...globals.builtin, ...globals.node } },
    plugins: {
      sonarjs,
      unicorn,
      perfectionist,
    },
    ignores: ['dist'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended.map((value) => ({
    files: ['**/*.ts'],
    ...value,
  })),
  {
    files: ['**/*.ts'],
    rules: {
      // typescript-eslint rules
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'none',
          caughtErrors: 'none',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/member-ordering': [
        'off',
        {
          classes: [
            'public-static-field',
            'protected-static-field',
            'private-static-field',

            'public-decorated-field',
            'protected-decorated-field',
            'private-decorated-field',

            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',

            'public-abstract-field',
            'protected-abstract-field',

            'public-field',
            'protected-field',
            'private-field',

            'constructor',

            ['public-get', 'public-set'],
            ['protected-get', 'protected-set'],
            ['private-get', 'private-set'],

            'public-decorated-method',
            'public-method',
            'protected-decorated-method',
            'protected-method',
            'private-decorated-method',
            'private-method',

            'public-abstract-method',
            'protected-abstract-method',
          ],
        },
      ],
      '@typescript-eslint/no-floating-promises': ['off'],
      '@typescript-eslint/require-await': ['off'],
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      // '@typescript-eslint/consistent-type-imports': ['error', { 'fixStyle': 'inline-type-imports' }],

      // sonarjs
      'sonarjs/no-duplicate-string': ['off'],
      'sonarjs/cognitive-complexity': 'warn',

      // unicorn
      'unicorn/no-await-expression-member': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/no-array-for-each': 'off',
      'unicorn/better-regex': 'error',
      'unicorn/catch-error-name': 'error',
      'unicorn/prefer-number-properties': 'error',

      // perfectionist
      // 'perfectionist/sort-classes': ['error', { type: 'natural' }],
      'perfectionist/sort-exports': ['error', { type: 'natural' }],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          type: 'natural',
          internalPattern: ['@common/**', '@configurations/**', '@features/**'],
        },
      ],
      'perfectionist/sort-named-exports': ['error', { type: 'natural' }],
      'perfectionist/sort-named-imports': ['error', { type: 'natural' }],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'if',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'for',
        },
      ],
    },
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
);
