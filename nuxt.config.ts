// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['bootstrap/dist/css/bootstrap.min.css', '@/assets/css/main.css'],
  plugins: ['~/plugins/bootstrap.client.ts'],
  alias:{
    css: '/<rootDir>/assets/css',
  },
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/image-edge'
  ],  
  pinia:{
    storesDirs:['./stores/**']
  },
   runtimeConfig: {
    public: {
      TMDB_TOKEN: process.env.NUXT_PUBLIC_TMDB_TOKEN,
      USER_ID: process.env.NUXT_USER_ID,
    }
  },
  image: {
    domains: ['image.tmdb.org'],
    presets: {
      movie: {
        modifiers: {
          format: 'webp',
          width: 160,
          height: 240
        }
      }
    }
  },
  vite: {
    build: {
      minify: 'esbuild',
    },
  },
})