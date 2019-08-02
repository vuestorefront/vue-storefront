import { mapGetters } from 'vuex'
import { CategoryExtrasStateItem } from '../types/CategoryExtrasState'

import { htmlDecode } from '@vue-storefront/core/filters/html-decode'

export default {
  async asyncData ({ store, route }) {
    // On client-side site requests (via navigation) the state.route of the getCurrentCategory() getter isn't already
    // the current route and so can't get the correct current category, therefor we use our getCategoryByParams() getter
    // and traverse it via the route variable of the asyncData() method which seems to be correct.
    const category = store.getters['category-next/getCategoryByParams'](route.params)
    await store.dispatch('icmaaCmsCategoryExtras/single', { value: category.url_key })
  },
  methods: {
    getCategoryExtrasValueOrCategoryValue (key: string, catKey: string = 'name'): any {
      return this.categoryExtras && this.categoryExtras[key]
        ? this.categoryExtras[key] : this.getCurrentCategory[catKey]
    }
  },
  computed: {
    ...mapGetters('category-next', ['getCurrentCategory']),
    ...mapGetters('icmaaCmsCategoryExtras', ['categoryExtrasByCurrentCategory']),
    categoryExtras (): CategoryExtrasStateItem|boolean {
      return this.categoryExtrasByCurrentCategory()
    },
    title (): string {
      return this.getCategoryExtrasValueOrCategoryValue('title')
    },
    description (): string {
      return this.getCategoryExtrasValueOrCategoryValue('description')
    },
    metaTitle (): string {
      return this.getCategoryExtrasValueOrCategoryValue('metaTitle')
    },
    metaDescription (): string|boolean {
      return this.categoryExtras && this.categoryExtras.metaDescription
        ? this.categoryExtras.metaDescription : false
    }
  },
  metaInfo () {
    let meta = []

    if (this.metaDescription) {
      meta.push({ vmid: 'description', name: 'description', content: htmlDecode(this.metaDescription) })
    }

    return {
      title: htmlDecode(this.metaTitle),
      meta
    }
  }
}
