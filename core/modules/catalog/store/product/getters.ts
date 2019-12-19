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
  getCurrentProduct: state => state.current,
  getCurrentProductConfiguration: state => state.current_configuration,
  getCurrentProductOptions: state => state.current_options,
  getOriginalProduct: state => state.original,
  getParentProduct: state => state.parent,
  getProductsSearchResult: state => state.list,
  getProducts: (state, getters) => getters.getProductsSearchResult.items,
  getProductGallery: state => state.productGallery,
  getProductRelated: state => state.related
}

export default getters
