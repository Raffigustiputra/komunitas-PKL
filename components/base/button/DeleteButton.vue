<template>
  <button
    class="flex p-3 gap-5 justify-center rounded-full hover:opacity-90 hover:cursor-pointer transition-all border border-red-500 text-red-500 font-medium" @click="handleClick"
  >
   Delete
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
