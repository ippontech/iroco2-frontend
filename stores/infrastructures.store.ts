import type { Infrastructure } from "~/type/infrastructure/Infrastructure";

export const useInfrastructuresStore = defineStore("infrastructures", () => {
  const infrastructures = ref<Infrastructure[]>([]);

  const fetchInfrastructures = async () => {
    infrastructures.value =
      await useNuxtApp().$api.infrastructureService.getInfrastructures();
  };

  return {
    infrastructures,
    fetchInfrastructures,
  };
});
