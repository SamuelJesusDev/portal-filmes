import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const isLoggedIn = ref(false)
  const router = useRouter()
  const route = useRoute()

  function init() {
    if (process.client) {
      const savedToken = localStorage.getItem('token')
      if (savedToken) {
        token.value = savedToken
        isLoggedIn.value = true
      }
    }
  }

  function login(fakeToken: string) {
    token.value = fakeToken
    isLoggedIn.value = true
    if (process.client) {
      localStorage.setItem('token', fakeToken)
    }
  }

  async function logout() {
    token.value = null
    isLoggedIn.value = false
    if (process.client) {
      localStorage.removeItem('token')
    }
  }

  return {
    token,
    isLoggedIn,
    init,
    login,
    logout
  }
})
