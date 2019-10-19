import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from '@vue-storefront/core/modules/catalog-next/store/category/CategoryState'
import { optionLabel } from '@vue-storefront/core/modules/catalog-next/helpers/optionLabel'

const getters: GetterTree<CategoryState, RootState> = {
  isCurrentFilterAttribute: (state, getters) => (attributeKey) => {
    return (getters.getCurrentFilters[attributeKey])
  }
}

export default getters
