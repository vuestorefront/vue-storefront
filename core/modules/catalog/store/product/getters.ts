import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '../../types/ProductState'
import { PriceHelper } from '@vue-storefront/core/helpers';
import Product from '../../types/Product';
import { getProductGallery } from '../../helpers';

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
  getProductGallery: (state, getters) => {
    if (!getters.getCurrentProduct) return [];

    return getProductGallery(getters.getCurrentProduct);
  },
  getProductRelated: state => state.related,
  getCurrentCustomOptions: state => state.current_custom_options,
  getProductBySkuDictionary: state => state.productBySku,
  getProductByIdDictionary: (state, getters) => {
    const dictionary: Record<Product['id'], Product> = {};

    for (const product of Object.values(getters['getProductBySkuDictionary']) as Product[]) {
      dictionary[product.id] = product;
    }

    return dictionary;
  },
  getProductByCategoryIdDictionary: (state, getters) => {
    const dictionary: Record<string | number, Product[]> = {};

    for (const product of Object.values(getters['getProductBySkuDictionary']) as Product[]) {
      for (const id of product.category_ids) {
        if (!dictionary[id]) {
          dictionary[id] = [];
        }
        dictionary[id].push(product);
      }
    }

    return dictionary;
  },
  getCurrentBundleOptions: state => state.current_bundle_options,
  getProductPrice: (state, getters): (product: Product) => PriceHelper.ProductPrice => {
    return (product: Product) => {
      const price: PriceHelper.ProductPrice | undefined = getters['productPriceDictionary'][product.id];

      if (price) {
        return price;
      }

      return PriceHelper.getProductDefaultPrice(
        product,
        state.productDiscountedPrice
      )
    }
  },
  productLocalizedPriceDictionary: (state, getters) => {
    const _productPriceDictionary = getters.productPriceDictionary;
    const prices: Record<string, PriceHelper.ProductPrice> = {};
    const exchangeRate: number = state.exchangeRate;

    for (const key of Object.keys(_productPriceDictionary)) {
      const price = _productPriceDictionary[key];

      prices[key] = {
        regular: price.regular * exchangeRate,
        special: price.special === null
          ? null
          : price.special * exchangeRate
      }
    }

    return prices;
  },
  productPriceDictionary: (state): Record<string, PriceHelper.ProductPrice> => {
    const loadedProducts = Object.values(state.productBySku);
    const productPrices: Record<string, PriceHelper.ProductPrice> = {};

    for (const product of loadedProducts) {
      if (!product.id) {
        continue;
      }

      productPrices[product.id] = PriceHelper.getProductDefaultPrice(
        product,
        state.productDiscountedPrice
      );
    }

    return productPrices;
  }
}

export default getters
