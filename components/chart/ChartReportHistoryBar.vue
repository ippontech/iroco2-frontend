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
import { Bar } from "vue-chartjs";
import type { ChartData, ChartOptions } from "chart.js";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export interface Props {
  reports: {
    dayISODate: string;
    co2Gr: number;
  }[];
}

const props = defineProps<Props>();

const { t } = useI18n();

const labels = computed(() =>
  props.reports.map((report) => isoToHumanDayOnly(report.dayISODate)),
);
const dataChart = computed(() => props.reports.map((report) => report.co2Gr));
const data: Ref<ChartData<"bar">> = computed(() => {
  return {
    labels: labels.value,
    datasets: [
      {
        label: t("chart.impactCO2Label"),
        backgroundColor: "#181D27",
        data: dataChart.value,
      },
    ],
  };
});
const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: true,
  animation: {
    duration: 1000,
    easing: "easeInOutQuint",
  },
  scales: {
    y: {
      title: {
        display: true,
        text: t("chart.co2EmissionsLabel"),
        font: {
          size: 14,
          weight: "bold",
        },
        color: "#000",
      },
    },
  },
};
</script>

<template>
  <div class="flex">
    <Bar :data="data" :options="options" />
  </div>
</template>
