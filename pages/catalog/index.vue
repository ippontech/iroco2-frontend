<script setup lang="ts">
import { Availability } from "~/type/Availability";
import PackManBackground from "~/components/packman-background/PackManBackground.vue";

definePageMeta({
  layout: "public",
});

// const services: Ref<ServiceCatalog[]> = ref([]);

const { $api, $router } = useNuxtApp();

const services = ref(await $api.catalogService.getAllServices());

const toDescription = (id: string) => {
  $router.push(`catalog/${id}`);
};

const getIcon = (service: string) => {
  return `/service-icons/${service
    .replace(/\(.*?\)/g, "")
    .trim()
    .replaceAll(" ", "-")}.svg`;
};
</script>

<template>
  <PackManBackground class="flex items-center justify-center">
    <h1 class="text-center text-5xl font-bold">Catalogue de disponibilité</h1>
  </PackManBackground>
  <div
    class="container py-8 m-auto grid md:grid-cols-2 lg:grid-cols-3 grid-cols gap-4"
  >
    <Card
      v-for="service of services"
      :key="service.name"
      class="flex flex-col max-h-96"
    >
      <CardHeader>
        <CardTitle>
          <div class="flex justify-between w-full items-center">
            <img class="h-16" :src="getIcon(service.name)" alt="Logo" />
            <span class="name text-right">
              {{ service.shortname }}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent class="grow">
        <p class="line-clamp-5">
          {{ service.description }}
        </p>
      </CardContent>
      <CardFooter>
        <div
          v-if="service.availability === Availability.AVAILABLE"
          class="flex justify-between w-full items-center"
        >
          <Button
            class="text-white"
            variant="black"
            @click="toDescription(service.id)"
            >En savoir plus</Button
          >
          <Badge class="text-black border-[#15803D] h-fit" variant="outline"
            >Disponible</Badge
          >
        </div>

        <div
          v-else-if="service.availability === Availability.PENDING"
          class="flex justify-between w-full items-center"
        >
          <Button
            class="text-white"
            variant="black"
            @click="toDescription(service.id)"
            >En savoir plus</Button
          >
          <Badge class="text-black border-[#EEA02D] h-fit" variant="outline"
            >Prochainement</Badge
          >
        </div>

        <Button
          v-else
          class="mx-auto h-fit py-1 bg-[#15803D] text-white hover:bg-[#15803D]/90"
          >Demander une intégration</Button
        >
      </CardFooter>
    </Card>
  </div>
</template>
