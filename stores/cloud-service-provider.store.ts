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
import type { CloudServiceProvider } from "~/type/infrastructure/CloudServiceProvider";

export const useCloudServiceProviderStore = defineStore(
  "cloud-service-provider",
  () => {
    const cloudServiceProviders = ref<CloudServiceProvider[]>([]);

    const fetchCloudServiceProviders = async () => {
      if (cloudServiceProviders.value.length === 0)
        cloudServiceProviders.value =
          await useNuxtApp().$api.cloudServiceProviderApiClient.getCloudServiceProviders();
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

    const getCloudServiceProviderID = async (
      cspName: string,
    ): Promise<string> => {
      return await getRegionBy(cspName, "name");
    };

    return {
      cloudServiceProviders,
      fetchCloudServiceProviders,
      getCloudServiceProviderID,
    };
  },
);
