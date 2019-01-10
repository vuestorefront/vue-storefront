<template>
  <div>
    <button id="add-review" @click="addReview(review)">add review</button>
  </div>
</template>

<script>
import { Reviews } from '../components/Reviews'
import { AddReview } from '../components/AddReview'

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
    Reviews,
    AddReview
  ]
}
</script>
