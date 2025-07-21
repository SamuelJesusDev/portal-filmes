<template>
  <div class="container py-5">
    <ClientOnly>
    <Loading
      :isActive="isLoading || pending"
      loadingMessage="Carregando, por favor aguarde..."
    />
    </ClientOnly>
    <div class="container-main text-center">
      <h2 class="mb-3">Filmes em Destaque</h2>
      <p class="col-md-8 mx-auto">
        Veja informações rápidas sobre os filmes: título, ano de lançamento, idioma original, nota média e uma breve descrição.
        Clique em qualquer filme para ver os detalhes completos.
      </p>
    </div>
    <div class="list-movie d-flex flex-column align-items-center" v-if="!isLoading && !pending">
      <div v-if="response && response.results" class="d-flex justify-content-center align-items-center row mb-4">
        <div
          class="card card-movie m-2"
          v-for="(movie, index) in response.results"
          :key="index"
        >
          <NuxtLink :to="'/item/' + movie.id + '-' + slugify(movie.title)">
            <NuxtImg
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              width="160"
              height="240"
              format="webp"
              loading="lazy"
              :alt="movie.title"
            />
            <div class="overlay">
              <div class="d-flex gap-1 mb-auto">
                <h6><span class="badge badge-primary mr-2">{{ movie.original_language.toUpperCase() }}</span></h6>
              </div>
              <div class="d-flex flex-column movie-info">
                <p class="title mb-0">{{ movie.title }}</p>
                <div class="d-flex align-items-center justify-content-between w-100">
                  <p class="mb-0">{{ movie?.release_date.split('-')[0] }}</p>
                  <ClientOnly>
                    <StarsVote :quantidade="movie.vote_average" />
                  </ClientOnly>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <nav class="d-flex justify-content-center mt-auto" v-if="totalPages >= 1 && visiblePages.length > 0">
        <ul class="pagination">
          <li class="page-item prev-next" :class="{ disabled: page === 1 }">
            <button class="page-link" @click="goToPage(page - 1)" :disabled="page === 1">Anterior</button>
          </li>
          <li class="page-item" v-for="p in visiblePages" :key="p" :class="{ active: page === p }">
            <button class="page-link" @click="goToPage(p)">{{ p }}</button>
          </li>
          <li class="page-item prev-next" :class="{ disabled: page === totalPages }">
            <button class="page-link" @click="goToPage(page + 1)" :disabled="page === totalPages">Próxima</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
useHead({
  title: 'Home - Catálogo de Filmes',
  meta: [
    { name: 'description', content: 'Explore os filmes populares, lançamentos e recomendações.' },
    { property: 'og:title', content: 'Catálogo de Filmes' },
    { property: 'og:description', content: 'Os melhores filmes disponíveis para você.' },
    { property: 'og:type', content: 'website' }
  ]
})
const route = useRoute()
const router = useRouter()
const page = ref(Number(route.query.page) || 1)
const isLoading = ref(false)

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
        headers: {
          Authorization:
            "Bearer " + config.public.TMDB_TOKEN,
        },
      }
    );
    return res;
  },
  {
    server: true,
    lazy: false,
    watch: [page],
  }
);
const totalPages = computed(() => response.value?.total_pages || 0)

const visiblePages = computed(() => {
  const total = totalPages.value
  let startPage = page.value - 2
  let endPage = page.value + 2

  if (startPage < 1) {
    endPage += 1 - startPage
    startPage = 1
  }
  if (endPage > total) {
    startPage -= endPage - total
    endPage = total
  }
  if (startPage < 1) startPage = 1

  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages;
});
function goToPage(p) {
  if (p >= 1 && p <= totalPages.value) {
    router.push({ query: { ...route.query, page: p } })
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
watch(() => route.query.page, (newVal) => {
  page.value = Number(newVal) || 1
}, { immediate: true })
</script>

<style scoped>
body{
  min-height: 100vh;
}
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
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.movie-info p {
  font-size: 0.75rem;
}
.card-movie:hover .movie-info {
  transform: translateY(-8px);
}
.container-main {
  color: white;
}
.pagination .page-link {
  background: #323233;
  cursor: pointer;
  border-radius: 8px;
  color: #ffffff;
  transition: all 0.3s ease;
}

.pagination .page-link:hover {
  background: #ffffff;
  color: #00050d;
   opacity: 0.8;
}
.pagination .page-item.active .page-link,
.pagination .page-item.prev-next .page-link {
  background: #ffffff;
  color: #00050d;
  font-weight: bold;
}
</style>