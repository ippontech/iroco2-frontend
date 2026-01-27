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

<script setup lang="ts" generic="TData, TValue">
import type { ExpandedState, Updater } from "@tanstack/vue-table";
import {
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import type { Ref } from "vue";
import { ref } from "vue";
import type { Infrastructure } from "~/type/infrastructure/Infrastructure";
import type { CloudServiceProvider } from "~/type/infrastructure/CloudServiceProvider";

const expanded = ref<ExpandedState>({});

function valueUpdater<U, T extends Updater<U>>(updaterOrValue: T, ref: Ref<U>) {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
}

const { $api } = useNuxtApp();

const infrastructuresStore = useInfrastructuresStore();

const { infrastructures } = storeToRefs(infrastructuresStore);

const columnHelper = createColumnHelper<Infrastructure>();

const { t } = useI18n();

const columns = [
  columnHelper.accessor("name", {
    header: t("infrastructure.columns.name"),
    cell: ({ row }) => h("p", { class: "font-bold" }, row.getValue("name")),
  }),

  columnHelper.accessor("cloudServiceProvider", {
    header: t("infrastructure.columns.type"),
    cell: ({ row }) => {
      const cloudServiceProvider: CloudServiceProvider = row.getValue(
        "cloudServiceProvider",
      );
      return h("p", cloudServiceProvider.name);
    },
  }),
];

const table = useVueTable({
  data: infrastructures,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  state: {
    get expanded() {
      return expanded.value;
    },
  },
});

const infrastructureDeletionModalOpened = ref(false);
const infrastructureToDelete = ref<Infrastructure>();

function deleteInfrastructure(infrastructure: Infrastructure) {
  infrastructureDeletionModalOpened.value = true;
  infrastructureToDelete.value = infrastructure;
}

async function confirmInfrastructureDeletion(infrastructure: Infrastructure) {
  await $api.infrastructureApiClient.deleteInfra(infrastructure.id!);
  await infrastructuresStore.fetchInfrastructures();
}

const navigateToInfra = (infra: Infrastructure) => {
  navigateTo(`/calculatrice/infrastructure/${infra.id}`);
};
</script>

<template>
  <div class="border rounded-md overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <template v-for="row in table.getRowModel().rows" :key="row.id">
            <TableRow
              :data-state="row.getIsSelected() ? 'selected' : undefined"
              class="hover:cursor-pointer"
              @click="navigateToInfra(row.original)"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
              <TableCell class="w-16" @click.stop>
                <InfrastructureTableDropDown
                  :infrastructure="row.original"
                  @delete-infrastructure="deleteInfrastructure"
                />
              </TableCell>
            </TableRow>
            <TableRow v-if="row.getIsExpanded()">
              <TableCell :colspan="row.getAllCells().length">
                {{ JSON.stringify(row.original) }}
              </TableCell>
            </TableRow>
          </template>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length + 1" class="h-24 text-center">
              {{ $t("infrastructure.noInfrastructure") }}
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>

    <InfrastructureDeleteAlert
      v-model:open="infrastructureDeletionModalOpened"
      :infrastructure="infrastructureToDelete"
      @confirm-infrastructure-deletion="confirmInfrastructureDeletion"
    />
  </div>
</template>
