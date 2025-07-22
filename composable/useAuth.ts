export const useAuth = () => {
  const token = useCookie<string | null>('auth-token', {
    default: () => null,
    httpOnly: false,
    secure: true,
    sameSite: 'lax'
  })
  
  const isLoggedIn = computed(() => !!token.value)
  
  const login = (authToken: string) => {
    token.value = authToken
    if (process.client) {
      localStorage.setItem('token', authToken)
    }
  }
  
  const logout = async () => {
    token.value = null
    if (process.client) {
      localStorage.removeItem('token')
    }
    await navigateTo('/login')
  }
  
  const init = () => {
    if (process.client && !token.value) {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        token.value = savedToken
      }
    }
  }
  
  return {
    token: readonly(token),
    isLoggedIn,
    login,
    logout,
    init
  }
}