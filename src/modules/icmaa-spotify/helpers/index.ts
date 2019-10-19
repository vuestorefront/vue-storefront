import config from 'config'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'

export const isCategoryInWhitelist = (category: Category) => {
  const { parentCategoryWhitelist } = config.icmaa_spotify
  return category.path && parentCategoryWhitelist.filter(parentId => category.path.split('/').map(Number).includes(parentId)).length > 0
}
