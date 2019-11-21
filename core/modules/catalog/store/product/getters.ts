import { PagedProductList } from './../../types/ProductState';
import { nonReactiveState } from './index';
import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '../../types/ProductState'
import cloneDeep from 'lodash-es/cloneDeep'

function mapCategoryProducts (productsSkus, productsData) {
  return productsSkus.map(prodSku => {
    const product = productsData.find(prodData => prodData.sku === prodSku)
    return cloneDeep(product)
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
