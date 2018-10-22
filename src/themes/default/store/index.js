// Here you can place theme-specific stores that will be added to the core stores.
// Everything that you will export here will be treated as a Vuex module
// The good practice is to keep all modulase separated in this folder.

// Below you can find commented exaple for additional theme store

import ui from './ui-store'
import product from './product-extensions'
import social from './social-tiles'

export default {
  ui,
  product,
  social
}
