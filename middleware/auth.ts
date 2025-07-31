import { useAuth } from "vue-clerk";

export default defineNuxtRouteMiddleware(async (to, _) => {
  if (import.meta.server) return;
  const auth = useAuth();

  if (!auth.userId.value) {
    return navigateTo(`/login?redirect_uri=${encodeURIComponent(to.fullPath)}`);
  }
});
