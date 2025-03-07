<template>
  <button :class="buttonClass" class="text-xs hover:cursor-pointer py-1 px-2 rounded-3xl hover:opacity-90">
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
          return "bg-pink-500 text-white"; 
        case "Olahraga":
          return "bg-blue-500 text-white"; 
        case "Kuliner":
          return "bg-amber-500 text-white"; 
        case "Musik":
          return "bg-emerald-500 text-white";  
        case "Seni Lukis":
          return "bg-lime-500 text-white"; 
        case "Seni Tari":
          return "bg-indigo-500 text-white"; 

        default:
          return "bg-gray-300 text-black";
      }
    },
  },
};
</script>
