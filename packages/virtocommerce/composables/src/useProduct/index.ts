import { ProductVariant } from './../types/GraphQL';
import { useProductFactory, ProductsSearchResult, UseProduct, AgnosticSortByOption} from '@vue-storefront/core';
import { ProductsSearchParams } from '../types';
import { getProduct } from '@vue-storefront/virtocommerce-api';
import { Filter } from '@vue-storefront/virtocommerce-api/lib/types/filters';

const availableSortingOptions = [
  { value: 'price-up', label: 'Price from low to high' },
  { value: 'price-down', label: 'Price from high to low' }
];

function convertProducts(products: any): ProductVariant[] {
  return products.map((apiProduct) => ({
    _id: apiProduct.id,
    _name: apiProduct.name,
    _slug: apiProduct.slug ?? 'slug-' + apiProduct.id,
    id: apiProduct.id,
    key: 'key-' + apiProduct.id,
    sku: apiProduct.id,
    code: apiProduct.code,
    prices: [],
    price: {value: {centAmount: 123, currencyCode: 'USD', type: 'price type', fractionDigits: 2}},
    images: [{ label: 'main', url: apiProduct.imgSrc}],
    asserts: [],
    attributeList: []
  }));
}

const productsSearch = async (params: ProductsSearchParams): Promise<ProductsSearchResult<ProductVariant, Record<string, Filter>, AgnosticSortByOption[]>> => {
  console.info(`productsSearch: mock - return 1 product list - ${JSON.stringify(params)}`);

  const productResponse = await getProduct();
  const products = convertProducts(productResponse.data.products.items);
  console.info(products);

  // const testProductVariant: ProductVariant = {
  //   __typename: 'ProductVariant',
  //   _name: 'Neon Coral Tropical Floral Print Bandeau Pleated Dress',
  //   _slug: 'product-1-slug',
  //   _id: 1,
  //   id: 1,
  //   key: 'product-1-key',
  //   sku: '344394719',
  //   prices: [],
  //   price: {value: {centAmount: 1, currencyCode: 'USD', type: 'price type', fractionDigits: 2}},
  //   images: [{ label: 'main', url: 'https://dev4xapi.blob.core.windows.net/catalog/344394719/344394719_.jpg' }],
  //   assets: [],
  //   attributeList: []
  // };

  return {
    data: products,
    total: productResponse.data.products.totalCount,
    availableFilters: {},
    availableSortingOptions
  };
};

const useProduct: (cacheId: string) => UseProduct<ProductVariant, Record<string, Filter>, AgnosticSortByOption[]> =
  useProductFactory<ProductVariant, ProductsSearchParams, Record<string, Filter>, AgnosticSortByOption[]>({ productsSearch });

export default useProduct;
