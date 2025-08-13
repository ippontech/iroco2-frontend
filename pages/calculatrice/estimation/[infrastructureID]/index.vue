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
  <div class="h-full container flex flex-col gap-8 mx-auto">
    <div class="font-bold text-xl px-16">{{ infrastructure?.name }}</div>

    <EstimateTotal :total="results.totalCO2Converted" />

    <EstimateDetails
      :relative-carbon-footprint-list="results.relativeCarbonFootprintList"
    />

    <CardCustom>
      <div class="font-bold mt-5 ml-5">Quelques axes d'amélioration :</div>
      <ComparativeByRegion
        ref="comparativeComponentRef"
        :infrastructure-id="infrastructureId"
        :total-c-o2-gr="results.totalCO2Gr"
      />
    </CardCustom>
  </div>
</template>

<script setup lang="ts">
import type { Infrastructure } from "~/type/infrastructure/Infrastructure";
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
