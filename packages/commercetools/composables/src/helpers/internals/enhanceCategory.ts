import { ApolloQueryResult } from 'apollo-client';
import { CategoryQueryResult, ProductQueryResult, ProductVariant, Category } from './../../types/GraphQL';

interface CategoryData {
  categories: CategoryQueryResult;
}

interface ProductData {
  products: ProductQueryResult;
}

type ProductResponse = ApolloQueryResult<ProductData>
type CategoryResponse = ApolloQueryResult<CategoryData>

const addProductsToCategory = (rawProducts: ProductVariant[]) => (category: Category) => ({
  ...category,
  _products: rawProducts.filter((prod) => (prod as any)._categoriesRef.includes(category.id))
});

const enhanceCategory = (categoryResponse: CategoryResponse, productResponse: ProductResponse): ApolloQueryResult<CategoryData> => {
  const rawProducts = (productResponse.data as any)._variants;
  const { results } = categoryResponse.data.categories;

  categoryResponse.data.categories.results = results.map(addProductsToCategory(rawProducts));

  return categoryResponse;
};

export default enhanceCategory;
