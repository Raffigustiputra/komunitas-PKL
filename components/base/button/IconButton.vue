<template>
  <button
    class="flex bg-transparent min-w-12 min-h-12 items-center p-2 rounded-full hover:cursor-pointer hover:bg-gray-200"
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
