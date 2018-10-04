<template>
  <!-- Examples of usage -->
  <div>
    <button id="add-review" @click="addReview(review)">add review</button>
  </div>
</template>

<script>
import {
  addReview,
  reviews
} from '@vue-storefront/core/modules/review/features'

export default {
  data () {
    return {
      review: {
        product_id: 1,
        title: 'Title',
        detail: 'Review',
        nickname: 'User',
        review_entity: 'product',
        review_status: 2
      }
    }
  },
  // And register them as a mixins
  mixins: [
    reviews,
    addReview
  ]
}
</script>
