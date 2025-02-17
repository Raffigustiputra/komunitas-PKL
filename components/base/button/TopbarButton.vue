<template>
  <button
    class="flex bg-transparent items-center gap-5 px-6 py-2 rounded-full text-black font-bold transition-all ease-in-out hover:opacity-80"
    :class="{ 'text-white': isActive }"
    :style="{ backgroundColor: isActive ? '#3D3BF3' : 'transparent' }"
    @click="handleClick"
  >
    <component :is="icon" class="w-6 h-6" />
    {{ buttonName }}
  </button>
</template>


<script>
import { computed } from "vue";
import { useRoute } from "vue-router";

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
      required: true,
    },
    path: { 
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const isActive = computed(() => route.path === props.path);
    return { isActive };
  },
  methods: {
    handleClick() {
      this.onClick();
    },
  },
};
</script>
