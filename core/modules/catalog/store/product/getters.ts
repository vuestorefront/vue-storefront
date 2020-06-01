import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '../../types/ProductState'
import { Logger } from '@vue-storefront/core/lib/logger';

const getters: GetterTree<ProductState, RootState> = {
  getCurrentProduct: state => state.current,
  getCurrentProductConfiguration: state => state.current_configuration,
  getCurrentProductOptions: state => state.current_options,
  getOriginalProduct: (state, getters) => {
    if (!getters.getCurrentProduct) return null
    return state.original || {
      ...getters.getCurrentProduct,
      id: getters.getCurrentProduct.parentId || getters.getCurrentProduct.id
    }
  },
  getParentProduct: state => state.parent,
  getProductsSearchResult: state => state.list,
  getProducts: (state, getters) => getters.getProductsSearchResult.items,
  getProductGallery: state => state.productGallery,
  getProductRelated: state => state.related,
  getCurrentCustomOptions: state => state.current_custom_options
}

export default getters
