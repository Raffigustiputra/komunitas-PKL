import { useCookie } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) return;
    if (import.meta.client) {
        const userData = useCookie('user').value;
        console.log(userData);
        if (userData.role === 'ADMIN')
            return;
        else return navigateTo('/');
    }
})
