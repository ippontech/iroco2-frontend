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
import type { TabItem } from "#ui/types";
import { symbolToValueMap } from "~/type/MassUnit";

interface Props {
  carbonFootPrint: number;
  unit: string;
}
const props = defineProps<Props>();

interface EquivalentItem {
  means: string;
  icon: string;
  kgPerWork: number;
  min: number;
  max: number;
}
const equivalents: EquivalentItem[] = [
  {
    means: "km parcouru en voiture thermique",
    icon: "openmoji:exhaust-gases-car",
    kgPerWork: 0.218,
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
  },
  {
    means: "km parcouru en avion sur un vol court courrier",
    icon: "twemoji:airplane",
    kgPerWork: 0.259,
    min: 200,
    max: 1500,
  },
  {
    means: "km parcouru en avion sur un vol moyen courrier",
    icon: "emojione-v1:up-pointing-airplane",
    kgPerWork: 0.188,
    min: 1500,
    max: 3500,
  },
  {
    means: "km parcouru en avion sur un vol long courrier",
    icon: "emojione:airplane",
    kgPerWork: 0.152,
    min: 3500,
    max: Number.MAX_SAFE_INTEGER,
  },
  {
    means: "km parcouru en vélo (ou trottinette) à assistance électrique",
    icon: "noto-v1:kick-scooter",
    kgPerWork: 0.011,
    min: 0,
    max: 50,
  },
  {
    means: "m² chauffé au fioul pendant une année",
    icon: "noto:oil-drum",
    kgPerWork: 57.17,
    min: 5,
    max: 500,
  },
];

const computeEquivalent = (
  icon: string,
  means: string,
  work: number,
): TabItem => {
  return {
    label: "",
    icon: icon,
    content: "Equivalent à",
    means: means,
    work: work,
  };
};

const items = computed(() => {
  const res = [];
  const carbonFootPrintInKg =
    (props.carbonFootPrint * symbolToValueMap[props.unit]) / 1000;
  for (const equivalentItem of equivalents) {
    const work = carbonFootPrintInKg / equivalentItem.kgPerWork;
    if (work > equivalentItem.min && work < equivalentItem.max) {
      res.push(
        computeEquivalent(equivalentItem.icon, equivalentItem.means, work),
      );
    }
  }
  return res;
});
</script>

<template>
  <div class="flex text-center items-center justify-center">
    <UTabs :items="items" class="w-full">
      <template #default="{ item, selected }">
        <div class="flex items-center gap-2 relative truncate">
          <UIcon :name="item.icon" class="w-10 h-10 flex-shrink-0" dynamic />
          <span
            v-if="selected"
            class="absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400"
          />
        </div>
      </template>
      <template #item="{ item }">
        <div class="border p-2 rounded">
          {{ item.content }}
          <span class="font-bold">{{ item.work.toFixed(2) }}</span>
          {{ item.means }}*
        </div>
      </template>
    </UTabs>
  </div>
</template>
