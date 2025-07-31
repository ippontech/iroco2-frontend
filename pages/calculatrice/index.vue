<template>
  <div class="container">
    <div class="grid gap-8">
      <section class="grid gap-4">
        <div class="flex items-center justify-between">
          <h2 class="font-title font-bold text-3xl">Mes infrastructures :</h2>
          <CreateInfrastructure
            class="ml-auto"
            @infra-created="handleInfraCreated"
          />
        </div>
        <div class="flex flex-col items-end p-8 rounded border bg-white gap-4">
          <InfrastructuresDataTable :key="tableKey" class="w-full" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateInfrastructure from "~/components/infrastructure/CreateInfrastructure.vue";

definePageMeta({
  middleware: ["auth"],
});
const tableKey = ref(0);
const handleInfraCreated = async () => {
  tableKey.value++;
};
</script>
