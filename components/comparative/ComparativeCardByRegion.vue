<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-xl">{{ regionName }}</CardTitle>
    </CardHeader>
    <CardContent class="aspect-square">
      <div class="flex items-center gap-2">
        <UIcon
          class="text-3xl"
          :class="improvementIndicator"
          name="i-heroicons-globe-europe-africa"
        />
        <span> {{ co2PercentageDiffLabel }}% CO2eq. </span>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
interface Props {
  regionName: string;
  co2PercentageDiff: number;
}
const props = defineProps<Props>();

let improvementIndicator = "";
let co2PercentageDiffLabel = "";

if (props.co2PercentageDiff < 0) {
  improvementIndicator = "text-green-500";
}
if (props.co2PercentageDiff > 0) {
  improvementIndicator = "text-red-500";
  co2PercentageDiffLabel = "+";
}
co2PercentageDiffLabel += props.co2PercentageDiff;
</script>
