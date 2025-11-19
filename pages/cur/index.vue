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
  <div class="container flex flex-col gap-8">
    <CardCustom>
      <ChartReportHistoryBar class="pb-10" :reports="analysesForChart" />
    </CardCustom>
    <CardCustom>
      <div class="flex justify-between pb-8">
        <h1 class="text-2xl font-bold">{{ $t("cur.yourAnalyses") }}</h1>
        <div class="flex gap-4">
          <Button
            variant="outline"
            :title="$t('cur.refreshList')"
            @click="refresh()"
          >
            <UIcon name="i-heroicons-arrow-path-16-solid" />
          </Button>
          <Button variant="black" @click="openModal">
            + {{ $t("cur.newAnalysis") }}
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> {{ $t("cur.table.id") }} </TableHead>
            <TableHead> {{ $t("cur.table.status") }} </TableHead>
            <TableHead> {{ $t("cur.table.analysisDate") }} </TableHead>
            <TableHead> {{ $t("cur.table.carbonImpact") }} </TableHead>
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
                :title="$t('cur.deleteAnalysis')"
                @click="openDeletionModalForAnalysis(row.id)"
              >
                <UIcon name="i-heroicons-trash-16-solid" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardCustom>
    <AlertAddAnalysis
      v-model="addAnalysisModalOpened"
      @update:analyses="refresh"
    />
    <AlertDialog v-model:open="analysisDeletionModalOpened">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {{ $t("cur.deleteModal.title") }}
            {{
              analyses.find((analysis) => analysis.id === analysisToDelete)
                ?.id ?? ""
            }}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {{ $t("cur.deleteModal.description") }}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{{
            $t("cur.deleteModal.cancel")
          }}</AlertDialogCancel>
          <AlertDialogAction
            :class="buttonVariants({ variant: 'destructive' })"
            @click="deleteAnalysis"
          >
            {{ $t("cur.deleteModal.confirmDelete") }}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
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
