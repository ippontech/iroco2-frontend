<template>
  <AlertDialog :open="open" @update:open="(e) => close(e)">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle
          >Supprimer l'infrastructure {{ infrastructure?.name }}?
        </AlertDialogTitle>
        <AlertDialogDescription>
          Cette action va supprimer de façon permanente l'infrastructure.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction
          :class="buttonVariants({ variant: 'destructive' })"
          @click="$emit('confirmInfrastructureDeletion', infrastructure)"
        >
          Supprimer l'infrastructure
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

defineEmits(["confirmInfrastructureDeletion"]);

function close() {
  open.value = false;
}
</script>
