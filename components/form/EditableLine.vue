<template>
  <div>
    <span
      v-if="!isEditing"
      ref="az"
      class="hover:cursor-pointer"
      @click="startEditing"
      >{{ editedTitle }}</span
    >
    <input
      v-else
      ref="inputField"
      v-model="editedTitle"
      @blur="saveEdit"
      @keyup.enter="saveEdit"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const inputField = ref(null);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:title"]);

const isEditing = ref(false);
const editedTitle = ref(props.title);

const startEditing = () => {
  isEditing.value = true;
  nextTick(() => {
    if (inputField.value) {
      inputField.value.focus();
    }
  });
};

const saveEdit = () => {
  isEditing.value = false;
  emit("update:title", editedTitle.value);
};

watch(
  () => props.title,
  (newTitle) => {
    editedTitle.value = newTitle;
  },
);

onMounted(() => {
  editedTitle.value = props.title;
});
</script>
