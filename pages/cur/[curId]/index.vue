<template>
  <div class="h-full container flex flex-col gap-8 mx-auto">
    <div class="container">Cur {{ curId }}</div>
    <EstimateTotal :total="analysis.totalCO2Converted" />
    <EstimateDetails
      :relative-carbon-footprint-list="analysis.relativeCarbonFootprintList"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
const params = route.params;
const curId = params.curId as string;

const { $api } = useNuxtApp();
const analysis = ref(await $api.analysisService.getAnalysisById(curId));
console.log(analysis.value);
</script>
