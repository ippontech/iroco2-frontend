import type { CloudServiceProvider } from "~/type/infrastructure/CloudServiceProvider";

export const useCloudServiceProviderStore = defineStore(
  "cloud-service-provider",
  () => {
    const cloudServiceProviders = ref<CloudServiceProvider[]>([]);

    const fetchCloudServiceProviders = async () => {
      if (cloudServiceProviders.value.length === 0)
        cloudServiceProviders.value =
          await useNuxtApp().$api.cloudServiceProviderService.getCloudServiceProviders();
    };

    const getRegionBy = async (param: string, paramType: "id" | "name") => {
      let cloudServiceProvider = cloudServiceProviders.value.find(
        (region) => region[paramType] === param,
      );
      if (!cloudServiceProvider) {
        await fetchCloudServiceProviders();
        cloudServiceProvider = cloudServiceProviders.value.find(
          (region) => region[paramType] === param,
        );
      }
      if (!cloudServiceProvider) throw new Error("no region found");
      if (paramType === "id") return cloudServiceProvider.name;
      return cloudServiceProvider.id;
    };

    const getCloudServiceProviderName = async (
      cspId: string,
    ): Promise<string> => {
      return await getRegionBy(cspId, "id");
    };

    const getCloudServiceProviderID = async (
      cspName: string,
    ): Promise<string> => {
      return await getRegionBy(cspName, "name");
    };

    return {
      cloudServiceProviders,
      fetchCloudServiceProviders,
      getCloudServiceProviderName,
      getCloudServiceProviderID,
    };
  },
);
