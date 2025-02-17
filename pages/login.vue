<template>
    <div class="flex flex-col min-h-[45vh] items-center justify-center fixed inset-0">
        <div class="w-full max-w-lg bg-white p-6 rounded-3xl shadow">
            <h1 class="text-4xl p-5 font-bold text-center text-[#3D3BF3] mb-8">Login</h1>
            
            <form @submit.prevent="handleLogin">
                <div class="mt-4">
                    <label for="">Email</label>
                    <BaseInput placeholder="Masukan Email Anda" type="email" id="email" v-model="email" required />
                </div>
                <div class="mt-4">
                    <label for="">Password</label>
                    <BaseInput placeholder="Masukan Password Anda" type="password" id="password" v-model="password" required />
                </div>
                <p class="mt-2">
                    <a href="/forgot-password" class="text-blue-500 hover:underline text-xs ">Lupa Password?</a>
                </p>
                <div class="text-xs text-center text-gray-600 mt-7">
                    <p>Belum punya akun? 
                        <a href="/register" class="text-blue-500 hover:underline">Daftar</a>
                    </p>
                </div>
                <div class="my-5 flex flex-col">
                    <BaseButtonPrimaryButton type="submit" buttonName="Login" class="text-lg" />
                </div>
            </form>

        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'; // Import Vue Router
import { useAuth } from "../stores/Auth";
// import { useToast } from "vue-toastification"

const { login } = useAuth(); // Import fungsi login dari auth.js
const router = useRouter(); // Inisialisasi router untuk navigasi

// State untuk email dan password
const email = ref("");
const password = ref("");

    // const toast = useToast();
    // toast.success("Hello world!");

definePageMeta({
    middleware: 'guest',
});

// Fungsi untuk menangani login
const handleLogin = async () => {
    if (!email.value || !password.value) {
        alert("Harap isi email dan password!");
        return;
    }

    try {
        const result = await login(email.value, password.value); // Panggil API login
        if (result.success) {
            alert("Login berhasil!");
            // Redirect ke halaman dashboard menggunakan router
            router.push('/'); // Menggunakan Vue Router untuk navigasi
        } else {
            alert("Login gagal: " + result.message);
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Terjadi kesalahan saat login.");
    }
};
</script>

<style scoped>
body {
    font-family: 'Inter', sans-serif;
}
</style> 
