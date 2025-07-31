<template>
  <CardCustomCard class="flex justify-center gap-2">
    <TopConsumptionTable
      :relative-carbon-footprint-list="relativeCarbonFootprintList"
    />
    <ChartTopConsumptionPie
      :relative-carbon-footprint-list="relativeCarbonFootprintList"
    />
  </CardCustomCard>
</template>

<script setup lang="ts">
import TopConsumptionTable from "~/components/recap/TopConsumptionTable.vue";
import type { RelativeCarbonFootprint } from "~/lib/utils";
const { relativeCarbonFootprintList } = defineProps<{
  relativeCarbonFootprintList: RelativeCarbonFootprint[];
}>();
</script>
