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
  <NuxtLink
    :to="to"
    class="flex gap-4 items-center rounded-sm py-2 px-4 text-sm"
    active-class="bg-iroco-greenish-white brightness-90"
  >
    <Icon :name="icon" />
    <span>{{ text }}</span>
  </NuxtLink>
</template>
<script setup lang="ts">
defineProps<{
  to: string;
  icon: string;
  text: string;
}>();
</script>
