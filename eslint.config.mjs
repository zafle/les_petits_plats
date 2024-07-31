import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
      rules: {
          "no-unused-vars": "off",
          "no-undef": "error",
          semi: ["error", "never"],
          quotes: ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
          "indent": ["error", 4]
      }
  },
]