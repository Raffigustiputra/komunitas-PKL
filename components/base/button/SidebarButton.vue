<template>
  <button
    class="flex bg-transparent items-center gap-5 p-3 rounded-full transition-all ease-in-out te"
    :class="[
      'hover:bg-[#ECECEC] dark:hover:bg-gray-700', 
      { 
        'text-[#3D3BF3] font-bold': isActive, 
        'dark:bg-slate-800': isActive,
        'dark:text-white': true,
        'dark:hover:text-white': isActive 
      }
    ]"
    :style="{ backgroundColor: isActive ? '#ECECEC' : '', color: isActive ? '#3D3BF3' : '' }"
    @click="handleClick"
  >
    <component :is="icon" class="w-6 h-6" />
    <span class="hidden sm:block">{{ buttonName }}</span>
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
