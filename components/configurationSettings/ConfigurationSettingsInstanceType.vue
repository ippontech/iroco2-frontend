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
import { ref } from "vue";
import type { Ref } from "vue";

const { $api } = useNuxtApp();

const instanceTypes: Ref<string[]> = ref([]);
const isInstanceEmpty = ref(false);

$api.instanceType.getAllInstanceByType("EC2").then((responses) => {
  instanceTypes.value = responses.map((response) => response.name);
});

const model = defineModel<string>({ required: true });
</script>

<template>
  <div class="flex flex-col gap-2">
    <div class="">Type d'instance :</div>
    <span v-if="isInstanceEmpty" class="text-red-500 text-sm font-bold"
      >Veuillez sélectionner une instance</span
    >
    <InstanceSelector
      v-model="model"
      :instance-types="instanceTypes"
      :class="{ 'border border-red-500': isInstanceEmpty }"
    />
  </div>
</template>
