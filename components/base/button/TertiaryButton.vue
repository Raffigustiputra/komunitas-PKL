<template>
  <button class="flex bg-transparent items-center p-2 rounded-full dark:hover:bg-gray-700 dark:text-white hover:cursor-pointer hover:bg-gray-200" @click="handleClick">
    <component :is="icon" class="w-6 h-6 mr-2" />
    {{ buttonName }}
  </button>
</template>

<script>
export default {
  props: {
    buttonName: {
      type: String,
      default: "Tertiary",
    },
    icon: {
      type: Object, 
      required: true,
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
