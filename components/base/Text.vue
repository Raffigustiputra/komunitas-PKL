<template>
    <p :class="textClasses">
        {{ text }}
    </p>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: "Lorem"
        },
        fontSize: {
            type: String,
            default: "text-base" 
        },
        textColor: {
            type: String,
            default: "text-black"
        },
        fontFamily: {
            type: String,
            default: "font-instrumental-sans" 
        }
    },
    computed: {
        textClasses() {
            return `${this.fontSize} ${this.textColor} ${this.fontFamily}`;
        }
    }
}
</script>
