import { useCookie } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) return;
    if (import.meta.client) {


        const token = useCookie('token');
        if (token.value)
            return;
        else return navigateTo('/login');
    }

})
