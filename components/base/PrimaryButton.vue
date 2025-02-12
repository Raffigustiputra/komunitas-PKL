<template>
  <button
    class="flex p-3 gap-5 justify-center rounded-full hover:opacity-90 hover:cursor-pointer transition-all bg-[#3D3BF3] text-white font-medium" @click="handleClick"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>

    {{ buttonName }}
  </button>
</template>

<script>
export default {
    props: {
        buttonName:{
            type: String,
            default: "Primary"
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
