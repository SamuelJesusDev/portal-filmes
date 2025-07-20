const usertoken = 'ZmlsbXNpdGUtdG9rZW4tMTIzNDU2';
export default defineNuxtRouteMiddleware((to, from) =>{
    if (process.client) {
        const tokenLogado = localStorage.getItem('token')
        const protectedRoutes = ['/favoritos']

        if (protectedRoutes.includes(to.path) && usertoken !== tokenLogado) {
        return navigateTo('/login')
        }
    }
});