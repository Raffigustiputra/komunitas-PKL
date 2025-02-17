<template>
  <div class="flex gap-3 bg-white p-3 rounded-3xl">
    <div>
      <BaseImageIcon />
    </div>

    <div class="flex flex-col w-full">
      <div>
        <BaseDropdownSecondaryDropdown
          v-if="isDropdownVisible"
          dropdownName="Semua dapat berkomentar"
          :items="['Option 1', 'Option 2', 'Option 3']"
          class="mb-3"
        />
        <BaseInputTextArea @click="showDropdowns" />
        <BaseDropdownPrimaryDropdown
          v-if="isDropdownVisible"
          dropdownName="Publik"
          :items="['Publik', 'Private', 'Lainnya']"
          class="mt-3"
        />
      </div>

      <div class="flex justify-between">
        <div class="flex gap-3">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            hidden
            ref="docInput"
            @change="handleFileSelect"
          />
          <BaseButtonIconButton :icon="Attachment" @click="openDocPicker" />
          <input
            type="file"
            accept="image/*"
            hidden
            ref="imageInput"
            @change="handleFileSelect"
          />
          <BaseButtonIconButton :icon="Image" @click="openImagePicker" />
        </div>
        <div class="flex gap-3">
          <BaseButtonSecondaryButton buttonName="Drafts" />
          <BaseButtonPrimaryButton buttonName="Posting" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Attachment from "~/components/icons/Attachment.vue";
import Image from "~/components/icons/Image.vue";

const docInput = ref(null);
const imageInput = ref(null);
const isDropdownVisible = ref(false);

const openDocPicker = () => {
  docInput.value.click();
};

const openImagePicker = () => {
  imageInput.value.click();
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log("Selected file:", file);
  }
};

const showDropdowns = () => {
  isDropdownVisible.value = true;
};
</script>
