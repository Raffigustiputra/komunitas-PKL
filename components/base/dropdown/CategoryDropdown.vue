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
  props: {
    items: {
      type: Array,
      required: true,
    },

    modelValue: {
      type: [String, Number],
      required: false,
    },
  },
  data() {
    return {
      selected: this.modelValue || (this.items.length > 0 ? this.items[0].value : ''),
    };
  },
  methods: {
    handleSelectChange(event) {
      this.$emit("update:modelValue", this.selected); 
    },
  },
  watch: {
    modelValue(newVal) {
      this.selected = newVal; 
    },
  },
};
</script>
