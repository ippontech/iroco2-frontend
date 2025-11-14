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
  <CardCustom class="flex justify-around items-center">
    <div class="max-md:">
      {{ $t("estimate.monthlyImpactLabel") }}
    </div>
    <div class="font-bold text-4xl max-md:text-2xl max-sm:text-xl">
      {{ total.noUnitValue }}
      {{ total.unit }}CO2eq
    </div>

    <div>{{ $t("estimate.orEquivalent") }}</div>
    <div class="flex flex-col gap-8">
      <RecapScoreBar
        :carbon-foot-print="total.noUnitValue"
        :unit="total.unit"
      />

      <span class="flex justify-end font-light italic text-sm">
        {{ $t("estimate.equivalentDisclaimer") }}&nbsp;
        <NuxtLink
          to="https://impactco2.fr/transport"
          external
          class="text-green-900 font-medium"
        >
          {{ $t("estimate.ademeSimulator") }}
        </NuxtLink>
      </span>
    </div>
  </CardCustom>
</template>

<script setup lang="ts">
import type { UnitValue } from "~/type/UnitValue";

const { total } = defineProps<{ total: UnitValue }>();
</script>
