import { apiClient } from './../index'
import { CategorySearchParams, CategoryResponse } from './../types/Category'

const getCategories = async ({
  parentId = null,
  level = null,
  key = '',
  value = [],
  onlyActive = false,
  onlyNotEmpty = false
}: CategorySearchParams): Promise<CategoryResponse> => {
  // TODO: use body instead of search params
  const queryParams = [
    `?parentId=${parentId || ''}`,
    `&level=${level || ''}`,
    `&key=${key}`,
    `&value=${value.join(',')}`,
    `&onlyActive=${onlyActive ? 1 : ''}`,
    `&onlyNotEmpty=${onlyNotEmpty ? 1 : ''}`,
    `&locale=${apiClient.config.locale}`
  ].join('')

  try {
    const response = await apiClient.conn.get(`/catalog/categories${queryParams}`)
    return response.data.result
  } catch (e) {
    console.log(e)
    return null
  }
};

export default getCategories;
