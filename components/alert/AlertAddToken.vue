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
  <AlertDialog v-model:open="addTokenModalOpened">
    <AlertDialogContent>
      <form @submit.prevent="handleSubmit">
        <AlertDialogHeader>
          <AlertDialogTitle>Configuration du scanner </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription class="flex flex-col gap-3 mt-5">
          <FormField v-slot="{ componentField }" name="awsID">
            <FormItem>
              <FormLabel>Numéro de compte AWS :</FormLabel>
              <FormControl>
                <Input v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="expirationDate">
            <FormItem>
              <FormLabel>Date d'expiration :</FormLabel>
              <FormControl>
                <Input type="date" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormTokenInput class="mt-5" :token="generatedToken" />
        </AlertDialogDescription>
        <AlertDialogFooter class="mt-5">
          <Button variant="outline" type="button" @click="closeModal"
            >Fermer</Button
          >
          <Button variant="black" type="submit">Créer le scanner</Button>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const addTokenModalOpened = defineModel<boolean>();

const formSchema = toTypedSchema(
  z.object({
    awsID: z
      .string()
      .length(
        12,
        "Le numéro de compte AWS doit contenir exactement 12 caractères",
      ),
    expirationDate: z.string().refine(
      (val) => {
        const selectedDate = new Date(val);
        const today = new Date();
        return selectedDate > today;
      },
      {
        message:
          "La date d'expiration doit être supérieure à la date d'aujourd'hui",
      },
    ),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const handleSubmit = form.handleSubmit(async (values) => {
  const tokenBody = {
    aws_account_id: values.awsID,
    expire_in_seconds: durationBetween(getTodayDate(), values.expirationDate),
  };
  generatedToken.value = await $api.tokenService.getToken(tokenBody);
});

const closeModal = () => {
  addTokenModalOpened.value = false;
  generatedToken.value = "";
};

const { $api } = useNuxtApp();

const generatedToken = ref("");
</script>
