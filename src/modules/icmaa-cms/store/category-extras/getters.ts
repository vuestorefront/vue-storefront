import { GetterTree } from 'vuex'
import CategoryExtrasState, { CategoryExtrasStateItem } from '../../types/CategoryExtrasState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<CategoryExtrasState, RootState> = {
  categoryExtras: (state) => state.items,
  categoryExtrasByIdentifier: (state) => (identifier): CategoryExtrasStateItem => {
    return state.items.find(item => item.identifier === identifier)
  },
  categoryExtrasByCurrentCategory: (state, getters, rootState, rootGetters): CategoryExtrasStateItem|boolean => {
    const category = rootGetters['category-next/getCurrentCategory']
    if (category) {
      return getters.categoryExtrasByIdentifier(category.url_key)
    }

    return false
  }
}

export default getters
