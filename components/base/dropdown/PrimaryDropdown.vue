<template>
  <div class=" text-left">
    <button
      @click="toggleDropdown"
      class="px-4 py-2 rounded-full border border-[#3D3BF3] text-[#3D3BF3] hover:bg-[#3D3BF3] hover:text-white transition-all"
    >
      {{ selectedLabel }}
    </button>

    <div
      v-if="dropdownOpen"
      class="absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
    >
      <ul>
        <li
          v-for="(item, index) in filteredItems"
          :key="index"
          @click="selectItem(item)"
          class="px-4 py-2 hover:bg-[#3D3BF3] hover:text-white cursor-pointer"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  dropdownName: {
    type: String,
    default: '', 
  },
});

const emit = defineEmits(['update:modelValue']);
const dropdownOpen = ref(false);

const selectedLabel = computed(() => {
  const selectedItem = props.items.find(item => item.value === props.modelValue);
  return selectedItem ? selectedItem.label : props.dropdownName || props.items[0]?.label || 'Tidak ada opsi';
});

const filteredItems = computed(() => {
  return props.items.filter(item => item.value !== props.modelValue);
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectItem = (item) => {
  emit('update:modelValue', item.value);
  dropdownOpen.value = false;
};

onMounted(() => {
  if (!props.dropdownName && !props.modelValue && props.items.length > 0) {
    emit('update:modelValue', props.items[0].value);
  }
});
</script>

<style scoped>
.dropdown-menu {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
