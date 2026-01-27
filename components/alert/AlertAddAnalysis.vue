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
  <AlertDialog v-model:open="addAnalysisModalOpened">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{
          $t("alerts.addAnalysis.title")
        }}</AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogDescription
        class="pt-6 text-sm grid gap-6 text-muted-foreground"
      >
        <Input accept=".csv" type="file" @change="addFile" />
      </AlertDialogDescription>
      <AlertDialogFooter>
        <Button
          data-tid="cancel-analysis-button"
          variant="outline"
          @click="closeModal"
          >{{ $t("buttons.cancel") }}</Button
        >
        <Button
          data-tid="add-analysis-button"
          :disabled="loading || !file"
          variant="lime500"
          @click="uploadFile"
          >{{
            loading
              ? $t("alerts.addAnalysis.uploading")
              : $t("alerts.addAnalysis.add")
          }}</Button
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

const { $api } = useNuxtApp();

const addAnalysisModalOpened = defineModel<boolean>();
const loading = ref(false);
const file = ref<File | null>(null);

function closeModal() {
  addAnalysisModalOpened.value = false;
}

const emit = defineEmits<{
  "update:analyses": [];
}>();

const addFile = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement.files) return;
  file.value = inputElement.files[0];
};

const uploadFile = async () => {
  if (!file.value) return;
  loading.value = true;
  await $api.curApiClient.uploadFile(file.value);
  loading.value = false;
  emit("update:analyses");
  closeModal();
};
</script>
