<template>
    <div class="d-flex flex-column flex-md-row img-movie">
        <div class="col-md-6 px-5 mx-5 mt-auto mb-5">
            <img src="~/assets/images/logo.png" alt="logo" class="" style="max-height: 71px;">
            <h1>Homem de Aço</h1>
            <h6 class="py-3">Indicado ao BAFTA CHILDREN'S AWARD®</h6>
            <p class="description pb-2">Um menino descobre ter poderes extraordinários e não ser desta Terra. Ele viaja para descobrir de onde veio e para o que foi enviado. Porém, seu herói interior deve emergir se ele quiser salvar o mundo e se tornar o símbolo de esperança para toda a humanidade. Com grande elenco, o Homem de Aço oferece um novo super-homem: alienado, incompreendido, mas para sempre um farol de esperança.</p>
            <div class="d-flex type-movie">
                <p>Ação </p>
                <p> | Aventura </p>
                <p> | Ambicioso </p>
                <p> | Emocionante </p>
            </div>
            <p class="names mb-0"><strong>Diretor: </strong> Dean DeBlois</p>
            <p class="names mb-0"><strong>Elenco: </strong> Mason Thames, Nico Parker, Gerard Butler, Nick Frost, Gabriel Howell, Julian Dennison, Bronwyn James, Harry Trevaldwyn, Murray McArthur, Peter Serafinowicz</p>
            <p class="names mb-0"><strong>Produtor: </strong></p>
            
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
h1{
    font-size: 38px;
    font-weight: 700;
    color: #FFFFFF;
}
h6{
    font-size: 14px;
    font-weight: 700;
    color: #37F1A3;
}
.description{
    font-size: 20px;
    font-weight: 500;
    color: #FFFFFF;
}
.type-movie{
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;
}
.img-movie{
  position: relative;
  width: 100%;
  height: 85vh;
  overflow: hidden;
}
.img-movie::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('~/assets/images/foto.jpg');
  background-size: cover;
  background-position: inherit;
-webkit-box-shadow: 100px -100px 100px 100px rgba(34, 60, 80, 0.96) inset;
-moz-box-shadow: 100px -100px 100px 100px rgba(34, 60, 80, 0.96) inset;
box-shadow: 100px -100px 100px 100px rgba(34, 60, 80, 0.96) inset;
}
.img-movie * {
  position: relative;
  z-index: 1;
}
.names{
    font-size: 16px;
    font-weight: 700;
    color: #FFFFFF;
}
.names strong{
    font-size: 20px;
}
</style>