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
    <div class="container">{{ $t("scanner.detail.scan") }} {{ scanId }}</div>
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
