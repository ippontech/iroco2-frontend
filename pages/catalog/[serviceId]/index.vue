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

<script setup lang="ts">
import type { Ref } from "vue";
import type { ServiceDescription } from "~/type/ServiceDescription";

definePageMeta({
  layout: "public",
});

const getIcon = (serviceName: string) => {
  return `/service-icons/${serviceName
    .replace(/\(.*?\)/g, "")
    .trim()
    .replaceAll(" ", "-")}.svg`;
};

const { $api } = useNuxtApp();
const {
  params: { serviceId },
} = useRoute();
const id: string = Array.isArray(serviceId) ? serviceId[0] : serviceId;

const service: Ref<ServiceDescription> = ref(
  await $api.catalogApiClient.getById(id),
);
</script>

<template>
  <div class="mt-7 mx-5 sm:mx-20">
    <div
      class="flex flex-wrap mx-auto justify-center gap-5 items-center my-20 sm:max-w-[70%]"
    >
      <img
        class="h-16"
        :src="getIcon(service.name)"
        :alt="$t('catalog.serviceLogo', { name: service.name })"
      />
      <h1 class="py-2 font-extrabold text-center text-2xl">
        {{ service.name }}
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center w-full">
      <div class="border-2 rounded-2xl p-8">
        <h2 class="font-bold text-xl mb-8 text-center">
          {{ $t("catalog.levers") }}
        </h2>
        <ul v-if="service.levers.length > 0" class="list-disc list-inside">
          <li v-for="lever in service.levers" :key="lever" class="mb-2">
            {{ lever }}
          </li>
        </ul>
        <p v-else class="text-gray-500 text-center">
          {{ $t("catalog.noLever") }}
        </p>
      </div>
      <div class="border-2 rounded-2xl p-8">
        <h2 class="font-bold text-xl mb-8 text-center">
          {{ $t("catalog.carbonEstimateLimit") }}
        </h2>
        <ul v-if="service.limitations.length > 0" class="list-disc list-inside">
          <li
            v-for="limitation in service.limitations"
            :key="limitation"
            class="mb-2"
          >
            {{ limitation }}
          </li>
        </ul>
        <p v-else class="text-gray-500 text-center">
          {{ $t("catalog.noCarbonEstimateLimit") }}
        </p>
      </div>
    </div>
  </div>
</template>
