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
        console.log('Filme adicionado aos favoritos:', movie)
      }
      else {
        console.log('Filme já está nos favoritos:', movie)
      }
    };

    const removeFavorite = (id: number) => {
      console.log('Tentando remover:', id)
  console.log('Favoritos antes:', favoritos.value)
      favoritos.value = favoritos.value.filter(item => item.id !== id)
        console.log('Favoritos depois:', favoritos.value)
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
