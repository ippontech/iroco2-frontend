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
const model = defineModel<string>({ required: true });

const updateValue = (newValue: number) => {
  model.value = newValue.toString();
};
</script>

<template>
  <SliderNumber
    label="Nombre de jours par mois"
    class="w-full"
    :default-value="Number(model)"
    :step="1"
    unit="jours"
    :min="0"
    :step-values="Array.from({ length: 32 }, (_, i) => i)"
    @update:selected-value="updateValue"
  />
</template>
