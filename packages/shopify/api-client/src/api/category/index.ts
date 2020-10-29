import { Category, CategorySearchParams } from '../../types';
import fetchAll from './fetchAll';
import fetchAllWithProducts from './fetchAllWithProducts';
import fetch from './fetch';
import fetchWithProducts from './fetchWithProducts';
import fetchByHandle from './fetchByHandle';
import fetchQuery from './fetchQuery';

async function getCategory(options: CategorySearchParams): Promise<Category[]> {
  if (options.slug === '/') {
    delete options.slug;
  }

  if (options.id && !options.withProducts) {
    return fetch(options);
  } else if (options.id && !options.withProducts) {
    return fetchWithProducts(options);
  } else if (options.slug) {
    return fetchByHandle(options);
  } else if (options.customQuery) {
    return fetchQuery(options);
  } else if (options.withProducts) {
    return fetchAllWithProducts();
  } else {
    return fetchAll();
  }
}

export default getCategory;
