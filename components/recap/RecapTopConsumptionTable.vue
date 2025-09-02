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
  <div class="flex flex-col basis-1/2 gap-4">
    <div class="font-bold">Services les moins écologiques :</div>
    <table class="border-2 rounded-md">
      <tr v-for="index in NOMBRE_DE_SERVICES_AFFICHES" :key="index">
        <th class="border-2 p-3">
          {{
            relativeCarbonFootprintList[index - 1]
              ? relativeCarbonFootprintList[index - 1].label
              : "-"
          }}
        </th>
        <td class="border-2 p-3">
          {{
            relativeCarbonFootprintList[index - 1]
              ? relativeCarbonFootprintList[index - 1].percentage.toFixed(1) +
                " %"
              : "-"
          }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
type Props = {
  relativeCarbonFootprintList: Array<RelativeCarbonFootprint>;
};

const NOMBRE_DE_SERVICES_AFFICHES: number = 3;
const { relativeCarbonFootprintList } = defineProps<Props>();
</script>
