/*
 * Copyright 2025 Ippon Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
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
