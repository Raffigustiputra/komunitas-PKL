<template>
  <button
    class="flex py-1 px-3 gap-5 justify-center rounded-full hover:opacity-90 hover:cursor-pointer hover:placeholder-opacity-80 transition-all border border-[#3D3BF3] text-[#3D3BF3] font-medium" @click="handleClick"
  >
   {{ buttonName }}
  </button>
</template>

<script>
export default {
  props: {
        buttonName:{
        type: String,
        default: "Outlined"
    },
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
