/* eslint-disable */

const globals = require("globals");
const pluginJs = require("@eslint/js");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    ignores: ['dist'] // 無視するファイル・ディレクトリ
  },
  {
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.jest
      }
    }
  },
  pluginJs.configs.recommended
];
