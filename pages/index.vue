<template>
  <div class="container">
    <div class="container-main text-center">
      <h2 class="mb-3">Filmes em Destaque</h2>
      <p class="col-md-8 mx-auto">
      Veja informações rápidas sobre os filmes: título, ano de lançamento, idioma original, nota média e uma breve descrição. Clique em qualquer filme para ver os detalhes completos.
      </p>
    </div>
    <div class="list-movie d-flex flex-column align-items-center">
        <div class="d-flex justify-content-center align-items-center row">
          <div
            class="card card-movie m-2"
            v-for="(movie, index) in response.results"
            :key="index"
          >
          <NuxtLink :to="'/item/' + movie.id + '-' + slugify(movie.title)">
            <img
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              style="max-width: 160px"
              loading="lazy"
            />
            <div class="overlay">
              <div class="d-flex gap-1 mb-auto">
                <h6><span class="badge badge-primary mr-2">{{movie.original_language.toUpperCase()}}</span></h6>
              </div>
              <div class="d-flex flex-column movie-info">
                <p class="title mb-0">{{ movie.title }}</p>                
                <div class="d-flex align-items-center justify-content-between w-100">
                  <p class="mb-0">{{movie?.release_date.split('-')[0]}}</p>
                  <StarsVote :quantidade="movie.vote_average" />
                </div>
              </div>
            </div>
            </NuxtLink>
          </div>
        </div>
        <nav class="mt-4 d-flex justify-content-center mt-auto" v-if="totalPages >1">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: page === 1 }">
              <button
                class="page-link"
                @click="goToPage(page - 1)"
                :disabled="page === 1"
              >
                Anterior
              </button>
            </li>
            <li
              class="page-item"
              v-for="p in visiblePages"
              :key="p"
              :class="{ active: page === p }"
            >
              <button class="page-link" @click="goToPage(p)">{{ p }}</button>
            </li>
            <li class="page-item" :class="{ disabled: page === totalPages }">
              <button
                class="page-link"
                @click="goToPage(page + 1)"
                :disabled="page === totalPages"
              >
                Próxima
              </button>
            </li>
          </ul>
        </nav>
    </div>
  </div>
</template>

<script setup>
import { useApiTokenStore } from '~/store/apiToken'

const apiTokenStore = useApiTokenStore()
const tokenApi = apiTokenStore.token
useHead({
  title: 'Home - Catálogo de Filmes',
  meta: [
    { name: 'description', content: 'Explore os filmes populares, lançamentos e recomendações.' },
    { property: 'og:title', content: 'Catálogo de Filmes' },
    { property: 'og:description', content: 'Os melhores filmes disponíveis para você.' },
    { property: 'og:type', content: 'website' },
  ]
})
const page = ref(1);
const totalPages = ref(0);

const {
  data: response,
  pending,
  error,
  refresh,
} = await useAsyncData(
  "film-list",
  async () => {
    const res = await $fetch(
      "https://api.themoviedb.org/3/discover/movie?language=pt-BR&page=" + page.value,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " + tokenApi.value,
        },
      }
    );
    totalPages.value = res.total_pages;
    return res;
  },
  {
    watch: [page],
  }
);
const maxVisiblePages = 5;
const visiblePages = computed(() => {
  const startGroup =
    Math.floor((page.value - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endGroup = Math.min(startGroup + maxVisiblePages - 1, totalPages.value);

  const pages = [];
  for (let i = startGroup; i <= endGroup; i++) {
    pages.push(i);
  }
  return pages;
});
function goToPage(p) {
  if (p >= 1 && p <= totalPages.value) {
    page.value = p;
  }
}
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}
</script>

<style scoped>
.list-movie {
  min-height: 82vh;
}
.card-movie {
  max-width: 160px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.card-movie img {
  width: 100%;
  height: 240px;
  display: block;
  border-radius: 10px;
}

.card-movie .overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
  border-radius: 10px;
  color: white;
  box-shadow: inset 80px -80px 80px rgba(0, 0, 0, 0.6);
}
.movie-info {
  gap: 4px;
}
.movie-info p {
  font-size: 0.75rem;
}
.movie-info {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.card-movie:hover .movie-info {
  transform: translateY(-8px);
}
.container-main{
  color: white;
}
</style>