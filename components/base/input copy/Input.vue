<template>
    <input 
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full resize-none bg-transparent border border-gray-300 rounded-2xl p-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
        :placeholder="placeholder"
    />
</template>

<script>
export default {
    props: {
        modelValue: String,
        id: String,
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: 'Input sesuatu'
        }
    }
}
</script>
