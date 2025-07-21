import { defineStore } from 'pinia'
import type { Movie } from "~/interfaces/Movie";
export const useFavoritosStore = defineStore('favoritos', () => {
  const userToken = ref('22157564')
  const favoritos= ref<Movie[]>([]);
    const addFavorite =(movie: Movie | undefined) => {
      if (!movie) {
          console.warn('Tentou adicionar favorito mas filme é undefined')
        return
      }
      if (!favoritos.value.find(item => item.id === movie.id)) {
        favoritos.value.push(movie)
      }
    };

    const removeFavorite = (id: number) => {
      favoritos.value = favoritos.value.filter(item => item.id !== id)
    };
    const isFavorite = (id: number) => {
      return favoritos.value.some(item => item.id === id);
    };
    return{
      addFavorite,
      removeFavorite,
      isFavorite,
      favoritos,
      userToken
    }
}, {
  persist: true
})
