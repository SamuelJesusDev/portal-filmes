<template>
  <div class="container">
    <div class="banner-main"></div>
    <div class="list-movie">
        <div class="d-flex justify-content-center align-items-center row">
          <div
            class="card card-movie m-2"
            v-for="(movie, index) in response.results"
            :key="index"
          >
          <NuxtLink :to="'/item/' + movie.id + '-' + slugify(movie.title)">
            <img
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              class=""
              alt=""
            />
            <div class="overlay">
              <div class="d-flex gap-1 mb-auto">
                <h6><span class="badge badge-primary mr-2">DUB</span></h6>
                <h6><span class="badge badge-dark">HD</span></h6>
              </div>
              <div class="d-flex flex-column movie-info">
                <p class="title mb-0">{{ movie.title }}</p>
                <StarsVote :quantidade="movie.vote_average" />
                <div class="d-flex justify-content-between w-100">
                  <p>2025</p>
                  <p>120 min</p>
                </div>
              </div>
            </div>
            </NuxtLink>
          </div>
        </div>
        <nav class="mt-4 d-flex justify-content-center">
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
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwY2ZmMDQ5MDMyMzk5ZGU0MGQwYjNlNjMyMTJlYjIzMCIsIm5iZiI6MTc1MjkyNDIyOC40NTIsInN1YiI6IjY4N2I4MDQ0MTczM2RhMzhkMjUyODY2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yFmP9mray8n8eEixPNsMYcsTaFde_wHaZYlSHK9Rmj8",
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
const maxVisiblePages = 10;
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
</style>