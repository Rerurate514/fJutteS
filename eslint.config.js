import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['dist'], // 無視するファイル・ディレクトリ
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
];
