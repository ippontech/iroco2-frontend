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
  <section
    class="flex flex-col lg:grid lg:grid-cols-2 gap-16 sm:p-8 lg:p-28 xl:p-40"
  >
    <div class="grid gap-8">
      <h1 class="text-4xl font-bold font-title">{{ $t("contact.title") }}</h1>
      <h2 class="text-xl text-green-500">{{ $t("contact.subtitle") }}</h2>
      <p class="text-justify">{{ $t("contact.description") }}</p>
      <img
        src="~/assets/static/ask-demo.svg"
        v-bind:alt="t('contact.askDemo')"
        class="w-1/2 mx-auto"
      />
    </div>

    <div>
      <form class="w-full space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="companyName">
          <FormItem>
            <FormLabel>{{ $t("contact.form.company") }}</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="mail">
          <FormItem>
            <FormLabel>{{ $t("contact.form.mail") }}</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="subject">
          <FormItem>
            <FormLabel>{{ $t("contact.form.subject.title") }}</FormLabel>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Demander une démo">{{
                    $t("contact.askDemo")
                  }}</SelectItem>
                  <SelectItem value="Signaler un problème">{{
                    $t("contact.form.subject.signalProblem")
                  }}</SelectItem>
                  <SelectItem value="Suggestion">{{
                    $t("contact.form.subject.suggestion")
                  }}</SelectItem>
                  <SelectItem value="Autres">{{
                    $t("contact.form.subject.other")
                  }}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="message">
          <FormItem>
            <FormLabel>{{ $t("contact.form.yourDemand") }}</FormLabel>
            <FormControl>
              <Textarea rows="10" v-bind="componentField" class="resize-none" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button type="submit" variant="black">
          {{ $t("contact.form.send") }}
        </Button>
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
const { t } = useI18n();
const formSchema = toTypedSchema(
  z.object({
    companyName: z
      .string({ required_error: t("contact.form.errors.mandatoryField") })
      .min(2, {
        message: t("contact.form.errors.companyNameMinLength"),
      })
      .max(255, {
        message: t("contact.form.errors.companyNameMaxLength"),
      }),
    mail: z
      .string({ required_error: t("contact.form.errors.mandatoryField") })
      .email({ message: t("contact.form.errors.invalidEmail") }),
    subject: z.string({
      required_error: t("contact.form.errors.mandatoryField"),
    }),
    message: z
      .string({ required_error: t("contact.form.errors.mandatoryField") })
      .min(10, { message: t("contact.form.errors.messageMinLength") })
      .max(500, { message: t("contact.form.errors.messageMaxLength") }),
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
      title: t("contact.form.sentNotification"),
      color: NuxtColors.success,
    });
    form.resetForm();
  });
});
</script>
