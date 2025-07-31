import { clerkPlugin } from "vue-clerk";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { publishableKey } = useRuntimeConfig().public;

  const options = {
    publishableKey,
    routerPush: (to: string) => navigateTo(to),
    routerReplace: (to: string) => navigateTo(to, { replace: true }),
  };

  nuxtApp.vueApp.use(clerkPlugin, options);
});
