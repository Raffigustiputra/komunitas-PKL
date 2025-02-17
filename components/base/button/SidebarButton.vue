<template>
  <button
    class="flex bg-transparent items-center gap-5 p-3 rounded-full hover:bg-[#ECECEC] transition-all ease-in-out dark:text-white dark:hover:bg-slate-800"
    :class="{ 'text-[#3D3BF3] font-bold': isActive, 'dark:bg-slate-800': isActive }"
    :style="{ backgroundColor: isActive ? '#ECECEC' : '' }"
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
