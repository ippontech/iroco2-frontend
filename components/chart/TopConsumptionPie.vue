<template>
  <div class="flex items-center basis-1/2 gap-4">
    <div class="flex justify-center" style="height: 180px; width: 500px">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartOptions, ChartData } from "chart.js";
import type { RelativeCarbonFootprint } from "~/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);
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
    label: "Autres",
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
