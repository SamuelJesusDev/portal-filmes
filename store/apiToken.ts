import { defineStore } from 'pinia'

export const useApiTokenStore = defineStore('apiToken', () => {
  const token = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2ZmMDQ5MDMyMzk5ZGU0MGQwYjNlNjMyMTJlYjIzMCIsIm5iZiI6MTc1MjkyNDIyOC40NTIsInN1YiI6IjY2N2I4MDQ0MTczM2RhMzhkMjUyODY2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yFmP9mray8n8eEixPNsMYcsTaFde_wHaZYlSHK9Rmj8')

  return {
    token
  }
}, {
  persist: true
})