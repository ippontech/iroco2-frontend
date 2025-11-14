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
  <AlertDialog :open="open" @update:open="(e) => close(e)">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {{ $t("infrastructure.deleteTitle", { name: infrastructure?.name }) }}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {{ $t("infrastructure.deleteDescription") }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{{ $t("buttons.cancel") }}</AlertDialogCancel>
        <AlertDialogAction
          :class="buttonVariants({ variant: 'destructive' })"
          @click="emit('confirmInfrastructureDeletion', infrastructure)"
        >
          {{ $t("infrastructure.alertDeleteAction") }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
<script setup lang="ts">
import { buttonVariants } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import type { Infrastructure } from "~/type/infrastructure/Infrastructure";

const open = defineModel<boolean>("open");

const infrastructure = defineModel<Infrastructure>("infrastructure");

const emit = defineEmits<{
  confirmInfrastructureDeletion: [infrastructure: Infrastructure | undefined];
}>();

function close() {
  open.value = false;
}
</script>
