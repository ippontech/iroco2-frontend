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
