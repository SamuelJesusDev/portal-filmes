<template>
<nav class="navbar navbar-expand-lg py-3">
    <a class="navbar-brand" href="#"><img src="~/assets/images/logo.png" alt="logo" class="w-75" style="max-height: 71px;"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <img src="" alt="icon">
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
            <li class="nav-item pl-md-3">
                <NuxtLink class="btn btn-purple px-lg-3" to="/" style="cursor: pointer;"> Início</NuxtLink>
            </li>
        
            <li class="nav-item">
                <NuxtLink class="nav-link" to="/">Filmes</NuxtLink>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>

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
</style>