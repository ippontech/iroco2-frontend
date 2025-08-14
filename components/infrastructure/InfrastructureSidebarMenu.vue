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
  <div class="flex flex-col transition animate-in-[fade-out_0.2s_ease-in-out]">
    <span
      class="uppercase font-bold font-title text-sm text-iroco-greenish-white brightness-50 pb-2"
    >
      Infrastructure
    </span>
    <SidebarItem
      :to="`/calculatrice/infrastructure/${infraId}`"
      icon="ph:article-bold"
      text="Vue d'ensemble"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const route = useRoute();
const infraId = computed(() => route.params.infrastructureID);
</script>
