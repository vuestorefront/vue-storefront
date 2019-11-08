import { mapGetters } from 'vuex'

import config from 'config'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import { htmlDecode } from '@vue-storefront/core/filters'

export default {
  methods: {
    getCategoryExtrasValueOrCategoryValue (key: string, catKey: string = 'name'): any {
      return this.categoryExtras && this.categoryExtras[key]
        ? this.categoryExtras[key] : this.getCurrentCategory[catKey]
    }
  },
  computed: {
    ...mapGetters('category-next', ['getCurrentCategory']),
    ...mapGetters({ categoryExtras: 'icmaaCategoryExtras/getCategoryExtrasByCurrentCategory' }),
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
    },
    categoryFBImages () {
      if (!this.getCategoryProducts) {
        return []
      }

      let categoryImagesTags = []
      let limit = Math.min(this.getCategoryProducts.length, config.icmaa_meta.facebook.imagesListInCategoryView)

      this.getCategoryProducts.slice(0, limit).forEach(image => {
        categoryImagesTags.push({
          property: 'og:image',
          content: getThumbnailPath('/catalog/product' + image.image, this.width, this.height, 'media')
        })
      })

      return categoryImagesTags
    }
  },
  metaInfo () {
    let meta = [
      {
        vmid: 'og:title',
        property: 'og:title',
        content: htmlDecode(this.getCurrentCategory.name)
      },
      { vmid: 'og:type', property: 'og:type', content: 'product.group' },
      ...this.categoryFBImages
    ]

    if (this.metaDescription) {
      meta.push({ vmid: 'description', name: 'description', content: htmlDecode(this.metaDescription) })
    }

    return {
      title: htmlDecode(this.metaTitle),
      meta
    }
  }
}
