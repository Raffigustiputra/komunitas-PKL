<template>
  <div class="inline-block" ref="dropdownRef">
    <button
      class="flex bg-transparent items-center p-2 rounded-full hover:cursor-pointer hover:bg-gray-200"
      @click="toggleDropdown"
    >
      <component :is="iconComponent" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg"
      @click.self="closeDropdown"
    >
      <ul>
        <li
          v-for="(item, index) in dropdownItems"
          :key="index"
          @click="handleItemClick(item)"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: Object,
      required: true,
    },
    dropdownItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    iconComponent() {
      return this.icon;
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        document.addEventListener("click", this.handleClickOutside);
      } else {
        document.removeEventListener("click", this.handleClickOutside);
      }
    },
    closeDropdown() {
      this.isOpen = false;
      document.removeEventListener("click", this.handleClickOutside);
    },
    handleItemClick(item) {
      if (item.onClick && typeof item.onClick === "function") {
        item.onClick();
      }
      this.closeDropdown();
    },
    handleClickOutside(event) {
      if (this.$refs.dropdownRef && !this.$refs.dropdownRef.contains(event.target)) {
        this.closeDropdown();
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>
