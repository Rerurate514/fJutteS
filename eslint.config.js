/* eslint-disable */

import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['dist/*', '__test__/*', '*/*.config*'],
  },
  {
    rules: {
      semi: ["error", "always"],
      "semi-spacing": ["error", { after: true, before: false }],
      "semi-style": ["error", "last"],
      "no-extra-semi": "error",
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
    },
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
