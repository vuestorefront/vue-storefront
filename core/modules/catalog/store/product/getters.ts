import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/store/types/RootState'
import ProductState from '../../types/ProductState'
import { debug } from 'util';

const getters: GetterTree<ProductState, RootState> = {
  productParent: (state) => state.parent,
  productCurrent: (state) => state.current,
  currentConfiguration: (state) => state.current_configuration,
  productOriginal: (state) => state.original,
  currentOptions: (state) => state.current_options,
  breadcrumbs: (state) => state.breadcrumbs,
  productGallery: (state) => state.productGallery,
  getCurrentAttributeNames: (state) => {
    return Object.keys(state.current_configuration)
  },
  getAvailableProductOptions: (state, getters) => {
    let availableOptions = {}
    getters.getCurrentAttributeNames.map(attributeName => {
      availableOptions[attributeName] = getters.currentOptions[attributeName].filter(option => {
        return !!getters.productCurrent.configurable_children.find(childrenOption => 
          childrenOption[option.attribute_code] === option.id.toString()
        )
      })
    })
    return availableOptions
  }
}

export default getters
