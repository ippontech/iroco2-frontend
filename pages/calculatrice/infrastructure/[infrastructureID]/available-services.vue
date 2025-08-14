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
  <section class="grid gap-8">
    <h2 class="font-title font-bold text-3xl">
      Choisissez un service à configurer
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(service, id) in services"
        :key="id"
        class="border border-gray-300 p-4 rounded-lg flex flex-col cursor-default outline-none bg-white"
        tabindex="0"
      >
        <h3 class="text-lg font-bold">{{ service.name }}</h3>
        <p class="mt-2 text-sm flex-grow text-justify">
          {{ service.description }}
        </p>
        <div
          class="mt-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0"
        >
          <button
            class="bg-black text-white px-4 py-2 rounded-lg"
            @click="goToComponentConfiguration(service)"
          >
            Configurer
          </button>
          <a v-if="false" href="#" class="text-black underline italic">
            Voir sur le catalogue
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { CloudServiceProviderService } from "~/type/infrastructure/CloudServiceProviderService";

definePageMeta({
  middleware: ["auth"],
});

const { $api } = useNuxtApp();
const route = useRoute();

const services = ref<CloudServiceProviderService[]>([]);
services.value =
  await $api.cloudServiceProviderService.getCloudServiceProviderServices();

const goToComponentConfiguration = (
  cloudServiceProviderService: CloudServiceProviderService,
) => {
  const infrastructureId: string = Array.isArray(route.params.infrastructureID)
    ? route.params.infrastructureID[0]
    : route.params.infrastructureID;

  navigateTo({
    path: `/calculatrice/infrastructure/${infrastructureId}/create-component`,
    query: {
      serviceName: `${cloudServiceProviderService.shortname}`,
      cloudServiceProviderServiceID: `${cloudServiceProviderService.id}`,
    },
  });
};
</script>
