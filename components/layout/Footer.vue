<template>
    <footer class="d-flex justify-content-center align-items-center py-4">
        <div>
            <NuxtImg src="/images/logo.png" loading="lazy" alt="logo" width="50" height="61" />
        </div>
        <p class="mb-0 pl-3">{{year}} Catálogo de Filmes</p>
    </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>

<style scoped>
footer{
    background: #00050d;    
}
footer p{
    color: #ffffff;
}
</style>