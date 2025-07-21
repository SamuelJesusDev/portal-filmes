export default defineNuxtRouteMiddleware((to, from) => {
  const protectedRoutes = ['/favoritos']
  const authRoutes = ['/login']
  
  const token = useCookie<string | null>('auth-token')
  if (process.client && !token.value) {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      token.value = localToken
    }
  }  
  const isLoggedIn = !!token.value  
  if (isLoggedIn && authRoutes.includes(to.path)) {
    return navigateTo('/')
  }
  if (!isLoggedIn && protectedRoutes.includes(to.path)) {
    return navigateTo('/login')
  }
});