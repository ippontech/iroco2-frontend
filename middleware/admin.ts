import securityService from "~/service/securityService";

export default defineNuxtRouteMiddleware(async () => {
  if (securityService.isAdmin()) {
    return;
  }
  return navigateTo("/calculatrice");
});
