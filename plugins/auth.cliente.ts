import { useAuthStore } from '~/store/auth'
export default defineNuxtPlugin(async () => {
  const { $pinia } = useNuxtApp()
  const auth = useAuthStore($pinia)
  
  await auth.init()
})