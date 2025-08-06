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
  <div v-if="props.token" class="flex">
    <input
      class="p-2 border rounded-l-lg bg-white"
      :type="inputType"
      readonly
      :value="props.token"
    />
    <button
      type="button"
      class="border px-2 hover:bg-gray-200"
      @click="changeInputType"
    >
      <Icon class="w-5 h-5" name="ph:eye" />
    </button>
    <button
      type="button"
      class="border rounded-r-lg px-2 hover:bg-gray-200"
      @click="copyToken"
    >
      <Icon class="w-5 h-5" name="ph:clipboard" />
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  token: string;
}
const props = defineProps<Props>();

const inputType = ref("password");

const changeInputType = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};
const copyToken = async () => {
  if (props.token) await navigator.clipboard.writeText(props.token);
};
</script>
