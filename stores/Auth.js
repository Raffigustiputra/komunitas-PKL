import { useCookie } from "nuxt/app";

export const useAuth = () => {
    const userData = useCookie("user");
    const userToken = useCookie("token");
    async function login(email, password) {
        try {
            const response = await fetch(
                "http://192.168.19.251:8000/api/users/login/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Login gagal.");
            }

            const data = await response.json();
            console.log(data);
            const user = await profile(data.token);
            userData.value = user;
            userToken.value = data.token;

            console.log(user);

            return { success: true, message: "Login berhasil." };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async function register(username, email, password) {
        try {
            const response = await fetch(
                "http://192.168.19.251:8000/api/users/register/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, email, password }),
                }
            );

            const data = await response.json(); // Parsing response dulu

            console.log("Response API Register:", data); // Debugging response

            if (!response.ok) {
                throw new Error(data.message || "Registrasi gagal.");
            }

            // Simpan token ke dalam useCookie
            userToken.value = data.token;

            // Ambil data profil setelah registrasi
            const user = await profile(data.token);
            userData.value = user;

            return { success: true, message: "Registrasi berhasil." };
        } catch (error) {
            console.error("Error saat registrasi:", error);
            return { success: false, message: error.message };
        }
    }

    async function profile(token) {
        try {
            const response = await fetch(
                "http://192.168.19.251:8000/api/users/profile/",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${useAuth().userToken.value}`,
                    },
                }
            );
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Profile gagal diambil.");
            }
            const user = await response.json();
            return user;
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async function updateProfile(updatedData) {
        try {
            if (!userToken.value || !userData.value?.id) {
                throw new Error("Token atau ID pengguna tidak ditemukan.");
            }

            const response = await fetch(
                `http://192.168.19.251:8000/api/users/detail/${userData.value.id}/`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${userToken.value}`,
                    },
                    body: JSON.stringify(updatedData),
                }
            );

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData?.message || "Gagal memperbarui profil.");
            }

            // Perbarui data user setelah update berhasil
            userData.value = responseData;

            return { success: true, message: "Profil berhasil diperbarui." };
        } catch (error) {
            console.error("Error updating profile:", error);
            return { success: false, message: error.message };
        }
    }

    // Fungsi untuk Logout
    async function logout() {
        try {
            if (!userToken.value) {
                throw new Error(
                    "userToken.value tidak ditemukan. Anda perlu login terlebih dahulu."
                );
            }

            const response = await fetch(
                "http://192.168.19.251:8000/api/users/logout/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${userToken.value}`, // Kirim userToken.value dalam header Authorization
                    },
                }
            );
            console.log(response);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Logout gagal.");
            }

            // Hapus userToken.value setelah logout berhasil
            userToken.value = null;
            userData.value = null;
            return navigateTo("/login");
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    // Fungsi untuk memverifikasi atau memperbarui token
    async function verifyToken() {
        try {
            const token = userToken.value;

            if (!token) {
                throw new Error("Token tidak ditemukan.");
            }

            const response = await fetch(
                "http://192.168.19.251:8000/api/users/token/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Kirim token dalam header Authorization
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Token tidak valid.");
            }

            const data = await response.json();
            // Jika perlu, Anda bisa menyimpan ulang token atau data yang relevan
            return { success: true, message: "Token valid." };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    return {
        login,
        register,
        logout,
        verifyToken,
        profile,
        updateProfile,
        userData,
        userToken,
    };
};
