import { getProduct } from '@vue-storefront/commercetools-api';
import { enhanceProduct } from './../helpers/internals';
import { ProductVariant } from './../types/GraphQL';
import { useProductFactory } from '@vue-storefront/factories';
import { ProductSearch } from '@vue-storefront/commercetools-api/lib/src/types/Api';
import { SearchResult } from '@vue-storefront/interfaces';

const productsSearch = async (params: ProductSearch): Promise<SearchResult<ProductVariant>> => {
  const productResponse = await getProduct(params);
  const enhancedProductResponse = enhanceProduct(productResponse);
  return {
    data: (enhancedProductResponse.data as any)._variants,
    total: productResponse.data.products.total
  };
};

export default useProductFactory<ProductVariant, ProductSearch>({ productsSearch });
