<template>
    <input type="text" class="w-full resize-none bg-transparent border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-1 focus:ring-blue-500" :placeholder="placeholder">
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: "Input sesuatu"
        }
    }
}
</script>