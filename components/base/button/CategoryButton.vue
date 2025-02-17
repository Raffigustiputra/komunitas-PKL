<template>
  <button
    :class="buttonClass"
    class="text-xs hover:cursor-pointer py-1 px-2 rounded-3xl hover:opacity-90"
  >
    {{ buttonName }}
  </button>
</template>

<script>
export default {
  props: {
    buttonName: {
      type: String,
      default: "category",
    },
  },
  computed: {
    buttonClass() {
      switch (this.buttonName) {
        case "Hiburan":
          return "bg-pink-400 text-white";
        case "Olahraga":
          return "bg-blue-400 text-white";
        case "Kuliner":
          return "bg-orange-400 text-white";
        default:
          return "bg-gray-300 text-black";
      }
    },
  },
};
</script>

