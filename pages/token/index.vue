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
    <div class="flex justify-between">
      <h1 class="font-title font-bold text-3xl">Vos comptes connectés :</h1>
      <Button variant="black" @click="openModal">+ Créer une clé </Button>
    </div>
    <AddTokenAlert v-model="addTokenModelOpened" />
  </div>
</template>

<script setup lang="ts">
import AddTokenAlert from "~/components/alert/AddTokenAlert.vue";

definePageMeta({
  middleware: ["auth"],
});

const addTokenModelOpened = ref(false);

const openModal = () => {
  addTokenModelOpened.value = true;
};
</script>
