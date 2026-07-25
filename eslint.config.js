import js from '@eslint/js';
import globals from 'globals';
import astro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
  { ignores: ['dist/', '.astro/', 'node_modules/'] },

  js.configs.recommended,
  ...astro.configs['flat/recommended'],

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
      },
    },
  },
];
