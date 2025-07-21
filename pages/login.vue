<template>
  <div class="login-card col-12 col-md-5 mx-auto d-flex flex-column justify-content-center align-items-center">
    <Loading
      :isActive="isLoading"
      loadingMessage="Carregando, por favor aguarde..."
    />
    <div class="card w-100 py-5"> 
      <div class="card-body py-5">
        <h2>Acesse sua conta</h2>
        <div class="alert alert-danger w-100 text-center mb-1 py-1" role="alert" v-if="!isValid">
            Usuário ou senha inválidos!
        </div>
        <div class="w-100">
          <div class="mb-3">
            <label for="user" class="form-label">Usuário</label>
            <input type="text" v-model="username" class="form-control" id="user" placeholder="usuário" required />
          </div>
          <div class="mb-3">
            <label for="senha" class="form-label">Senha</label>
            <input type="password" v-model="password" class="form-control" id="senha" placeholder="Digite sua senha" required />
          </div>
          <button type="submit" class="btn btn-dark w-100 py-2"  @click="handleLogin">Entrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/store/auth'
useHead({
  title: 'Login',
  meta: [
    { name: 'description', content: 'Acesse sua conta para salvar seus filmes favoritos e ver recomendações personalizadas.' },
    { name: 'robots', content: 'noindex, nofollow' },
  ]
})
const username = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()
const isValid = ref(true)
const isLoading = ref(false)

function handleLogin() {
  isLoading.value = true
  if (username.value === 'admin' && password.value === '123') {
    const loginToken = 'ZmlsbXNpdGUtdG9rZW4tMTIzNDU2'
    isValid.value = true
    isLoading.value = false
    auth.login(loginToken)
    router.push('/')
  } else {
    isValid.value = false
    isLoading.value = false
  }
}
</script>

<style scoped>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .login-card {
      width: 100%;
      border-radius: 8px;
     height: 83vh;
     max-width: 525px;
    }
    .login-card h2 {
      margin-bottom: 1.5rem;
      text-align: center;
      font-weight: 700;
    }
    .btn-dark{
        cursor: pointer;
        font-size: 18px;
        border-radius: 8px;
    }
    .btn-dark:hover{
        opacity: 0.8;
    }
</style>