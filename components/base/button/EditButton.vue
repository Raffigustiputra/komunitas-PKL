<template>
  <button
    class="flex p-2 gap-5 justify-center rounded-full hover:opacity-80 hover:cursor-pointer transition-all border border-green-500 text-green-500 font-light" @click="handleClick"
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

