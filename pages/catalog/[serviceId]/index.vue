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
  await $api.catalogService.getById(id),
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
        :alt="`Logo de ${service.name}`"
      />
      <h1 class="py-2 font-extrabold text-center text-2xl">
        {{ service.name }}
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center w-full">
      <div class="border-2 rounded-2xl p-8">
        <h2 class="font-bold text-xl mb-8 text-center">
          Leviers d'actions de réduction d'impact
        </h2>
        <ul v-if="service.levers.length > 0" class="list-disc list-inside">
          <li v-for="lever in service.levers" :key="lever" class="mb-2">
            {{ lever }}
          </li>
        </ul>
        <p v-else class="text-gray-500 text-center">
          Pas de leviers d'actions pour le moment.
        </p>
      </div>
      <div class="border-2 rounded-2xl p-8">
        <h2 class="font-bold text-xl mb-8 text-center">
          Limitations d'estimation carbone
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
          Pas de limitations pour le moment.
        </p>
      </div>
    </div>
  </div>
</template>
