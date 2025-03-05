<template>
  <button
    class="flex bg-transparent font-bold text-black items-center rounded-full hover:opacity-80 hover:cursor-pointer focus:text-[#3D3BF3] dark:text-white"
    @click="handleClick">
    {{ buttonName }}
  </button>
</template>

<script>
export default {
  props: {
    buttonName: {
      type: String,
      default: "hai"
    },
    onclick: {
      type: Function,
      default: null,
    },
  },
  methods: {
    handleClick() {
      if (this.onclick) {
        this.onclick();
      }
    },
  },
};
</script>
