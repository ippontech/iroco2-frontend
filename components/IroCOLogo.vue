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
  <nuxt-link to="/" class="flex items-center">
    <img
      src="../assets/static/no_bg_iroco.png"
      alt="Logo"
      class="h-12 mr-2 m-0 p-0 gap-0 flex-auto"
      :class="variant === 'black' ? 'invert' : ''"
    />
    <div class="grid">
      <span class="text-2xl font-bold">IroCO<sub>2</sub></span>
      <span class="mt-[-0.5rem] font-extralight text-sm">{{
        $t("app.tagline")
      }}</span>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ variant?: "black" | "white" }>(), {
  variant: "white",
});
</script>
