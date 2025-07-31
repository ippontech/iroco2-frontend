<template>
  <div class="flex flex-col basis-1/2 gap-4">
    <div class="font-bold">Services les moins écologiques :</div>
    <table class="border-2 rounded-md">
      <tr v-for="index in NOMBRE_DE_SERVICES_AFFICHES" :key="index">
        <th class="border-2 p-3">
          {{
            relativeCarbonFootprintList[index - 1]
              ? relativeCarbonFootprintList[index - 1].label
              : "-"
          }}
        </th>
        <td class="border-2 p-3">
          {{
            relativeCarbonFootprintList[index - 1]
              ? relativeCarbonFootprintList[index - 1].percentage.toFixed(1) +
                " %"
              : "-"
          }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { RelativeCarbonFootprint } from "~/lib/utils";

type Props = {
  relativeCarbonFootprintList: Array<RelativeCarbonFootprint>;
};

const NOMBRE_DE_SERVICES_AFFICHES: number = 3;
const { relativeCarbonFootprintList } = defineProps<Props>();
</script>
