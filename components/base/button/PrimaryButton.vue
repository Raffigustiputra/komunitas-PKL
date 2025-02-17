<template>
  <button
    class="flex p-3 gap-5 justify-center rounded-full hover:opacity-90 hover:cursor-pointer transition-all bg-[#3D3BF3] text-white font-medium" @click="handleClick"
  >
    <component :is="icon" class="w-6 h-6" />
    {{ buttonName }}
  </button>
</template>

<script>
export default {
    props: {
        buttonName:{
            type: String,
            default: "Primary"
        },
        icon: {
          type: Object,
          required: true,
    }
    },
  methods: {
    handleClick() {
      if(this.onClick) {
        this.onClick();
      }
    }
  }
}
</script>
