import { useCookie } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) return;
    if (import.meta.client) {
        const token = useCookie('token');
        console.log(token);
        if (token.value)

            return navigateTo('/');
        
    }
})
