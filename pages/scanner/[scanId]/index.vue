<template>
  <div class="h-full container flex flex-col gap-8 mx-auto">
    <div class="container">Scan {{ scanId }}</div>
    <EstimateTotal :total="scan.totalCO2Converted" />
    <EstimateDetails
      :relative-carbon-footprint-list="scan.relativeCarbonFootprintList"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
const params = route.params;
const scanId = params.scanId as string;

const { $api } = useNuxtApp();
const scan = ref(await $api.scanService.getScanById(scanId));
</script>
