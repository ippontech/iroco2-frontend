<template>
  <div class="container flex flex-col gap-8">
    <CardCustomCard>
      <ChartReportHistoryBar class="pb-10" :reports="analysesForChart" />
    </CardCustomCard>
    <CardCustomCard>
      <div class="flex justify-between pb-8">
        <h1 class="text-2xl font-bold">Vos analyses :</h1>
        <div class="flex gap-4">
          <Button
            variant="outline"
            title="Rafraîchir la liste"
            @click="refresh()"
          >
            <UIcon name="i-heroicons-arrow-path-16-solid" />
          </Button>
          <Button variant="black" @click="openModal">
            + Nouvelle analyse
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Id </TableHead>
            <TableHead> Status </TableHead>
            <TableHead> Date de l'analyse </TableHead>
            <TableHead> Impact carbone </TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in analyses" :key="row.id">
            <NuxtLink :to="`/cur/${row.id}`" class="cursor-pointer contents">
              <TableCell> {{ row.id }} </TableCell>
              <TableCell> {{ row.status }} </TableCell>
              <TableCell> {{ isoToHuman(row.dateCreation) }} </TableCell>
              <TableCell>
                {{ row.co2Converted.noUnitValue }}
                {{ row.co2Converted.unit }}CO2eq
              </TableCell>
            </NuxtLink>
            <TableCell>
              <Button
                variant="outline"
                class="text-red-500"
                title="Supprimer cette anayse"
                @click="openDeletionModalForAnalysis(row.id)"
              >
                <UIcon name="i-heroicons-trash-16-solid" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardCustomCard>
    <AddAnalysisAlert
      v-model="addAnalysisModalOpened"
      @update:analyses="refresh"
    />
    <AlertDialog v-model:open="analysisDeletionModalOpened">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Supprimer l'analyse
            {{
              analyses.find((analysis) => analysis.id === analysisToDelete)
                ?.id ?? ""
            }}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action va supprimer de façon permanente l'analyse.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            :class="buttonVariants({ variant: 'destructive' })"
            @click="deleteAnalysis"
          >
            Supprimer l'analyse
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { isoToHuman } from "~/lib/dateParser";
import AddAnalysisAlert from "~/components/alert/AddAnalysisAlert.vue";
import { buttonVariants } from "~/components/ui/button";

definePageMeta({
  middleware: ["auth"],
});

const { $api } = useNuxtApp();

const addAnalysisModalOpened = ref(false);

const analyses = ref(await $api.analysisService.getAllAnalyses());

const refresh = async () => {
  analyses.value = await $api.analysisService.getAllAnalyses();
};

const analysesForChart = computed(() =>
  analyses.value.map(({ co2Gr, dateCreation }) => ({
    co2Gr,
    dayISODate: dateCreation,
  })),
);

function openModal() {
  addAnalysisModalOpened.value = true;
}

const analysisToDelete = ref<string>("");
const analysisDeletionModalOpened = ref(false);

const openDeletionModalForAnalysis = (id: string) => {
  analysisToDelete.value = id;
  analysisDeletionModalOpened.value = true;
};

async function deleteAnalysis() {
  await useNuxtApp().$api.analysisService.deleteAnalysis(
    analysisToDelete.value,
  );
  analyses.value = await $api.analysisService.getAllAnalyses();
}
</script>
