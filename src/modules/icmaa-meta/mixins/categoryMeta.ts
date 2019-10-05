import config from 'config'
import { getThumbnailPath } from '@vue-storefront/core/helpers'
import { htmlDecode } from '@vue-storefront/core/filters'

export default {
  computed: {
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
    return {
      meta: [
        {
          vmid: 'og:title',
          property: 'og:title',
          content: htmlDecode(this.getCurrentCategory.name)
        },
        { vmid: 'og:type', property: 'og:type', content: 'product.group' },
        ...this.categoryFBImages
      ]
    }
  }
}
