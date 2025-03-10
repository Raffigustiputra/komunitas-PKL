import { defineStore } from "pinia";
import { ref, onMounted } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDarkMode = ref(false);

  const applyDarkMode = (dark) => {
    if (typeof window !== "undefined" && document?.documentElement) {
      document.documentElement.classList.toggle("dark", dark);
    }
  };

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
    }
    applyDarkMode(isDarkMode.value);
  };

  onMounted(() => {
    if (typeof window !== "undefined") {
      isDarkMode.value = localStorage.getItem("theme") === "dark";
      applyDarkMode(isDarkMode.value);
    }
  });

  return { isDarkMode, toggleDarkMode };
});
