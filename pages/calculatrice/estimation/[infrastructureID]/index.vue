<template>
  <div class="h-full container flex flex-col gap-8 mx-auto">
    <div class="font-bold text-xl px-16">{{ infrastructure?.name }}</div>

    <EstimateTotal :total="results.totalCO2Converted" />

    <EstimateDetails
      :relative-carbon-footprint-list="results.relativeCarbonFootprintList"
    />

    <CustomCard>
      <div class="font-bold mt-5 ml-5">Quelques axes d'amélioration :</div>
      <ComparativeByRegion
        ref="comparativeComponentRef"
        :infrastructure-id="infrastructureId"
        :total-c-o2-gr="results.totalCO2Gr"
      />
    </CustomCard>
  </div>
</template>

<script setup lang="ts">
import type { Infrastructure } from "~/type/infrastructure/Infrastructure";

import CustomCard from "~/components/card/CustomCard.vue";
import ComparativeByRegion from "~/components/comparative/ComparativeByRegion.vue";
const { $api } = useNuxtApp();
const route = useRoute();
const infrastructure: Ref<Infrastructure | undefined> = ref();

const infrastructureId: string = Array.isArray(route.params.infrastructureID)
  ? route.params.infrastructureID[0]
  : route.params.infrastructureID;

const results = ref(
  await $api.carbon.estimateCarbonFootPrint(infrastructureId),
);

infrastructure.value =
  await $api.infrastructureService.getInfrastructure(infrastructureId);
</script>
