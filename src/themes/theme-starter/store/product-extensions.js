// You can extend core UI store here
// The good practise is to keep all ui-related states in this file

import coreStore from '@vue-storefront/store/modules/product'
import { extendStore } from '@vue-storefront/core/lib/themes'

const state = {
}

const actions = {
  example () {
    console.debug('Hello from example product Vuex action')
  }
}

export default extendStore(coreStore, {
  state,
  actions
})
