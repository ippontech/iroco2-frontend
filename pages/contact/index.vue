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
  <section
    class="flex flex-col lg:grid lg:grid-cols-2 gap-16 sm:p-8 lg:p-28 xl:p-40"
  >
    <div class="grid gap-8">
      <h1 class="text-4xl font-bold font-title">Une question ?</h1>
      <h2 class="text-xl text-green-500">Contactez-nous</h2>
      <p class="text-justify">
        N'hésitez pas à nous contacter pour toute question ou demande
        d'information. Que ce soit pour en savoir plus sur nos services, obtenir
        de l'aide ou partager vos suggestions, notre équipe est là pour vous
        répondre rapidement. Nous sommes impatients de vous accompagner !
      </p>
      <img
        src="~/assets/static/ask-demo.svg"
        alt="Demander une démo"
        class="w-1/2 mx-auto"
      />
    </div>

    <div>
      <form class="w-full space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="companyName">
          <FormItem>
            <FormLabel>Nom de l'entreprise</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="mail">
          <FormItem>
            <FormLabel>Mail de contact</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="subject">
          <FormItem>
            <FormLabel>Sujet</FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Demander une démo"
                    >Demander une démo</SelectItem
                  >
                  <SelectItem value="Signaler un problème"
                    >Signaler un problème</SelectItem
                  >
                  <SelectItem value="Suggestion">Suggestion</SelectItem>
                  <SelectItem value="Autres">Autres</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="message">
          <FormItem>
            <FormLabel>Votre demande</FormLabel>
            <FormControl>
              <Textarea rows="10" v-bind="componentField" class="resize-none" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" variant="black"> Envoyer </Button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import contactService from "~/service/contactService";
import NuxtColors from "~/type/NuxtColors";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

definePageMeta({
  layout: "public",
});

const notificationHandler = useToast();

const formSchema = toTypedSchema(
  z.object({
    companyName: z
      .string({ required_error: "Champ obligatoire" })
      .min(2, {
        message: "Le nom de l'entreprise doit faire plus de 2 caractères",
      })
      .max(255, {
        message: "Le nom de l'entreprise doit faire moins de 255 caractères",
      }),
    mail: z
      .string({ required_error: "Champ obligatoire" })
      .email({ message: "Adresse mail invalide" }),
    subject: z.string({ required_error: "Champ obligatoire" }),
    message: z
      .string({ required_error: "Champ obligatoire" })
      .min(10, { message: "Le message doit faire plus de 10 caractères" })
      .max(500, { message: "Le message doit faire moins de 500 caractères" }),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  const body = {
    company_name: values.companyName,
    type: values.subject,
    email: values.mail,
    message: values.message,
  };

  await contactService.requestDemoEmail(body).then(() => {
    notificationHandler.add({
      title:
        "Courriel envoyé. Nous faisons notre possible pour vous répondre au plus vite.",
      color: NuxtColors.success,
    });
    form.resetForm();
  });
});
</script>
