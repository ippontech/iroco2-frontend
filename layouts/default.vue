<template>
  <main class="flex">
    <SidebarMenu class="w-72">
      <template v-if="isInfrastructureRoute">
        <InfrastructuresSidebarMenu />
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
