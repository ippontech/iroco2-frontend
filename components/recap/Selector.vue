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

<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import { Button } from "~/components/ui/button";
import { ref } from "vue";

const open = ref(false);

interface Props {
  defaultSelectedValue?: string;
  values: string[];
  placeholder: string;
}

const props = defineProps<Props>();

const selectedValue = ref(props.defaultSelectedValue);

const emits = defineEmits(["update:value"]);
const handleSelect = (instance: string) => {
  selectedValue.value = instance;
  open.value = false;
  emits("update:value", instance);
};
</script>

<template>
  <Popover v-model:open="open" class="flex flex-col">
    <PopoverTrigger as-child>
      <Button
        role="combobox"
        aria-controls="popover-trigger"
        :aria-expanded="open"
        variant="outline"
        class="w-full justify-between"
      >
        {{ selectedValue ?? "Sélectionner une " + props.placeholder + " ..." }}
      </Button>
    </PopoverTrigger>
    <PopoverContent
      class="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0"
      align="start"
    >
      <Command class="w-full">
        <CommandInput :placeholder="'Search ' + props.placeholder + ' ...'" />
        <CommandEmpty>Aucune {{ props.placeholder }} trouvée.</CommandEmpty>
        <CommandList class="h-96">
          <CommandGroup>
            <CommandItem
              v-for="item in props.values"
              :key="item"
              :value="item"
              @select="handleSelect(item)"
            >
              {{ item }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
