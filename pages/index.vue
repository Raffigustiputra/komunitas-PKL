<template>
    <title>Homepage / KomunitasApp</title>
    <div class="flex flex-col gap-5">
        <!-- Header -->


        <!-- Main Content -->
        <!-- <div class="flex-grow flex items-center justify-center">
            <h2 class="text-2xl font-bold text-[#133E87]">Ini Halaman Dashboard Komunitas</h2>
        </div>
        <div>
            <BasePrimaryButton />
            <BaseOutlinedButton />
            <BaseSecondaryButton />
            <BaseSidebarButton :icon="Homepage" />
            <BaseTertiaryButton />
            <BaseIconButton :icon="Image" />
        </div> -->

        <!-- Footer -->
             <AppTopbar />
             <AppFeedInput />   
             <AppFeed />
             <AppFeed />
             <AppFeed />
             <AppFeed />
    </div>
</template>


<script setup>
// import AppHeader from '../app/Header.vue';
// import AppFooter from '../app/Footer.vue';
import Image from '@/components/icons/Image.vue';
import Homepage from '@/components/icons/Homepage.vue';

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
