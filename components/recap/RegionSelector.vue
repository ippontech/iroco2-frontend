<template>
  <Selector
    placeholder="region"
    :values="regions.map((region) => region.name)"
    :default-selected-value="(selectedRegion as Region)?.name"
    @update:value="handleSelect"
  />
</template>

<script setup lang="ts">
import { type Ref, ref } from "vue";
import type { Region } from "~/type/Region";
import Selector from "~/components/recap/Selector.vue";

const { $api } = useNuxtApp();

const regions: Ref<Region[]> = ref(
  await $api.awsDataCenter.getAllAWSDataCenter(),
);

interface Props {
  //will be changed to just Region in V2
  defaultSelectedRegion?: Region | string;
}

const props = defineProps<Props>();
const findRegionByName = (regionName: string) => {
  return regions.value.find((region) => region.name === regionName);
};

const selectedRegion: Ref<Region | undefined> = ref();
if (props.defaultSelectedRegion) {
  //temporary hack to permit V1 and V2 to coexist
  if (typeof props.defaultSelectedRegion === "string") {
    selectedRegion.value = findRegionByName(props.defaultSelectedRegion);
  } else {
    selectedRegion.value = props.defaultSelectedRegion;
  }
}
const emits = defineEmits(["update:region"]);

const handleSelect = (regionName: string) => {
  selectedRegion.value = findRegionByName(regionName);
  emits("update:region", selectedRegion.value);
};
</script>
