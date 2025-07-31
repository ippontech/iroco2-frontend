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
      const cloudServiceProvider = row.getValue(
        "cloudServiceProvider",
      ) as CloudServiceProvider;
      return h("p", cloudServiceProvider.name);
    },
  }),
];
