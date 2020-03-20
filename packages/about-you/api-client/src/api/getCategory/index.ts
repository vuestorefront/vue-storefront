import { apiClient } from '../..';
import { BapiCategory, GetCategorySearchParams } from '../../types';

export default async function(options: GetCategorySearchParams = {}): Promise<BapiCategory[]> {
  if (options.ids) {
    return await apiClient.categories.getByIds(
      options.ids,
      { depth: options.depth }
    );
  } else if (options.path) {
    const response = await apiClient.categories.getByPath(
      options.path,
      { with: options.with }
    );
    return [response];
  } else {
    return await apiClient.categories.getRoots({
      with: options.with
    });
  }
}
