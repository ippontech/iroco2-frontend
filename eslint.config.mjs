import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import withNuxt from "./.nuxt/eslint.config.mjs";
// @ts-check
export default withNuxt({
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    // ...prettierPlugin.configs.recommended.rules,
    ...eslintConfigPrettier.rules,
    ...eslintPluginPrettierRecommended.rules,
    "vue/no-multiple-template-root": "off",
  },
});
