import { GetterTree } from 'vuex'
import PageState, { PageStateItem } from '../../types/PageState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<PageState, RootState> = {
  pages: (state) => state.items,
  pageByIdentifier: (state) => (identifier): PageStateItem => {
    return state.items.find(item => item.identifier === identifier)
  }
}

export default getters
