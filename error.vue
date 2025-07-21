<template>
    <div class="main d-flex flex-column justify-content-center align-items-center">
        <h1>Opsss!</h1>
            <h1>{{ error.statusCode }}</h1>
        <img src="~/assets/images/error.png" class="w-25 mb-3" alt="opss">
        <button><NuxtLink class="nav-link" to="/">Voltar para o início</NuxtLink></button>
    </div>
</template>

<script setup>
const error = useError();
</script>

<style scoped>
.main{
    color: #ffffff;
    height: 100vh;
}
button a{
    cursor: pointer;
    border-radius: 8px;
    background: #ffffff;
    color: #000000;
}
button:hover a{
    opacity: 0.8;
    color: #000000;
}
</style>