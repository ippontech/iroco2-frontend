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

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

const inputField = ref(null);

interface Props {
  title: string;
}

const props = defineProps<Props>();

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
