<template>
    <div class="d-flex flex-column flex-md-row img-movie"   
        :style="{
            'background-image': 'url(\'https://image.tmdb.org/t/p/original' + response.backdrop_path + '\')',
            'background-size': 'cover',
            'background-position': 'center',
            'box-shadow': '100px -100px 100px 100px rgba(34, 60, 80, 0.96) inset'
        }">
        <div class="col-md-6 px-5 mx-5 mt-auto mb-5">
            <!-- <img src="~/assets/images/logo.png" alt="logo" class="" style="max-height: 71px;"> -->
            <h1 style="text-shadow: 2px 2px 4px black;">{{ response.title}}</h1>
            <StarsVote :quantidade="response.vote_average" />
            <h6 class="py-3">Indicado ao BAFTA CHILDREN'S AWARD®</h6>
            <p class="description pb-2">{{response.overview}}</p>
            <div class="d-flex type-movie">
                <p v-for="(genre, index) in response.genres" :key="genre.id">
                    {{ genre.name }}<span v-if="index < response.genres.length - 1" class="mx-3"> | </span>
                </p>
            </div>
            
            <p class="names mb-0"><strong>Diretor: </strong> Dean DeBlois</p>
            <p class="names mb-0"><strong>Elenco: </strong> Mason Thames, Nico Parker, Gerard Butler, Nick Frost, Gabriel Howell, Julian Dennison, Bronwyn James, Harry Trevaldwyn, Murray McArthur, Peter Serafinowicz</p>
            <p class="names mb-0"><strong>Produtor: </strong></p>
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
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2ZmMDQ5MDMyMzk5ZGU0MGQwYjNlNjMyMTJlYjIzMCIsIm5iZiI6MTc1MjkyNDIyOC40NTIsInN1YiI6IjY4N2I4MDQ0MTczM2RhMzhkMjUyODY2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yFmP9mray8n8eEixPNsMYcsTaFde_wHaZYlSHK9Rmj8",
        },
      }
    );
    return result;
  },
);
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
  height: 85vh;
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
</style>