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
  <div class="flex items-center basis-1/2 gap-4">
    <div class="flex justify-center" style="height: 180px; width: 500px">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import type { ChartData, ChartOptions } from "chart.js";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const { t } = useI18n();

const colorsPalette = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9B85",
  "#A2D9CE",
  "#C44536",
  "#35477D",
];
const { relativeCarbonFootprintList } = defineProps<{
  relativeCarbonFootprintList: RelativeCarbonFootprint[];
}>();

const PERCENTAGE_LIMIT = 10;

const greaterThan = relativeCarbonFootprintList.filter(
  (car) => car.percentage > PERCENTAGE_LIMIT,
);
const lowerThan = relativeCarbonFootprintList.filter(
  (car) => car.percentage <= PERCENTAGE_LIMIT,
);

const restCarbon = lowerThan.reduce((acc, car) => acc + car.co2Gr, 0);
if (restCarbon > 0) {
  greaterThan.push({
    percentage: 0,
    label: t("chart.othersLabel"),
    co2Gr: restCarbon,
  });
}

const chartData: ChartData<"doughnut"> = {
  labels: greaterThan.map((item) => item.label),
  datasets: [
    {
      data: greaterThan.map((item) => item.co2Gr),
      backgroundColor: colorsPalette,
    },
  ],
};

const chartOptions: ChartOptions<"doughnut"> = {
  aspectRatio: 2.5,
  cutout: "50%",
  rotation: 0,
  animation: {
    animateRotate: false,
    animateScale: true,
    duration: 1000,
    easing: "easeInOutQuint",
  },
  plugins: {
    legend: {
      position: "right",
      labels: {
        boxWidth: 20,
        padding: 15,
      },
    },
    tooltip: {
      callbacks: {
        label: (context) =>
          `${context.label}: ${Number(context.raw).toFixed(2)}g CO₂`,
      },
    },
  },
};
</script>
