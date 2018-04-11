import * as types from '../../mutation-types'
import { slugify } from '../../helpers'
import { entityKeyName } from '../../lib/entities'
import EventBus from '../../lib/event-bus'

export default {
  [types.CATEGORY_UPD_CURRENT_CATEGORY] (state, category) {
    state.current = category
    EventBus.$emit('category-after-current', { category: category })
  },
  [types.CATEGORY_UPD_CURRENT_CATEGORY_PATH] (state, path) {
    state.current_path = path // TODO: store to cache
  },

  [types.CATEGORY_UPD_CATEGORIES] (state, categories) {
    state.list = categories.items

    for (let category of state.list) {
      let catSlugSetter = (category) => {
        for (let subcat of category.children_data) { // TODO: fixme and move slug setting to vue-storefront-api
          subcat = Object.assign(subcat, { slug: subcat.hasOwnProperty('name') ? slugify(subcat.name) + '-' + subcat.id : '' })
          catSlugSetter(subcat)
        }
      }
      catSlugSetter(category)
      const catCollection = global.$VS.db.categoriesCollection
      try {
        catCollection.setItem(entityKeyName('slug', category.slug.toLowerCase()), category).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache by slug
        catCollection.setItem(entityKeyName('id', category.id), category).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache by id
      } catch (e) {
        console.error(e)
      }
    }
  }
}
