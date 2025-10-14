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
import { createColumnHelper } from "@tanstack/vue-table";
import type { CloudServiceProvider } from "~/type/infrastructure/CloudServiceProvider";
import type { Infrastructure } from "~/type/infrastructure/Infrastructure";

const columnHelper = createColumnHelper<Infrastructure>();

export const columns = [
  columnHelper.accessor("name", {
    header: "Nom",
    cell: ({ row }) => h("p", { class: "font-bold" }, row.getValue("name")),
  }),

  columnHelper.accessor("cloudServiceProvider", {
    header: "Type",
    cell: ({ row }) => {
      const cloudServiceProvider: CloudServiceProvider = row.getValue(
        "cloudServiceProvider",
      );
      return h("p", cloudServiceProvider.name);
    },
  }),
];
