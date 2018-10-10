import Review from '@vue-storefront/core/modules/review/types/Review'

export const AddReview = {
  methods: {
    addReview (review: Review) {
      this.$store.dispatch('review/add', review)
    }
  }
}
