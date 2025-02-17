<template>
  <div ref="dropdown" class="relative">
    <button
      class="flex px-3 gap-2 justify-between rounded-full bg-transparent text-[#3D3BF3] items-center hover:opacity-90 hover:cursor-pointer transition-all border border-[#3D3BF3] w-full"
      @click="toggleDropdown"
    >
      <span>{{ selectedItem || dropdownName }}</span>
      <span>&#9662;</span>
    </button>
    <div
      v-if="isOpen"
      class="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10"
    >
      <ul class="py-2">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          @click="selectItem(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dropdownName: {
      type: String,
      default: "Select an option"
    },
    items: {
      type: Array,
      required: true
    },
    modelValue: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isOpen: false,
      selectedItem: this.modelValue
    };
  },
  watch: {
    modelValue(newVal) {
      this.selectedItem = newVal;
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectItem(item) {
      this.selectedItem = item;
      this.$emit('update:modelValue', item);
      this.isOpen = false;
    },
    handleClickOutside(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.isOpen = false;
      }
    }
  }
};
</script>