// plugins/fontawesome.ts
import { defineNuxtPlugin } from '#app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faUser, faHome, faStar as faStarSolid, faTrash, faPlus, faSignOutAlt, faLongArrowAltLeft, faBars} from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
library.add(faUser, faHome, faStarSolid,faStarRegular, faTrash, faPlus, faSignOutAlt,faLongArrowAltLeft ,faBars)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
