<template>
  <section
    class="py20 new-collection container px15">
    <div>
      <header class="col-md-12">
        <h2 class="align-center cl-accent">
          {{ heading }}
        </h2>
      </header>
    </div>
    <div class="row center-xs">
      <review-listing :reviews="reviews()" />
    </div>
    <div>
      <button-full @click.native="addReview">
        {{ $t('Add test review') }}
      </button-full>
    </div>
  </section>
</template>

<script>

import builder from 'bodybuilder'
import i18n from '@vue-storefront/core/lib/i18n'
import ButtonFull from 'theme/components/theme/ButtonFull'
import ReviewListing from '../../ReviewListing'

export default {
  props: {
    heading: {
      type: String,
      required: false,
      default: i18n.t('Reviews')
    }
  },
  created () {
    this.$bus.$on('product-after-load', this.refreshList)
  },
  destroyed () {
    this.$bus.$off('product-after-load', this.refreshList)
  },
  beforeMount () {
    this.refreshList()
  },
  components: {
    ReviewListing,
    ButtonFull
  },
  methods: {
    refreshList () {
      let productId = this.product.current.id

      if (productId) {
        let query = builder().query('match', 'product_id', productId)
          .filter('term', 'review_status', 1)

        // review_status 1 - approved
        // stores
        query = query.build()

        this.$store.dispatch('review/list', {
          query,
          size: 4
        }).then((res) => {
          this.$store.dispatch('review/setReviews', res.items)
          console.debug(res)
        })
      }
    },
    addReview () {
      let review

      review = {
        'product_id': 1, /* productid */
        'title': 'Test review',
        'detail': 'Test review details',
        'nickname': 'Agata',
        'review_entity': 'product',
        'review_status': 2 /* pending */
      }

      if (this.currentUser()) {
        review.customer_id = this.currentUser().id
      }

      this.$store.dispatch('review/add', review)
    },
    currentUser () {
      return this.$store.state.user.current
    },
    reviews () {
      return this.$store.state.review.items
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    }
  }
}
</script>

<div>

</div>
