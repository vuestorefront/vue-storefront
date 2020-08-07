// import { enhanceProduct, mapPaginationParams, getFiltersFromProductsAttributes } from './../helpers/internals';
import { Asset, Attribute, Image, Maybe, Product, ProductPrice, ProductVariant, Scalars } from './../types/GraphQL';
import { useProductFactory, ProductsSearchResult, UseProduct, AgnosticSortByOption} from '@vue-storefront/core';
import { ProductsSearchParams } from '../types';
import { Filter } from '@vue-storefront/virtocommerce-api/lib/types/filters';

const availableSortingOptions = [
  { value: 'price-up', label: 'Price from low to high' },
  { value: 'price-down', label: 'Price from high to low' }
];

const productsSearch = async (params: ProductsSearchParams): Promise<ProductsSearchResult<ProductVariant, Record<string, Filter>, AgnosticSortByOption[]>> => {
  console.info(`productsSearch: mock - return 1 product list - ${JSON.stringify(params)}`);
  // const apiSearchParams: ProductSearch = {
  //   ...params,
  //   ...mapPaginationParams(params)
  // };
  //
  // const productResponse = await getProduct(apiSearchParams);
  // const enhancedProductResponse = enhanceProduct(productResponse);
  // const products = (enhancedProductResponse.data as any)._variants;
  // const availableFilters: Record<string, Filter> = getFiltersFromProductsAttributes(products);

  // const testProduct: Product = {
  //   __typename: 'Product',
  //   skus: ['001'],
  //   masterData: {
  //     published: true,
  //     hasStagedChanges: false,
  //     current: {
  //       skus: ['001'],
  //       description: 'some test product',
  //       name: 'some product name',
  //       nameAllLocales: [{locale: 'en', value: 'some localized name'}],
  //       categories: [],
  //       categoriesRef: [],
  //       masterVariant: {
  //         id: 1,
  //         images: [],
  //         assets: [],
  //         attributeList: []
  //       },
  //       variant: {
  //         id: 1,
  //         images: [],
  //         assets: [],
  //         attributeList: []
  //       },
  //       variants: [],
  //       allVariants: []
  //     }
  //   }
  // };

  const testProductVariant: ProductVariant = {
    __typename: 'ProductVariant',
    _name: 'Neon Coral Tropical Floral Print Bandeau Pleated Dress',
    _slug: 'product-1-slug',
    _id: 1,
    id: 1,
    key: 'product-1-key',
    sku: '344394719',
    prices: [],
    price: {value: {centAmount: 1, currencyCode: 'USD', type: 'price type', fractionDigits: 2}},
    images: [{ label: 'main', url: 'https://dev4xapi.blob.core.windows.net/catalog/344394719/344394719_.jpg' }],
    assets: [],
    attributeList: []
  };

  return {
    data: [testProductVariant],
    total: 1,
    availableFilters: {},
    availableSortingOptions
  };
};

const useProduct: (cacheId: string) => UseProduct<ProductVariant, Record<string, Filter>, AgnosticSortByOption[]> =
  useProductFactory<ProductVariant, ProductsSearchParams, Record<string, Filter>, AgnosticSortByOption[]>({ productsSearch });

export default useProduct;
