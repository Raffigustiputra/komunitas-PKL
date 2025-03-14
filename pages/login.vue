<template>
    <div class="flex flex-col items-center justify-center fixed inset-0">
        <div class="w-full max-w-lg bg-white p-20 rounded-3xl shadow dark:bg-[#1A1625] dark:text-white">
            <h1 class="text-4xl p-5 font-bold text-center text-[#3D3BF3] mb-8">Sign In Here</h1>

            <form @submit.prevent="handleLogin">
                <div class="mt-4">
                    <BaseInput placeholder="Masukkan Email atau Username" type="text" id="identifier" v-model="identifier" />
                </div>
                <div class="mt-4 relative">
                    <BaseInput 
                        :type="showPassword ? 'text' : 'password'"
                        placeholder="Masukkan Password Anda"
                        id="password"
                        v-model="password"
                        class="pr-10"
                    />
                    <button 
                        type="button"
                        @click="showPassword = !showPassword"
                        class="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                        <Eye v-if="!showPassword" class="w-5 h-5" />
                        <EyeOff v-else class="w-5 h-5" />
                    </button>
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
import { Eye, EyeOff } from "lucide-vue-next"; 

const { login } = useAuth();
const router = useRouter();

const identifier = ref(""); // Bisa berupa username atau email
const password = ref("");
const showPassword = ref(false);

const alertVisible = ref(false);
const alertMessage = ref("");
const alertColor = ref(""); 

definePageMeta({
    middleware: 'guest',
    layout: "base",
});

const handleLogin = async () => {
    if (!identifier.value || !password.value) {
        showAlert("Harap isi email atau username dan password!", "error");
        return;
    }

    try {
        const result = await login(identifier.value, password.value);

        if (result.success) {
            showAlert("Login berhasil!", "success"); 
            setTimeout(() => router.push('/homepage'), 1000); 
        } else {
            // Menentukan jenis error berdasarkan respon server
            if (result.error_code === "WRONG_PASSWORD") {
                showAlert("Password salah, silakan coba lagi", "error");
                password.value = ""; // Reset password field
            } else if (result.error_code === "USER_NOT_FOUND") {
                showAlert("Email atau username salah, silakan coba lagi", "error");
            } else {
                showAlert("Email atau username atau password salah, silakan coba lagi", "error");
                password.value = ""; // Reset password field
            }
        }
    } catch (error) {
        console.error("Error during login:", error);
        showAlert("Terjadi kesalahan saat login.", "error");
        password.value = ""; // Reset password field in case of error
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
