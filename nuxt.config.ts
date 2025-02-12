// nuxt.config.js
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['public/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: '2025-01-15',
  modules: ['@pinia/nuxt'],

  // Menambahkan konfigurasi untuk routing dinamis dan optimalisasi
  // pages: true,  // Mengaktifkan routing otomatis berdasarkan struktur folder pages

  build: {
    transpile: ['@vueuse/core'], // Contoh jika ingin menambahkan transpile tertentu jika diperlukan
  },

  // Jika ada konfigurasi lain yang ingin ditambahkan sesuai kebutuhan proyek
})
