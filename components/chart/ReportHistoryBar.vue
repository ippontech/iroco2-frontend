<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { isoToHumanDayOnly } from "~/lib/dateParser";
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
const labels = computed(() =>
  props.reports.map((report) => isoToHumanDayOnly(report.dayISODate)),
);
const dataChart = computed(() => props.reports.map((report) => report.co2Gr));
const data: Ref<ChartData<"bar">> = computed(() => {
  return {
    labels: labels.value,
    datasets: [
      {
        label: "Impact CO2",
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
        text: "Émissions de CO2 (g)",
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
