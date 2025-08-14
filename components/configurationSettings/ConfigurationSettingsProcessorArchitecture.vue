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

<script setup lang="ts">
const cpuArchitectureType = Object.values(CpuArchitectureTypeEnum).map(
  (value) => ({
    label: value,
  }),
);

const model = defineModel<string>();
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="">Architecture processeur :</div>
    <Select v-model="model">
      <SelectTrigger>
        <SelectValue :placeholder="model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            v-for="archi in cpuArchitectureType"
            :key="archi.label"
            :value="archi.label"
          >
            {{ archi.label }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
