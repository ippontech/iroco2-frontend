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
      <ChartReportHistoryBar class="pb-10" :reports="scansForChart" />
    </CardCustom>
    <CardCustom>
      <div class="flex justify-between pb-8">
        <h1 class="text-2xl font-bold">Vos scans :</h1>
        <Button
          variant="outline"
          title="Rafraîchir la liste"
          @click="refresh()"
        >
          <UIcon name="i-heroicons-arrow-path-16-solid" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Id </TableHead>
            <TableHead> Status </TableHead>
            <TableHead> Date du scan </TableHead>
            <TableHead> Impact carbone </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in scans" :key="row.id">
            <NuxtLink
              :to="`/scanner/${row.id}`"
              class="cursor-pointer contents"
            >
              <TableCell> {{ row.id }} </TableCell>
              <TableCell> {{ row.status }} </TableCell>
              <TableCell> {{ isoToHuman(row.dateCreation) }} </TableCell>
              <TableCell>
                {{ row.co2Converted.noUnitValue }}
                {{ row.co2Converted.unit }}CO2eq
              </TableCell>
            </NuxtLink>
          </TableRow>
        </TableBody>
      </Table>
    </CardCustom>
  </div>
</template>

<script setup lang="ts">
import { isoToHuman } from "~/lib/dateParser";
definePageMeta({
  middleware: ["auth"],
});

const { $api } = useNuxtApp();
const scans = ref(await $api.scanService.getAllScans());
const scansForChart = computed(() =>
  scans.value.map(({ co2Gr, dateCreation }) => ({
    co2Gr,
    dayISODate: dateCreation,
  })),
);
const refresh = async () => {
  scans.value = await $api.scanService.getAllScans();
};
</script>
