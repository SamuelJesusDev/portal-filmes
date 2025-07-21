<template>
    <div class="d-flex flex-column flex-md-row img-movie"
        :style="{
          'background-image': 'url(\'https://image.tmdb.org/t/p/original' + response.backdrop_path + '\')',
          'background-size': 'cover',
          'background-position': 'center',
          'box-shadow': '100px -100px 100px 100px rgba(34, 60, 80, 0.96) inset'
        }">
        <NuxtImg
          :src="'https://image.tmdb.org/t/p/w500' + response.backdrop_path"
          width="auto"
          height="auto"
          format="webp"
          loading="lazy"
          alt="Capa do filme"
          class="d-md-none rounded pt-4"
        />
        <div class="col-lg-8 px-md-5 mx-md-5 mt-auto mb-5 ">
            <div class="d-flex flex-md-column justify-content-start align-items-start pt-3 pb-3 pb-md-0 star">
              <button @click="goBack" class="btn btn-secondary mr-3 px-4">
                <ClientOnly>
                  <FontAwesomeIcon icon="fas fa-long-arrow-alt-left" /> Voltar
                </ClientOnly>
              </button>
              <ClientOnly>
                <StarsVote :quantidade="response.vote_average" />
              </ClientOnly>
            </div>
            <h1 class="title" style="text-shadow: 2px 2px 4px black;">{{ response.title}}</h1>            
            <p class="description text-justify pb-2 mt-3">{{response.overview}}</p>
            <div class="d-flex flex-column flex-md-row type-movie align-items-md-center mb-2">
                <div class="d-flex align-items-center mb-2">
                  <p v-for="(genre, index) in response.genres" :key="genre.id" class="mb-0">
                      {{ genre.name }}<span v-if="index < response.genres.length - 1" class="mx-3"> | </span>
                  </p>
                </div>
                <div class="circle-favorite d-flex justify-content-center align-items-center ml-md-3 p-2" @click="handleAddFavorite(response)" v-if="!favoritosStore.isFavorite(Number(idMovie))">
                  <ClientOnly>
                    <FontAwesomeIcon icon="fa-solid fa-plus" /> <span class="ml-2">Adcionar aos favoritos</span> 
                  </ClientOnly>
                </div>
                <div class="circle-favorite d-flex justify-content-center align-items-center ml-md-3 p-2" @click="favoritosStore.removeFavorite(Number(idMovie))" v-else>
                  <ClientOnly>
                    <FontAwesomeIcon icon="fas fa-trash" /> <span class="ml-2">Remover dos favoritos</span> 
                  </ClientOnly>
                </div>                
            </div>
            <div class="d-flex flex-column flex-md-row align-items-center gap-3">
              <p class="names mb-0"><strong>Produtoras: </strong></p>
              <div class="d-flex justify-content-center row ml-md-3">
                <template v-for="(img, index) in response?.production_companies" :key="index">
                  <div
                    v-if="img?.logo_path"
                    class="col-auto d-flex justify-content-center align-items-center ml-2 mb-2"
                    style="background: #f2f5f9; border-radius: 8px; height: 41px"
                  >
                  <NuxtImg
                    :src="'https://image.tmdb.org/t/p/w500' + img.logo_path"
                    width="60"
                    height="39"
                    format="webp"
                    loading="lazy"
                    :alt="img.name"
                  />
                  </div>
                </template>
              </div>
            </div>
            <p class="names mb-0"><strong>Orçamento: </strong> {{ formatCurrency(response?.budget) }}</p>
            <p class="names mb-0"><strong>Duração: </strong> <span class="badge badge-dark" >{{response?.runtime}} min.</span><a v-if="response.homepage" :href="response.homepage" target="_blank"> Site oficial</a></p>
        </div>
    </div>
</template>

<script setup>
import { useFavoritosStore } from '~/store/favoritos'
const route = useRoute();
const idParams = computed(()=>route.params.id);
const idMovie = computed(() => idParams.value.split('-')[0] || '')
const favoritosStore = useFavoritosStore()
const config = useRuntimeConfig()
const {
  data: response,
  pending,
  error,
  refresh,
} = await useAsyncData(
  "film-info",
  async () => {
    const result = await $fetch(
      config.public.BASE_URL+"/3/movie/" + idMovie.value +"?language=pt-BR",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer "+ config.public.TMDB_TOKEN,
        },
      }
    );
    return result;
  },
);

watchEffect(() => {
  if (response.value) {
    useHead({
      title: response.value.title + ' (' + response.value.release_date.split('-')[0] + ')',
      meta: [
        { name: 'description', content: response.value.overview },
        { property: 'og:image', content: 'https://image.tmdb.org/t/p/w500' + response.value.poster_path },
      ],
    })
  }
})
function handleAddFavorite() {
  if (!response.value) return

  const movie = {
    id: response.value.id,
    title: response.value.title,
    poster_path: response.value.poster_path,
    original_language: response.value.original_language,
    release_date: response.value.release_date,
    vote_average: response.value.vote_average,
  }

  favoritosStore.addFavorite(movie)
}
async function addFavorite1() {
  try {
    const result = await $fetch(
      config.public.BASE_URL+'/3/account/'+favoritosStore.userToken+'/favorite',
      {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer '+ config.public.TMDB_TOKEN,
        },
        body: {
          media_type: 'movie',
          media_id: idMovie.value,
          favorite: true,
        },
      }
    )
    console.log('Adicionado aos favoritos:', result)
  } catch (e) {
    console.error('Erro ao adicionar favorito:', e)
  }
}
function formatCurrency(value) {
    if (!value) return 'Não informado'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }
const goBack = () => {
  window.history.back()
}
</script>

<style scoped>
h1{
  font-size: clamp(21px, 5vw, 38px);
  font-weight: 700;
  color: #FFFFFF;
}
h6{
    font-size: 14px;
    font-weight: 700;
    color: #37F1A3;
    text-shadow: 2px 2px 4px black;
}
.description{
    font-size: clamp(15px, 2,5vw,20px);
    font-weight: 500;
    color: #FFFFFF;
    text-shadow: 2px 2px 4px black;
}
.type-movie{
    font-size: 14px;
    font-weight: 700;
    color: #FFFFFF;
    text-shadow: 2px 2px 4px black;
}
.img-movie {
  position: relative;
  width: 100%;
  min-height: 85vh;
  overflow: hidden;
}

.img-movie::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: var(--bg-image);
  background-size: cover;
  background-position: center;
  box-shadow: 100px -100px 100px 100px rgba(34, 60, 80, 0.96) inset;
  z-index: 0;
}
.img-movie * {
  position: relative;
  z-index: 1;
}
.names{
    font-size: 16px;
    font-weight: 700;
    color: #FFFFFF;
    text-shadow: 2px 2px 4px black;
}
.names strong{
    font-size: 20px;
}
.circle-favorite{
    cursor: pointer;
    border-radius: 8px;
    background: #ffffff33;
    font-size: 25px;
}
.circle-favorite span{
  font-size: 15px;
  text-shadow: none
}
.circle-favorite:hover{
    background: #ffffff;
    color: #000000;
}
.badge-dark{
  background: #000
}
</style>