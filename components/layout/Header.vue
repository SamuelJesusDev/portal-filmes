<template>
<nav class="navbar navbar-expand-lg py-3">
    <a class="navbar-brand" href="#"><img src="~/assets/images/logo.png" alt="logo" class="w-75" style="max-height: 71px;"></a>
    <button @click="show = !show;" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <img src="" alt="icon">
    </button>

    <div class="collapse navbar-collapse" :class="{'show': show}" id="navbarSupportedContent">
        <ul class="navbar-nav">
            <li class="nav-item pl-md-3" @click="show = false;">
                <NuxtLink class="btn btn-purple px-lg-3" to="/" style="cursor: pointer;"> Início</NuxtLink>
            </li>
            <li class="nav-item" @click="show = false;" v-if="authStore.isLoggedIn">
                <NuxtLink class="nav-link" to="/favoritos">Favoritos</NuxtLink>
            </li> 
            <li class="nav-item login" v-if="authStore.isLoggedIn" @click="authStore.logout()">
              <a class="nav-link"> Sair </a>
            </li>
            <li class="nav-item login" v-else @click="show = false;">
                <NuxtLink class="nav-link" to="/login">Login</NuxtLink>
            </li>
        </ul>
    </div>
</nav>
</template>

<script setup>
import { useAuthStore } from '~/store/auth'
import { ref, onMounted } from 'vue'
const show = ref(false)
const token = ref(null)
const authStore  = useAuthStore()

onMounted(() => {
  token.value = localStorage.getItem('token')
})
</script>

<style scoped>
nav{
    background-color: #00050d;
}
nav ul li a{
    color: #ffffff;
}
nav ul li a:hover{
    color: #00050d;
    background: #ffffff;
    border-radius: 8px;
}
.login a{
    cursor: pointer;
    border-radius: 8px;
    background: #ffffff;
    color: #000000;
}
.login:hover a{
    opacity: 0.8;
    color: #000000;
}
</style>