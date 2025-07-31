export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return;
  const { $api } = useNuxtApp();

  const route = useRoute();
  const infrastructureId: string = route.params.infrastructureID as string;

  const infrastructure =
    await $api.infrastructureService.getInfrastructure(infrastructureId);
  if (infrastructure === null || infrastructure === undefined) {
    return navigateTo("/accueil");
  }
});
