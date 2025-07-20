import { defineNuxtPlugin } from '#app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faHome, faStar } from '@fortawesome/free-solid-svg-icons'
import * as solidIcons from '@fortawesome/free-solid-svg-icons'
Object.values(solidIcons).forEach((icon: any) => {
  if (icon.prefix === 'fas') library.add(icon)
})

export default defineNuxtPlugin(nuxtApp => {
  library.add(faUser, faHome, faStar)
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
