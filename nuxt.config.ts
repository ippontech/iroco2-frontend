// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "katex/dist/katex.min.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  future: { typescriptBundlerResolution: false },

  runtimeConfig: {
    public: {
      irocalcApiBase: process.env.IROCALC_API_URL ?? "http://localhost:8080",
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      irocoCustomerRequestEndpoint:
        process.env.IROCO_CUSTOMER_REQUEST_ENDPOINT ??
        "NO_IROCO_CUSTOMER_REQUEST_ENDPOINT_IN_ENV",
      urlDocs: process.env.URL_DOCS,
    },
  },

  colorMode: { preference: "light" },

  modules: [
    "@nuxt/ui",
    "@nuxt/test-utils/module",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxt/fonts",
  ],

  ssr: false,

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },

  compatibilityDate: "2024-08-01",
});
