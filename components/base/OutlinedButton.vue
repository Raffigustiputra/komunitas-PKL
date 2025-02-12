<template>
  <button
    class="flex p-3 gap-5 justify-center rounded-full hover:opacity-90 hover:cursor-pointer transition-all border border-[#3D3BF3] text-[#3D3BF3] font-medium" @click="handleClick"
  >
   haii
  </button>
</template>

<script>
export default {
  methods: {
    handleClick() {
      if(this.onClick) {
        this.onClick();
      }
    }
  }
}
</script>
