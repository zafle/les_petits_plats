import globals from "globals"
import pluginJs from "@eslint/js"

export default [
    {languageOptions: { globals: globals.browser }},
    pluginJs.configs.recommended,
    {
        files: ["data/recipes.js"],
        rules: {
            "no-unused-vars": "off"
        }
    },
    {
        ignores: ["data/recipes.js"],
        rules: {
            "no-unused-vars": "off",
            "no-undef": "error",
            semi: ["error", "never"],
            quotes: ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
            "indent": ["error", 4, { "SwitchCase": 1 }]
        }
    },
]