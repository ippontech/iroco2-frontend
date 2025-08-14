<!-- prettier-ignore -->
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

<template>
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col gap-4">
      <div class="flex justify-center mx-auto gap-4">
        <div class="flex flex-col">
          <div class="my-4 items-center">
            <div class="flex justify-start gap-2 p-2">
              <UIcon
                name="i-heroicons-pencil"
                class="opacity-50 group-hover:opacity-100 size-5 self-end"
              />
              <EditableLine
                class="font-bold text-lg"
                :title="componentName"
                @update:title="handleComponentNameChange"
              />
              <div class="text-xs self-center">({{ serviceName }})</div>
            </div>

            <div class="w-96 pt-4 flex-gap2">
              <div
                v-for="(setting, index) in serviceConfigurationSettings"
                :key="index"
                class="pt-2"
              >
                <ConfigurationSettingsConfigurationSetting
                  v-model="configuredValues[index]"
                  :setting="setting"
                />
              </div>
            </div>
            <div>
              <div class="flex pt-8 gap-1">
                <input id="checkbox" v-model="isOtherRegion" type="checkbox" />
                <label for="checkbox">
                  <div>
                    Région alternative
                    <span class="text-xs">(optionnelle)</span>
                  </div>
                </label>
              </div>
              <RegionSelector
                :class="!isOtherRegion ? 'opacity-25 pointer-events-none' : ''"
                :default-selected-region="currentRegion"
                @update:region="handleRegionChange"
              />
            </div>
            <div class="flex justify-end w-full mb-32 pt-8 space-x-4">
              <button
                type="button"
                class="bg-black text-white p-2 rounded-md hover:bg-iroco-light-green focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                @click="handleBackClick"
              >
                Retour
              </button>
              <button
                type="submit"
                class="bg-black text-white p-2 rounded-md hover:bg-iroco-light-green focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { ServiceConfigurationSetting } from "~/type/infrastructure/ServiceConfigurationSetting";
import EditableLine from "~/components/form/EditableLine.vue";
import { ref } from "vue";
import RegionSelector from "~/components/recap/RegionSelector.vue";
import type { Region } from "~/type/Region";
import type { ConfiguredValue } from "~/type/infrastructure/ConfiguredValue";
import type { LocationQuery } from "#vue-router";

definePageMeta({
  middleware: ["auth"],
});

interface QueryParams extends LocationQuery {
  cloudServiceProviderServiceID: string;
  componentId: string;
  serviceName: string;
}

const { $api } = useNuxtApp();
const route = useRoute();

const infrastructureId: string = Array.isArray(route.params.infrastructureID)
  ? route.params.infrastructureID[0]
  : route.params.infrastructureID;

const { cloudServiceProviderServiceID, componentId, serviceName } =
  route.query as QueryParams;

const components = ref(
  await $api.componentService.getComponentsByInfrastructureId(infrastructureId),
);

const originalComponent = components.value.find(
  (component) => component.id === componentId,
);

const regions = await $api.awsDataCenter.getAllAWSDataCenter();

const currentRegion = ref(
  await $api.awsDataCenter.getRegionByInfrastructureId(infrastructureId),
);

const componentName = ref("Mon composant");

const isOtherRegion = ref(
  !!originalComponent && originalComponent.regionID !== currentRegion.value?.id,
);

const serviceConfigurationSettings = ref<ServiceConfigurationSetting[]>(
  await $api.serviceConfigurationSettingSvc.findAllConfigurationSettingsByServiceId(
    originalComponent
      ? originalComponent.serviceID
      : cloudServiceProviderServiceID,
  ),
);

const configuredValues = ref<ConfiguredValue[]>(
  serviceConfigurationSettings.value.map((setting) => {
    return {
      id: setting.configurationSetting.id,
      value: setting.defaultValue ?? "",
    };
  }),
);

if (originalComponent) {
  currentRegion.value = regions.find(
    (region) => region.id === originalComponent.regionID,
  );
  componentName.value = originalComponent.name;
  configuredValues.value = originalComponent.configurationValues;
}
const handleRegionChange = (newValue: Region) => {
  currentRegion.value = newValue;
};
const handleComponentNameChange = (newValue: string) => {
  componentName.value = newValue;
};
const handleSubmit = async () => {
  const component = {
    configurationValues: configuredValues.value,
    name: componentName.value,
    infrastructureID: infrastructureId,
    regionID: currentRegion.value!.id,
    serviceID: cloudServiceProviderServiceID,
  };
  if (originalComponent) {
    await $api.componentService.updateComponent({
      ...component,
      id: originalComponent.id,
    });
  } else {
    await $api.componentService.saveComponent(component);
  }
  await navigateTo(`/calculatrice/infrastructure/${infrastructureId}`);
};
const handleBackClick = async () => {
  await navigateTo(`/calculatrice/infrastructure/${infrastructureId}`);
};
</script>
