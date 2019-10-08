import { mapGetters } from 'vuex'
import config from 'config'
import i18n from '@vue-storefront/i18n'
import { price } from '@vue-storefront/core/filters/price'
import { Logo } from 'icmaa-category-extras/helpers/categoryExtras/logo'
import ProductNameHelper from '../helpers/productName'

export default {
  async asyncData ({ store }) {
    const filterValues = Object.keys(store.getters['product/getCurrentProduct'])
      .filter(fieldName => config.icmaa_catalog.entities.product.prefetchAttributes.includes(fieldName))
    await store.dispatch('attribute/list', { filterValues })

    await store.dispatch('icmaaCategoryExtras/loadDepartmentChildCategoryIdMap')

    const departmentCategoryId = store.getters['icmaaCategoryExtras/getCurrentProductDepartmentCategoryId']
    if (departmentCategoryId) {
      await store.dispatch('category-next/loadCategory', { filters: { 'id': departmentCategoryId } })

      const category = store.getters['icmaaCategoryExtras/getCurrentProductDepartmentCategory']
      if (category) {
        await store.dispatch('icmaaCategoryExtras/single', { value: category.url_key })
        await store.dispatch('icmaaSpotify/fetchRelatedArtists', category)
      }
    }
  },
  computed: {
    ...mapGetters('attribute', { getOptionLabel: 'getOptionLabel' }),
    ...mapGetters('icmaaCategoryExtras', ['getCurrentProductDepartmentCategory', 'getCategoryExtrasByUrlKey']),
    ...mapGetters({ reviews: 'review/getReviews', reviewsCount: 'review/getReviewsCount', reviewsTotalRating: 'review/getReviewsTotalRating' }),
    departmentCategory () {
      return this.getCurrentProductDepartmentCategory
    },
    departmentBrandType () {
      return this.product.brand ? 'brand' : 'band'
    },
    departmentBrandValue () {
      return this.product.brand || this.product.band
    },
    departmentBrandOptionLabel () {
      return this.getOptionLabel({
        attributeKey: this.departmentBrandValue,
        optionId: this.product[this.departmentBrandType]
      })
    },
    departmentLogo () {
      return (this.categoryExtras && this.categoryExtras.hasLogo) ? new Logo(this.departmentCategory) : false
    },
    hasDepartmentBrandOptionLabel () {
      return this.departmentBrandOptionLabel !== this.departmentBrandValue
    },
    categoryExtras () {
      if (this.departmentCategory) {
        return this.getCategoryExtrasByUrlKey(this.departmentCategory.url_key)
      }
    },
    translatedProductName () {
      return new ProductNameHelper(this.product.name).translatedName
    },
    productName () {
      let name = this.translatedProductName
      const regex = this.hasDepartmentBrandOptionLabel
        ? new RegExp('/^(' + this.departmentBrandOptionLabel + '*?)(\\s-\\s)/')
        : /^(.*?)(\s-\s)/

      return !regex.test(name) ? name : {
        mandant: name.match(regex)[1],
        product: name.replace(regex, '')
      }
    },
    formattedProductPrice () {
      return price(this.product.price_incl_tax)
    },
    webshareText () {
      return i18n.t(
        'Checkout this out: {name} for {price}',
        { name: this.translatedProductName, price: this.formattedProductPrice }
      )
    }
  },
  methods: {
    setCluster () {
      if (this.categoryExtras && this.categoryExtras.customerCluster) {
        this.$store.dispatch('user/setCluster', this.categoryExtras.customerCluster)
      }
    }
  },
  mounted () {
    this.setCluster()
  }
}
