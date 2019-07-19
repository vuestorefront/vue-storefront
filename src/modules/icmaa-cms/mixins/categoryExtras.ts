import { mapGetters } from 'vuex'
import { CategoryExtrasStateItem } from '../types/CategoryExtrasState'

export default {
  async asyncData ({ store, route }) {
    const category = store.getters['category/getCurrentCategory']
    await store.dispatch('icmaaCmsCategoryExtras/single', { value: category.url_key })
  },
  computed: {
    ...mapGetters('category', ['getCurrentCategory']),
    ...mapGetters('icmaaCmsCategoryExtras', ['categoryExtrasByCurrentCategory']),
    categoryExtras (): CategoryExtrasStateItem|boolean {
      return this.categoryExtrasByCurrentCategory()
    },
    title (): string {
      return this.categoryExtras ? this.categoryExtras.title : this.getCurrentCategory.name
    }
  }
}
