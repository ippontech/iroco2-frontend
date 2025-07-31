<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost">
        <MoreHorizontal class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        class="text-red-500 flex gap-2"
        @click="$emit('deleteInfrastructure', infrastructure)"
      >
        <UIcon name="i-heroicons-trash-16-solid" />
        Supprimer cette infrastructure
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-vue-next";
import type { Infrastructure } from "~/type/infrastructure/Infrastructure";

export interface Props {
  infrastructure: Infrastructure;
}

defineProps<Props>();

defineEmits(["deleteInfrastructure"]);
</script>
