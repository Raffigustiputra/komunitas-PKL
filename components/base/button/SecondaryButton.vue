<template>
  <button class="flex bg-transparent font-bold text-[#3D3BF3] items-center p-3 rounded-full hover:opacity-[80%] hover:cursor-pointer" @click="handleClick">
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
