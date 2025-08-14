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
  <main class="flex">
    <SidebarMenu class="w-72">
      <template v-if="isInfrastructureRoute">
        <InfrastructureSidebarMenu />
      </template>
    </SidebarMenu>

    <div class="flex flex-col w-full h-screen overflow-auto">
      <TopNavbar :infrastructures="infrastructuresStore.infrastructures" />
      <NuxtPage class="w-full py-4 px-12 overflow-auto" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from "vue";

const cloudServiceProvidersStore = useCloudServiceProviderStore();
const infrastructuresStore = useInfrastructuresStore();

await cloudServiceProvidersStore.fetchCloudServiceProviders();
await infrastructuresStore.fetchInfrastructures();

const route = useRoute();
const isInfrastructureRoute = computed(() => {
  return (
    (route.path.startsWith("/calculatrice/infrastructure/") ||
      route.path.startsWith("/calculatrice/estimation/")) &&
    !!route.params.infrastructureID
  );
});
</script>
