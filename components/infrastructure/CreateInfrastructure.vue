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
              <RegionSelector
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
import RegionSelector from "~/components/recap/RegionSelector.vue";
import type { Button } from "~/components/ui/button";
import { type Region, RegionSchema } from "~/type/Region";
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
