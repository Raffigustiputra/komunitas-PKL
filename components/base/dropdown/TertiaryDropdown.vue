<template>
  <div class="relative w-full">
    <select
      class="w-full bg-transparent border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
      v-model="selectedItem"
      @change="selectItem"
    >
      <option v-for="(item, index) in items" :key="index" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedItem: this.items.length > 0 ? this.items[0] : null
    };
  },
  methods: {
    selectItem() {
      console.log("Selected:", this.selectedItem);
    }
  }
};
</script>
