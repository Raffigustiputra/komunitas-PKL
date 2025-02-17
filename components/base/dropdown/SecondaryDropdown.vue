<template>
  <div ref="dropdown">
    <button
      class="flex bg-transparent font-bold text-[#3D3BF3] items-center rounded-full hover:opacity-[80%] hover:cursor-pointer"
      @click="toggleDropdown"
    >
      {{ dropdownName }}
    </button>
    <div
      v-if="isOpen"
      class="absolute mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg"
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
      default: "hai"
    },
    items: {
      type: Array,
      required: true
    },
    onClick: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      isOpen: false
    };
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
      if (this.onClick) {
        this.onClick();
      }
    },
    selectItem(item) {
      console.log('Selected:', item);
      this.isOpen = false;
    },
    handleClickOutside(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>
