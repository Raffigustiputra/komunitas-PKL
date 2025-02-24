<template>
    <div class="flex flex-col min-h-[45vh] items-center justify-center fixed inset-0">
        <div class="w-full max-w-lg bg-white p-20 rounded-3xl shadow">
            <h1 class="text-4xl p-5 font-bold text-center text-[#3D3BF3] mb-8">Sign In Here</h1>

            <form @submit.prevent="handleLogin">
                <div class="mt-4">
                    <BaseInput placeholder="Masukan Email Anda" type="email" id="email" v-model="email"  />
                </div>
                <div class="mt-4">
                    <BaseInput placeholder="Masukan Password Anda" type="password" id="password" v-model="password"  />
                </div>
                <p class="mt-2">
                    <a href="/forgot-password" class="text-blue-500 hover:underline text-xs">Lupa Password?</a>
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
    <BaseAlertPrimaryAlert
        v-if="alertVisible"
        :message="alertMessage"
        :type="alertColor"
    />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useAuth } from "../stores/Auth";
import { BaseAlertSignIn } from "#components";

const { login } = useAuth();
const router = useRouter();

const email = ref("");
const password = ref("");


const alertVisible = ref(false);
const alertMessage = ref("");
const alertColor = ref(""); 

definePageMeta({
    middleware: 'guest',
    layout: "base",
});

const handleLogin = async () => {
    if (!email.value || !password.value) {
        showAlert("Harap isi email dan password!", "error");
        return;
    }

    try {
        const result = await login(email.value, password.value);
        if (result.success) {
            showAlert("Login berhasil!", "success"); 
            setTimeout(() => router.push('/homepage'), 1000); 
        } else {
            showAlert(result.message, "error");
        }
    } catch (error) {
        console.error("Error during login:", error);
        showAlert("Terjadi kesalahan saat login.", "error");
    }
};

const showAlert = (message, type) => {
    alertMessage.value = message;
    alertColor.value = type;
    alertVisible.value = true;

    setTimeout(() => {
        alertVisible.value = false;
    }, 5000);
};
</script>

<style scoped>
body {
    font-family: 'Inter', sans-serif;
}
</style>
