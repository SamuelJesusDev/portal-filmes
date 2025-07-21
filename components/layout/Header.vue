<template>
<nav class="navbar navbar-expand-lg py-3">
    <div class="container">
        <a class="navbar-brand" href="#"><NuxtImg src="/images/logo.png"  loading="lazy" alt="logo" width="50" height="61" /></a>
        <div  style="flex-grow: 1;">
            <ul class="navbar-nav d-flex align-items-center">
                <li class="nav-item pl-md-3 ml-2" @click="show = false;">
                    <NuxtLink class="btn btn-purple px-lg-3" to="/" style="cursor: pointer;"> Início</NuxtLink>
                </li>
                <client-only>
                <li class="nav-item ml-2" @click="show = false;" v-if="authStore.isLoggedIn">
                    <NuxtLink class="nav-link" to="/favoritos">Favoritos</NuxtLink>
                </li>                 
                <li class="nav-item login ml-auto" v-if="authStore.isLoggedIn" @click="authStore.logout()">
                <a class="nav-link px-2"> Sair <FontAwesomeIcon icon="fas fa-sign-out-alt" /> </a>
                </li>                
                <li class="nav-item login ml-auto" v-else @click="show = false;">
                    <NuxtLink class="nav-link px-2" to="/login" style="font-size: 13px;">Login <FontAwesomeIcon icon="fas fa-user" /></NuxtLink>
                </li>
                </client-only>
            </ul>
        </div>
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
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(33, 33, 33, 0.5);

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
    /* background: #ffffff; */
    border: solid 2px #ffffff;
    color: #ffffff;
}
.login:hover a{
    opacity: 0.8;
    color: #000000;
}
nav ul li a.router-link-active {
  color: #00050d;
  background: #ffffff;
  border-radius: 8px;
}
.navbar-nav{
    flex-direction: row;
}
</style>