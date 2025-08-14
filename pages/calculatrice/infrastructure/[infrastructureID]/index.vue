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
  <div class="overflow-y-auto">
    <div class="flex justify-end gap-10">
      <Button variant="black" class="flex gap-2" @click="addComponent">
        <Icon name="ph:plus-bold" />
        <span>Ajouter un composant</span>
      </Button>
      <Button
        variant="lime500"
        class="flex gap-2"
        @click="navigateToEstimation"
      >
        <span>Estimer l'empreinte</span>
        <Icon name="ph:arrow-right" />
      </Button>
    </div>
    <div class="pt-8">
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Nom</TableHead>
              <TableHead> Dernière modification</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="component in components" :key="component.id">
              <TableCell class="w-7/12"> {{ component.name }} </TableCell>
              <TableCell class="w-4/12">
                {{ isoToHuman(component.lastModificationDate) }}
              </TableCell>
              <TableCell class="flex flex-nowrap w-1/12 space-x-4">
                <Button
                  variant="outline"
                  title="Modifier ce composant"
                  @click="navigateToEdit(component)"
                >
                  <UIcon name="i-heroicons-pencil-16-solid" />
                </Button>
                <Button
                  variant="outline"
                  class="text-red-500"
                  title="Supprimer ce composant"
                  @click="openDeletionModalForComponent(component.id)"
                >
                  <UIcon name="i-heroicons-trash-16-solid" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
    <AlertDialog v-model:open="componentDeletionModalOpened">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle
            >Supprimer le composant
            {{
              components.find((c) => c.id === componentToDelete)?.name ?? ""
            }}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action va supprimer de façon permanente le composant de cette
            infrastructure.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            :class="buttonVariants({ variant: 'destructive' })"
            @click="deleteComponent"
          >
            Supprimer le composant
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>

<script setup lang="ts">
import { isoToHuman } from "~/lib/dateParser";
import { buttonVariants } from "~/components/ui/button";
import type { Component } from "~/type/infrastructure/Component";

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
const infrastructureId: string = Array.isArray(route.params.infrastructureID)
  ? route.params.infrastructureID[0]
  : route.params.infrastructureID;

const { $api } = useNuxtApp();
const components = ref(
  await $api.componentService.getComponentsByInfrastructureId(infrastructureId),
);

const componentToDelete = ref<string>("");
const componentDeletionModalOpened = ref(false);

const openDeletionModalForComponent = (id: string) => {
  componentToDelete.value = id;
  componentDeletionModalOpened.value = true;
};

const addComponent = () => {
  navigateTo(
    `/calculatrice/infrastructure/${infrastructureId}/available-services`,
  );
};

async function deleteComponent() {
  await useNuxtApp().$api.componentService.deleteComponent(
    componentToDelete.value,
  );
  components.value =
    await $api.componentService.getComponentsByInfrastructureId(
      infrastructureId,
    );
}
const navigateToEdit = async (component: Component) => {
  const { id: componentId, serviceID } = component;
  const serviceName =
    (await $api.catalogService.getById(serviceID)).shortname ?? "";
  navigateTo({
    path: `/calculatrice/infrastructure/${infrastructureId}/create-component`,
    query: {
      componentId,
      cloudServiceProviderServiceID: component.serviceID,
      serviceName,
    },
  });
};

const navigateToEstimation = () => {
  navigateTo({
    path: `/calculatrice/estimation/${infrastructureId}`,
  });
};
</script>
