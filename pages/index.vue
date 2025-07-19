<template>
  <div class="container-fluid">
    <div class="banner-main"></div>
    <div class="list-movie">
        <NuxtLink class="nav-link" to="/item/6">
        <div class="card card-movie">
            <img src="~/assets/images/superman.jpg" class="" alt="">
            <div class="overlay">
            <div class="d-flex gap-1 mb-auto">
                <h6><span class="badge badge-primary mr-2">DUB</span></h6>
                <h6><span class="badge badge-dark">HD</span></h6>
            </div>
            <div class="d-flex flex-column movie-info">
                <p class="title mb-0">Superman</p>
                <div class="d-flex justify-content-between w-100">
                <p>2025</p>
                <p>120 min</p>
                </div>
            </div>
            </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.list-movie{
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