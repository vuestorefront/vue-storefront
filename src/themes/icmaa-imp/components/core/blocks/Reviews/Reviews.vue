<template>
  <section>
    <div>
      <h2 class="t-text-lg t-text-base-dark t-font-bold t-mb-4">
        {{ $t('Reviews') }}
      </h2>
      <div class="t-flex t-items-center t-justify-between t-mb-4">
        <div class="t-flex t-items-center t-text-sm">
          <reviews-stars :rating="reviewsTotalRating" stars-size="sm" stars-color="t-text-base-dark" class="t-text-base-dark" />
          <span class="t-ml-2 t-hidden sm:t-block">({{ total }})</span>
        </div>
        <button-component size="sm" v-model="formVisible" @click.native="toggleForm">
          {{ $t('Add review') }}
        </button-component>
      </div>
    </div>
    <reviews-form :product="product" v-if="formVisible" class="t-bg-white t-p-4 t-mb-8" />
    <reviews-list :product-name="productName" :per-page="4" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '@vue-storefront/i18n'
import VueScrollTo from 'vue-scrollto'

import ReviewsStars from 'theme/components/core/blocks/Reviews/ReviewsStars'
import ReviewsList from 'theme/components/core/blocks/Reviews/ReviewsList'
import ReviewsForm from 'theme/components/core/blocks/Reviews/ReviewsForm'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'Reviews',
  data () {
    return {
      formVisible: false
    }
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    productName: {
      type: String,
      required: true
    }
  },
  components: {
    ReviewsList,
    ReviewsForm,
    ReviewsStars,
    ButtonComponent
  },
  computed: {
    ...mapGetters({
      reviews: 'review/getReviews',
      reviewsCount: 'review/getReviewsCount',
      reviewsTotalRating: 'review/getReviewsTotalRating'
    }),
    productId () {
      return this.product.id
    },
    total () {
      return this.reviewsCount + ' ' + (this.reviewsCount > 1 ? i18n.t('Reviews') : i18n.t('Review'))
    },
    currentUser () {
      return this.$store.state.user.current
    }
  },
  methods: {
    goToForm () {
      this.formVisible = 1
      VueScrollTo.scrollTo('#reviews', { offset: -110 })
    },
    toggleForm () {
      this.formVisible = !this.formVisible
    },
    refreshList () {
      this.$store.dispatch('review/list', { productId: this.productId })
    }
  },
  mounted () {
    this.$bus.$on('product-after-load', this.refreshList)
    this.$bus.$on('reviews-open-form', this.goToForm)
  },
  destroyed () {
    this.$bus.$off('product-after-load', this.refreshList)
  },
  beforeMount () {
    this.refreshList()
  }
}
</script>
