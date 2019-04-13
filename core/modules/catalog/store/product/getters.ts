import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '../../types/ProductState'

const getters: GetterTree<ProductState, RootState> = {
  productParent: (state) => state.parent,
  productCurrent: (state) => state.current,
  getCurrentList: (state) => state.list,
  currentConfiguration: (state) => state.current_configuration,
  productOriginal: (state) => state.original,
  currentOptions: (state) => state.current_options,
  breadcrumbs: (state) => state.breadcrumbs,
  productGallery: (state) => state.productGallery
}

export default getters
