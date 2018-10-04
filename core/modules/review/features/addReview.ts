/**
 * Functionality for adding a review.
 *
 * #### Methods
 * - **`addReview(review)`** adds passed review. Dispatches `review/add` Vuex action
 *
 * Part of [Review API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
import Review from '@vue-storefront/core/modules/review/types/Review'
export const addReview = {
  methods: {
    addReview (review: Review) {
      this.$store.dispatch('review/add', review)
    }
  }
}
