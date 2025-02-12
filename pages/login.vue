<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
            <h1 class="text-xl font-bold text-center text-gray-800 mb-4">Login</h1>
            
            <!-- Form Login -->
            <form @submit.prevent="handleLogin">
                <div class="mb-3">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        v-model="email" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-sm"
                        placeholder="Email Anda" 
                        required
                    />
                </div>
                
                <div class="mb-3">
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        v-model="password" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-sm"
                        placeholder="Password Anda" 
                        required
                    />
                </div>
                
                <div class="mb-4">
                    <button 
                        type="submit" 
                        class="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 text-sm">
                        Login
                    </button>
                </div>
            </form>

            <!-- Link Lupa Password atau Daftar -->
            <div class="text-xs text-center text-gray-600">
                <p>Belum punya akun? 
                    <a href="/register" class="text-blue-500 hover:underline">Daftar</a>
                </p>
                <p class="mt-2">
                    <a href="/forgot-password" class="text-blue-500 hover:underline">Lupa Password?</a>
                </p>
            </div>
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
