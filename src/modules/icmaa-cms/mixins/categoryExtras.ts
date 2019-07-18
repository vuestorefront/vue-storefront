import { mapGetters } from 'vuex'

export default {
  async asyncData ({ store, route }) {
    const category = store.getters['category/getCurrentCategory']
    await store.dispatch('icmaaCmsCategoryExtras/single', { value: category.url_key })
  },
  computed: {
    ...mapGetters('icmaaCmsCategoryExtras', ['categoryExtrasByIdentifier']),
    categoryExtras () {
      return this.categoryExtrasByIdentifier(this.category.url_key)
    }
  }
}
