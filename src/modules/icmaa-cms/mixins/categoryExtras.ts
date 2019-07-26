import { mapGetters } from 'vuex'
import { CategoryExtrasStateItem } from '../types/CategoryExtrasState'

import { htmlDecode } from '@vue-storefront/core/filters/html-decode'

export default {
  async asyncData ({ store, route }) {
    const category = store.getters['category-next/getCurrentCategory']
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
