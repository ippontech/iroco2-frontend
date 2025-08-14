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
  <Dialog v-model:open="isDialogOpen">
    <DialogTrigger as-child>
      <Button variant="black" class="flex gap-2">
        <Icon name="ph:plus-bold" />
        <span>Nouvelle infrastructure</span>
      </Button>
    </DialogTrigger>
    <DialogContent class="">
      <DialogHeader>
        <DialogTitle>Créer une infrastructure</DialogTitle>
      </DialogHeader>

      <form class="flex flex-col gap-8 pt-4" @submit="handleSubmit">
        <FormField v-slot="{ componentField }" name="infraName">
          <FormItem>
            <FormLabel>Nom de l'infrastructure</FormLabel>
            <FormControl>
              <Input v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="space-y-2">
          <Label for="cloudProvider">Cloud Service Provider</Label>
          <div class="flex gap-2 max-w-full">
            <div
              id="cloudProvider"
              class="flex flex-col w-32 h-32 rounded-md border border-green-600 bg-muted/50 hover:bg-white transition p-8 items-center justify-center gap-4 relative"
            >
              <img src="assets/static/aws-logo.png" alt="The AWS logo" />
            </div>
          </div>
        </div>

        <FormField v-slot="{ setValue }" name="region">
          <FormItem>
            <FormLabel>Région par défaut de l'infrastructure</FormLabel>
            <FormControl>
              <RecapRegionSelector
                @update:region="(newRegion: Region) => setValue(newRegion)"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <button
          ref="createButton"
          type="submit"
          class="bg-iroco-dark-green text-white px-4 py-2 rounded-xl hover:bg-iroco-light-green focus:outline-none focus:shadow-outline-blue"
        >
          Créer
        </button>
      </form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import type { Button } from "~/components/ui/button";
import { RegionSchema } from "~/type/Region";
import type { Region } from "~/type/Region";
import { Input } from "~/components/ui/input";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import type { InfrastructureRequest } from "~/type/infrastructure/InfrastructureRequest";

const { $api } = useNuxtApp();
const infrastructuresStore = useInfrastructuresStore();
const emit = defineEmits(["infraCreated"]);
const isDialogOpen = ref(false);

const formSchema = toTypedSchema(
  z.object({
    infraName: z
      .string()
      .min(2, "Vous devez renseigner un nom d'au moins 2 charactères"),
    region: RegionSchema,
  }),
);

const form = useForm({
  validationSchema: formSchema,
});
const handleSubmit = form.handleSubmit(async (values) => {
  const infra: InfrastructureRequest = {
    cloudServiceProvider: values.region.csp,
    defaultRegion: values.region.id,
    name: values.infraName,
  };
  await $api.infrastructureService.createNewInfra(infra);
  await infrastructuresStore.fetchInfrastructures();
  isDialogOpen.value = false;
  emit("infraCreated");
});
</script>
