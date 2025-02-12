<!-- <template>
    <button 
        @click="goToDetail(komunitasId)"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
        Edit
    </button>
</template>

<script>
import { useRouter } from "vue-router";

export default {
    props: {
        komunitasId: {
            type: [String, Number],
            required: true,
        },
    },
    setup(props) {
        const router = useRouter();

        // Fungsi navigasi ke halaman detail komunitas
        const goToDetail = (komunitasId) => {
            // Pastikan menggunakan 'komunitasId' sebagai parameter rute
            router.push({ name: "communitydetail", params: { komunitasId } });
        };

        return {
            goToDetail,
        };
    },
};
</script> -->

<template></template>
