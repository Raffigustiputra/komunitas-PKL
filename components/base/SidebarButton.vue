<template>
  <button
    class="flex bg-transparent items-center gap-5 p-3 rounded-full hover:bg-[#ECECEC] focus:bg-[#ECECEC] focus:text-[#3D3BF3] focus:font-bold transition-all ease-in-out"
    @click="handleClick"
  >
    <component :is="icon" class="w-6 h-6" />
    {{ buttonName }}
  </button>
</template>

<script>
export default {
  props: {
    buttonName: {
      type: String,
      default: "Sidebar",
    },
    icon: {
      type: Object,
      required: true,
    },
    onClick: {
      type: Function,
      default: null,
    },
  },
  methods: {
    handleClick() {
      if (this.onClick) {
        this.onClick(); 
      }
    },
  },
};
</script>
