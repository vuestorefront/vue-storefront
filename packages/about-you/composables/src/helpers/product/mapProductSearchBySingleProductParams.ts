import { ProductWith } from '@aboutyou/backbone/types/ProductWith';
import { ProductsSearchEndpointParameters } from '@aboutyou/backbone/endpoints/products/products';

const mapProductSearchBySingleProductParams = ({withParams, ...restParams}): ProductsSearchEndpointParameters => {
  const productWith: ProductWith = withParams ?? {
    attributes: 'all',
    advancedAttributes: 'all',
    variants: {
      attributes: 'all',
      advancedAttributes: 'all'
    },
    priceRange: true
  };
  return {
    with: productWith,
    ...restParams
  };
};

export { mapProductSearchBySingleProductParams };
