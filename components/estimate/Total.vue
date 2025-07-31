<template>
  <CardCustomCard class="flex justify-around items-center">
    <div class="max-md:">
      L'impact carbone <strong>mensuel</strong> <br />
      de votre infrastructure est :
    </div>
    <div class="font-bold text-4xl max-md:text-2xl max-sm:text-xl">
      {{ total.noUnitValue }}
      {{ total.unit }}CO2eq
    </div>

    <div>Ou encore :</div>
    <div class="flex flex-col gap-8">
      <ScoreBar :carbon-foot-print="total.noUnitValue" :unit="total.unit" />

      <span class="flex justify-end font-light italic text-sm">
        * équivalent obtenus grâce aux données du&nbsp;
        <NuxtLink
          to="https://impactco2.fr/transport"
          external
          class="text-green-900 font-medium"
        >
          Simulateur de l'ADEME
        </NuxtLink>
      </span>
    </div>
  </CardCustomCard>
</template>

<script setup lang="ts">
import type { UnitValue } from "~/type/UnitValue";
import ScoreBar from "~/components/recap/ScoreBar.vue";

const { total } = defineProps<{ total: UnitValue }>();
</script>
