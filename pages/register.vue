<template>
    <div class="flex flex-col min-h-[45vh] items-center justify-center fixed inset-0">
        <div class="w-full max-w-lg bg-white p-20 rounded-3xl shadow">
            <h1 class="text-4xl p-5 font-bold text-center text-[#3D3BF3] mb-8">Sign Up Here</h1>

            <form @submit.prevent="handleSignup">
                <div class="mt-4">
                    <BaseInput placeholder="Masukan Username Anda" type="text" id="name" v-model="name" />
                </div>
                <div class="mt-4">
                    <BaseInput placeholder="Masukan Email Anda" type="email" id="email" v-model="email" />
                </div>
                <div class="mt-4 relative">
                    <BaseInput 
                        :type="showPassword ? 'text' : 'password'" 
                        placeholder="Masukan Password Anda" 
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
                <div class="mt-4 relative">
                    <BaseInput 
                        :type="showConfirmPassword ? 'text' : 'password'" 
                        placeholder="Konfirmasi Password Anda" 
                        id="confirm-password" 
                        v-model="confirmPassword"
                        class="pr-10"
                    />
                    <button 
                        type="button"
                        @click="showConfirmPassword = !showConfirmPassword"
                        class="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                        <Eye v-if="!showConfirmPassword" class="w-5 h-5" />
                        <EyeOff v-else class="w-5 h-5" />
                    </button>
                </div>
                <div class="text-xs text-center text-gray-600 mt-7">
                    <p>Sudah punya akun?
                        <a href="/login" class="text-blue-500 hover:underline">Login</a>
                    </p>
                </div>
                <div class="my-5 flex flex-col">
                    <BaseButtonPrimaryButton type="submit" buttonName="Sign Up" class="text-lg" />
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
import { Eye, EyeOff } from "lucide-vue-next"; // Import ikon mata

const { register } = useAuth();
const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const alertVisible = ref(false);
const alertMessage = ref("");
const alertColor = ref(""); 

definePageMeta({
    middleware: 'guest',
    layout: "base",
});

const handleSignup = async () => {
    if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        showAlert("Harap isi semua field!", "error");
        return;
    }

    if (password.value !== confirmPassword.value) {
        showAlert("Password dan Konfirmasi Password tidak cocok!", "error");
        return;
    }

    console.log("Mengirim data:", {
        username: name.value,
        email: email.value,
        password: password.value
    });

    try {
        const result = await register(name.value, email.value, password.value);
        console.log("Hasil Register:", result); // Debugging output

        if (result.success) {
            showAlert("Pendaftaran berhasil!", "success");
            setTimeout(() => router.push('/homepage'), 1000);
        } else {
            showAlert(result.message, "error");
        }
    } catch (error) {
        console.error("Error during signup:", error);
        showAlert("Terjadi kesalahan saat mendaftar.", "error");
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
