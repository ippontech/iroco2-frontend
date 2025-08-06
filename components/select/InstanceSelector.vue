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
  <Selector
    placeholder="instance"
    :values="props.instanceTypes"
    :default-selected-value="selectedInstance"
    @update:value="handleSelect"
  />
</template>

<script setup lang="ts">
import Selector from "~/components/recap/Selector.vue";

const emits = defineEmits(["update:instance"]);

const props = defineProps<{
  instanceTypes: string[];
}>();

const selectedInstance = defineModel<string | undefined>({
  required: true,
});

const handleSelect = (instance: string) => {
  selectedInstance.value = instance;
  emits("update:instance", instance);
};
</script>
