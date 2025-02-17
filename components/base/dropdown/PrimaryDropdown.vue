<template>
  <div class="relative">
    <select
      v-model="selected"
      @change="handleSelectChange"
      class="flex px-3 gap-5 justify-center rounded-full bg-transparent text-[#3D3BF3] items-center hover:opacity-90 hover:cursor-pointer transition-all border border-[#3D3BF3] appearance-none"
    >
      <option
        v-for="(item, index) in items"
        :key="index"
        :value="item.value"
        class="py-2"
      >
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "Public", 
      items: [
        { label: "Public", value: "Public" },
        { label: "Private", value: "Private" },
      ],
    };
  },
  methods: {
    handleSelectChange(event) {
      this.selected = event.target.value;
    },
  },
};
</script>