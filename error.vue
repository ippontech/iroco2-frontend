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
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
const { $router } = useNuxtApp();
const redirectToRoot = () => {
  $router.push("/");
};
definePageMeta({
  isPrivate: false,
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-full h-auto sm:w-1/2 lg:w-1/4 text-center">
      <img src="~/assets/static/error-logo-1.png" alt="Logo" />
      <p class="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold">Ooops !</p>
      <p class="mt-4 text-xs sm:text-sm md:text-base">
        <span v-if="!props.error?.data" class="font-bold">{{
          props.error?.statusCode
        }}</span>
        <span v-if="!props.error?.data"> - </span>
        {{ props.error?.message }}
      </p>
      <Button variant="black" class="mt-12" @click="redirectToRoot()"
        >Retourner sur Iroco<sub class="text-xs">2</sub></Button
      >
    </div>
  </div>
</template>
