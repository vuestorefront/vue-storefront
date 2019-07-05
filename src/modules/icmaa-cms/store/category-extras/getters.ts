import { GetterTree } from 'vuex'
import CategoryExtrasState, { CategoryExtrasStateItem } from '../../types/CategoryExtrasState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<CategoryExtrasState, RootState> = {
  categoryExtras: (state) => state.items,
  categoryExtrasByIdentifier: (state) => (identifier): CategoryExtrasStateItem => {
    return state.items.find(item => item.identifier === identifier)
  }
}

export default getters
