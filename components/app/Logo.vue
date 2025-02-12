<template>
    <h1 class="text-[20px] font-bold text-[#3D3BF3] hover:cursor-pointer" @click="handleClick" >KomunitasApp</h1>
</template>

<script>
export default {
    methods : {
        handleClick() {
            if(this.onClick) {
                this.onClick()
            }
        }
    }
}
</script>