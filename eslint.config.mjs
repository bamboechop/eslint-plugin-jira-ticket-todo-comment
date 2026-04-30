import js from '@eslint/js';
import eslintPlugin from 'eslint-plugin-eslint-plugin';
import n from 'eslint-plugin-n';
import globals from 'globals';

const commonJsFiles = [`*.js`, `lib/**/*.js`, `scripts/**/*.js`, `tests/**/*.js`];

export default [
  {
    ignores: [`node_modules/**`],
  },
  {
    ...js.configs.recommended,
    files: [`**/*.js`, `**/*.mjs`],
  },
  {
    ...n.configs[`flat/recommended-script`],
    files: commonJsFiles,
  },
  {
    ...eslintPlugin.configs.recommended,
    files: commonJsFiles,
  },
  {
    files: commonJsFiles,
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
      sourceType: `commonjs`,
    },
    rules: {
      quotes: [`error`, `backtick`],
    },
  },
  {
    files: [`tests/**/*.js`],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },
  },
];
