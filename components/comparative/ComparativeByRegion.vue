<template>
  <div v-if="totalCO2Gr > 0">
    <div class="w-4/5 m-auto flex flex-col items-center p-4">
      <Carousel class="w-full">
        <CarouselContent>
          <CarouselItem
            v-for="(region, index) in resultsByRegion"
            :key="index"
            class="basis-1/3"
          >
            <ComparativeCardByRegion
              :key="index"
              :region-name="region.regionName"
              :co2-percentage-diff="region.co2PercentageDiff"
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    <div v-if="!isCompararisonPresent" class="text-center my-2 px-1">
      Tendance non disponible pour la région sélectionnée <br />
      (C'est le seul data center de la région)
    </div>
  </div>
</template>

<script setup lang="ts">
import ComparativeCardByRegion from "./ComparativeCardByRegion.vue";
import type { RegionCarbonFootprint } from "~/type/RegionCarbonFootprint";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
const { $api } = useNuxtApp();

interface Props {
  infrastructureId: string;
  totalCO2Gr: number;
}
const props = defineProps<Props>();

const resultsByRegion: Ref<RegionCarbonFootprint[]> = ref(
  await $api.carbon.compareCarbonFootPrintbByRegion(
    props.infrastructureId,
    props.totalCO2Gr,
  ),
);

const isCompararisonPresent = ref(resultsByRegion.value.length > 0);
</script>
