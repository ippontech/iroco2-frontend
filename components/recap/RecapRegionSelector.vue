<!-- prettier-ignore -->
/*
 * Copyright 2025 Ippon Technologies
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

<template>
  <RecapSelector
    :placeholder="$t('selector.region')"
    :values="regions.map((region) => region.name)"
    :default-selected-value="(selectedRegion as Region)?.name"
    @update:value="handleSelect"
  />
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";
import type { Region } from "~/type/Region";

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
const emit = defineEmits<{
  "update:region": [region: Region | undefined];
}>();

const handleSelect = (regionName: string) => {
  selectedRegion.value = findRegionByName(regionName);
  emit("update:region", selectedRegion.value);
};
</script>
