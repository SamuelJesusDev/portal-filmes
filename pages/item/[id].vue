<template>
    <div class="d-flex flex-column flex-md-row img-movie"   
        :style="{
            'background-image': 'url(\'https://image.tmdb.org/t/p/original' + response.backdrop_path + '\')',
            'background-size': 'cover',
            'background-position': 'center',
            'box-shadow': '100px -100px 100px 100px rgba(34, 60, 80, 0.96) inset'
        }">
        <div class="col-lg-8 px-5 mx-5 mt-auto mb-5">
            <h1 style="text-shadow: 2px 2px 4px black;">{{ response.title}}</h1>
            <StarsVote :quantidade="response.vote_average" />            
            <p class="description pb-2 mt-3">{{response.overview}}</p>
            <div class="d-flex type-movie align-items-center mb-2">
                <p v-for="(genre, index) in response.genres" :key="genre.id" class="mb-0">
                    {{ genre.name }}<span v-if="index < response.genres.length - 1" class="mx-3"> | </span>
                </p>
                <div class="circle-favorite d-flex justify-content-center align-items-center ml-3" @click="addFavorite">
                    <FontAwesomeIcon icon="fa-solid fa-plus" />
                </div>
            </div>            
            <div class="d-flex align-items-center gap-3">
              <p class="names mb-0"><strong>Produtoras: </strong></p>
              <template v-for="(img, index) in response?.production_companies" :key="index">
                <div
                  v-if="img?.logo_path"
                  class="col-auto d-flex justify-content-center align-items-center ml-2"
                  style="background: #f2f5f9; border-radius: 8px; height: 41px"
                >
                  <img
                    :src="'https://image.tmdb.org/t/p/w500' + img.logo_path"
                    :alt="img.name"
                    style="max-width: 60px; max-height: 39px;"
                    class="img-fluid"
                  />
                </div>
              </template>
            </div>
            <p class="names mb-0"><strong>Orçamento: </strong> {{ formatCurrency(response?.budget) }}</p>
            <p class="names mb-0"><strong>Duração: </strong> <span class="badge badge-dark" >{{response?.runtime}} min.</span><a v-if="response.homepage" :href="response.homepage" target="_blank"> Site oficial</a></p>
        </div>
    </div>
</template>

<script setup>
const route = useRoute();
const idParams = computed(()=>route.params.id);
const idMovie = computed(() => idParams.value.split('-')[0] || '')

const {
  data: response,
  pending,
  error,
  refresh,
} = await useAsyncData(
  "film-info",
  async () => {
    const result = await $fetch(
      "https://api.themoviedb.org/3/movie/" + idMovie.value +"?language=pt-BR",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer tokenlogin",
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

async function addFavorite() {
  try {
    const result = await $fetch(
      'https://api.themoviedb.org/3/account/userid/favorite',
      {
        method: 'POST',
        headers: {
          Authorization:
            'Bearer tokenlogin',
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
    text-shadow: 2px 2px 4px black;
}
.description{
    font-size: 20px;
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
    border-radius: 100%;
    background: #ffffff33;
    width: 50px;
    height: 50px;
    font-size: 30px;
}
.circle-favorite:hover{
    background: #ffffff;
    color: #000000;
}
.badge-dark{
  background: #000
}
</style>