import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '../../types/ProductState'

const getters: GetterTree<ProductState, RootState> = {
  getCurrentProduct: state => state.current,
  getCurrentProductCategoryId: (state, getters, rootState, rootGetters) => {
    if (getters.getCurrentProduct && getters.getCurrentProduct.category_ids) {
      return rootGetters['category-next/getCategoriesMap'][getters.getCurrentProduct.category_ids[0]]
    }
    return null
  },
  getCurrentProductConfiguration: state => state.current_configuration,
  getCurrentProductOptions: state => state.current_options,
  getOriginalProduct: state => state.original,
  getParentProduct: state => state.parent,
  getProductsSearchResult: state => state.list,
  getProducts: (state, getters) => getters.getProductsSearchResult.items,
  getProductGallery: state => state.productGallery,
  getProductRelated: state => state.related,
  getProductBreadcrumbs: (state, getters, rootState, rootGetters) => rootGetters['category-next/getBreadcrumbsFor'](getters.getCurrentProductCategoryId)
}

export default getters
