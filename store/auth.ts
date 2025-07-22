import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const tokenCookie = useCookie<string | null>('auth-token', {
    default: () => null,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
  
  const token = useState<string | null>('auth.token', () => tokenCookie.value)
  const isLoggedIn = computed(() => !!token.value)

  async function init() {
    if (process.client && !token.value) {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        token.value = savedToken
        tokenCookie.value = savedToken
      }
    }
  }

  function login(authToken: string) {
    token.value = authToken
    tokenCookie.value = authToken
    
    if (process.client) {
      localStorage.setItem('token', authToken)
    }
  }

  async function logout() {
    token.value = null
    tokenCookie.value = null
    const route = useRoute()
    const protectedRoutes = ['/favoritos']

    if (process.client) {
      localStorage.removeItem('token')
    }
    if (protectedRoutes.includes(route.path)) {
      await navigateTo('/login')
    }
  }

  return {
    token: readonly(token),
    isLoggedIn,
    init,
    login,
    logout
  }
})