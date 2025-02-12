<template>
    <div class="flex flex-col min-h-screen">
        <!-- Header -->


        <!-- Main Content -->
        <div class="flex-grow flex items-center justify-center">
            <h2 class="text-2xl font-bold text-[#133E87]">Ini Halaman Dashboard Komunitas</h2>
        </div>

        <!-- Footer -->
        
    </div>
</template>

<script setup>
// import AppHeader from '../app/Header.vue';
// import AppFooter from '../app/Footer.vue';

const router = useRouter();

// Fungsi navigasi untuk Nuxt
function navigateTo(path) {
    router.push(path);
}

definePageMeta({
    middleware: 'auth',
});
</script>

<style scoped>
/* Anda dapat menambahkan gaya khusus di sini jika diperlukan */
</style>
