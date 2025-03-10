<template>
  <button
    class="flex bg-transparent w-10 h-10 items-center p-2 rounded-full hover:cursor-pointer hover:bg-gray-200 dark:bg-[#1d1d25]"
    @click="handleClick"
  >
    <component :is="iconComponent" />
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: Object, 
      required: true,
    },
    onclick: {
      type: Function,
      default: null,
    },
  },
  computed: {
    iconComponent() {
      return this.icon;
    }
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
