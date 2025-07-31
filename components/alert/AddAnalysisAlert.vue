<template>
  <AlertDialog v-model:open="addAnalysisModalOpened">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle
          >Importer le fichier CUR (Cost and Usage Report) d'AWS
        </AlertDialogTitle>
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
          >Annuler</Button
        >
        <Button
          data-tid="add-analysis-button"
          :disabled="loading || !file"
          variant="lime500"
          @click="uploadFile"
          >{{ loading ? "Envoi..." : "Ajouter l'analyse" }}</Button
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

const emits = defineEmits(["update:analyses"]);

const addFile = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement.files) return;
  file.value = inputElement.files[0];
};

const uploadFile = async () => {
  if (!file.value) return;
  loading.value = true;
  await $api.curService.uploadFile(file.value);
  loading.value = false;
  emits("update:analyses");
  closeModal();
};
</script>
