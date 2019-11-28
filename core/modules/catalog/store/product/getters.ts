import { PagedProductList } from './../../types/ProductState';
import { nonReactiveState } from './index';
import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '../../types/ProductState'
import cloneDeep from 'lodash-es/cloneDeep'

function mapCategoryProducts (productsFromState, productsData) {
  return productsFromState.map(prodState => {
    if (typeof prodState === 'string') {
      const product = productsData.find(prodData => prodData.sku === prodState)
      return cloneDeep(product)
    }
    return prodState
  })
}

const getters: GetterTree<ProductState, RootState> = {
  productParent: (state) => state.parent,
  productCurrent: (state) => state.current,
  currentConfiguration: (state) => state.current_configuration,
  productOriginal: (state) => state.original,
  currentOptions: (state) => state.current_options,
  breadcrumbs: (state) => state.breadcrumbs,
  productGallery: (state) => state.productGallery,
  list: (state) => mapCategoryProducts((state.list as PagedProductList).items, nonReactiveState.list)
}

export default getters
