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
import { multiplyToString } from "./mappers";

const SECONDS_IN_HOUR = 3600000;

const seconds = defineModel<string>({ required: true });

const hours = ref(multiplyToString(seconds.value, 1 / SECONDS_IN_HOUR));

const handleValueChange = (newValue: number) => {
  seconds.value = multiplyToString(newValue, SECONDS_IN_HOUR);
};
</script>

<template>
  <div class="w-full">
    <SliderNumber
      label="Temps de fonctionnement journalier"
      :default-value="Number(hours)"
      :step="1"
      unit="heures"
      :min="0"
      :step-values="Array.from({ length: 25 }, (_, i) => i)"
      @update:selected-value="handleValueChange"
    />
  </div>
</template>
