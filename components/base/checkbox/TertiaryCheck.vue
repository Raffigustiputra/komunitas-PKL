<template>
  <label
    class="flex items-center gap-2 px-4 py-2 bg-[#ECECEC] rounded-full cursor-pointer select-none transition-all hover:opacity-80"
    @click="handleClick"
  >
    <input
      type="checkbox"
      class="hidden"
      :checked="modelValue"
      @change="toggleChecked"
    />
    <div
      class="w-6 h-6 flex items-center justify-center border-2 rounded-md transition-all"
      :class="
        modelValue
          ? 'border-[#3D3BF3] bg-white text-[#3D3BF3]'
          : 'border-gray-400 bg-white'
      "
    >
      <svg
        v-if="modelValue"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    </div>
    <span class="font-bold text-[#3D3BF3]">{{ label }}</span>
  </label>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  label: { type: String, default: "Pilih semua" },
  modelValue: { type: Boolean, default: false },
  onClick: { type: Function, default: null },
});

const emit = defineEmits(["update:modelValue"]);

const toggleChecked = () => {
  emit("update:modelValue", !props.modelValue);
};

const handleClick = (event) => {
  toggleChecked();
  if (props.onClick) {
    props.onClick(event); 
  }
};
</script>
