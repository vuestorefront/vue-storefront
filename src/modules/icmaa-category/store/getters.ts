import { GetterTree } from 'vuex'
import CategoryState, { CategoryStateListItem, ProductListingWidgetState } from '../types/CategoryState'
import RootState from '@vue-storefront/core/types/RootState'
import { sortByLetter } from '../helpers'

const getters: GetterTree<CategoryState, RootState> = {
  lists: state => state.lists,
  listByParentId: (state, getters, RootState, rootGetters) => (id: number): CategoryStateListItem | boolean => {
    let categoryList = getters.lists.find(l => l.parent === id)
    if (categoryList) {
      const { list, parent } = categoryList
      const categories = rootGetters['category-next/getCategories']
      return {
        list: list.map(id => categories.find(c => c.id === id)),
        parent: categories.find(c => c.id === parent)
      }
    }

    return false
  },
  sortedListByParentId: (state, getters) => (id: number): CategoryStateListItem | boolean => {
    let list = getters.listByParentId(id)
    if (list) {
      list.list.sort(sortByLetter)
      return list
    }

    return false
  },
  getProductListingWidget: (state): ProductListingWidgetState[] => state.productListingWidget,
  getProductListingWidgetByCategoryId: state => (parent: number): ProductListingWidgetState => {
    return state.productListingWidget.find(i => i.parent === parent)
  }
}

export default getters
