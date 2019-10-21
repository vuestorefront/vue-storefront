import { getOption } from './../configuration'
import { CategorySearchParams } from './../types/Category'

const getCategories = async ({ parentId = null, level = null, key = '', value = [], onlyActive = false, onlyNotEmpty = false }: CategorySearchParams) => {
  const connection = getOption('connection')
  const queryParams = [
    `?parentId=${parentId || ''}`,
    `&level=${level || ''}`,
    `&key=${key}`,
    `&value=${value.join(',')}`,
    `&onlyActive=${onlyActive ? 1 : ''}`,
    `&onlyNotEmpty=${onlyNotEmpty ? 1 : ''}`
  ].join('')

  try {
    const response = await connection.get(`/catalog/categories${queryParams}`)
    return response.data.result
  } catch (e) {
    console.log(e)
    return null
  }
};

export default getCategories;
