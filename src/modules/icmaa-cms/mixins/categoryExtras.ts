import { mapGetters } from 'vuex'
import { CategoryExtrasStateItem } from '../types/CategoryExtrasState'
import { Category } from '@vue-storefront/core/modules/catalog-next/types/Category'

import { htmlDecode } from '@vue-storefront/core/filters/html-decode'

export default {
  async asyncData ({ store, route }) {
    /**
     * @todo Find out why the state.route isn't ready when getter is called
     * @see https://github.com/DivanteLtd/vue-storefront/issues/3328
     *
     * On client-side site requests (via navigation) the state.route of the getCurrentCategory() getter isn't already
     * the current route and so can't get the correct current category. The vuex-router-sync module which
     * syncs the current router to store seems sometimes be still the last one when get called in getter.
     *   route.params -> is correct
     *   rootState.route.params (in getter) -> not
     *
     * The current solution is to fetch the data in the traditional VueJs way using mounted() and serverPrefetch().
     * */
    // const category = store.getters['category-next/getCurrentCategory']
    // return store.dispatch('icmaaCmsCategoryExtras/single', { value: category.url_key })
  },
  async serverPrefetch () {
    return this.fetchAsyncData()
  },
  mounted () {
    this.fetchAsyncData()
  },
  watch: {
    getCurrentCategory: function (oldCat: Category, newCat: Category) {
      this.fetchAsyncData()
    }
  },
  methods: {
    async fetchAsyncData () {
      const category = this.$store.getters['category-next/getCurrentCategory']
      if (!this.categoryExtrasByIdentifier(category.url_key)) {
        await this.$store.dispatch('icmaaCmsCategoryExtras/single', { value: category.url_key })
      }
    },
    getCategoryExtrasValueOrCategoryValue (key: string, catKey: string = 'name'): any {
      return this.categoryExtras && this.categoryExtras[key]
        ? this.categoryExtras[key] : this.getCurrentCategory[catKey]
    }
  },
  computed: {
    ...mapGetters('category-next', ['getCurrentCategory']),
    ...mapGetters('icmaaCmsCategoryExtras', ['categoryExtrasByCurrentCategory']),
    ...mapGetters('icmaaCmsCategoryExtras', ['categoryExtrasByIdentifier']),
    categoryExtras (): CategoryExtrasStateItem|boolean {
      return this.categoryExtrasByCurrentCategory
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
