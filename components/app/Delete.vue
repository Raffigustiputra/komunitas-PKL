<template>
    <button @click="handleDelete" class="text-red-500 hover:text-red-700">
        Delete
    </button>
</template>

<script setup>
// import { defineProps, emit } from "vue";
import { useKomunitas } from "../../stores/Komunitas";

const props = defineProps({
    komunitasId: {
        type: Number,
        required: true,
    },
});

// Mengakses store untuk fungsi penghapusan
const komunitasStore = useKomunitas();

// Menangani klik tombol hapus
const handleDelete = async () => {
    try {
        // Panggil fungsi removeKomunitas dengan ID komunitas
        const isDeleted = await komunitasStore.removeKomunitas(props.komunitasId);
        if (isDeleted) {
            // Emit event deleted jika sukses
            emit("deleted", props.komunitasId);
        }
    } catch (error) {
        console.error("Error deleting community:", error);
    }
};
</script>