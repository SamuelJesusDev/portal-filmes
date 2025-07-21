import { useAuthStore } from '~/store/auth'
export default defineNuxtRouteMiddleware((to, from) =>{
    const auth = useAuthStore()
    auth.init()
    const protectedRoutes = ['/favoritos']
    
    if (!auth.isLoggedIn && protectedRoutes.includes(to.path)) {
        return navigateTo('/login')
    }
});