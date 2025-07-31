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
  <div class="container">
    <div class="grid gap-8">
      <section class="grid gap-4">
        <div class="flex items-center justify-between">
          <h2 class="font-title font-bold text-3xl">Mes infrastructures :</h2>
          <CreateInfrastructure
            class="ml-auto"
            @infra-created="handleInfraCreated"
          />
        </div>
        <div class="flex flex-col items-end p-8 rounded border bg-white gap-4">
          <InfrastructuresDataTable :key="tableKey" class="w-full" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreateInfrastructure from "~/components/infrastructure/CreateInfrastructure.vue";

definePageMeta({
  middleware: ["auth"],
});
const tableKey = ref(0);
const handleInfraCreated = async () => {
  tableKey.value++;
};
</script>
