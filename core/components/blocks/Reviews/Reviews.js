import builder from 'bodybuilder'

export default {
  name: 'Reviews',
  data () {
    return {
      formData: {
        name: '',
        email: '',
        summary: '',
        review: ''
      }
    }
  },
  computed: {
    product () {
      return this.$store.state.product
    },
    currentUser () {
      return this.$store.state.user.current
    },
    reviews () {
      return this.$store.state.review.items
    }
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
        })
      }
    },
    addReview () {
      const review = {
        'product_id': this.product.current.id,
        'title': this.formData.summary,
        'detail': this.formData.review,
        'nickname': this.formData.name,
        'review_entity': 'product',
        'review_status': 2
      }

      if (this.currentUser) {
        review.customer_id = this.currentUser.id
      }

      this.$store.dispatch('review/add', review)
    },
    clearReviewForm () {
      this.formData.name = ''
      this.formData.email = ''
      this.formData.summary = ''
      this.formData.review = ''
      this.$v.$reset()
    },
    login () {
      this.$bus.$emit('modal-show', 'modal-signup')
    },
    fillInUserData () {
      if (this.currentUser) {
        this.formData.name = this.currentUser.firstname
        this.formData.email = this.currentUser.email
      }
    }
  },
  created () {
    this.$bus.$on('product-after-load', this.refreshList)
    this.$bus.$on('clear-add-review-form', this.clearReviewForm)
    this.$bus.$on('user-after-loggedin', this.fillInUserData)
  },
  destroyed () {
    this.$bus.$off('product-after-load', this.refreshList)
    this.$bus.$off('clear-add-review-form', this.clearReviewForm)
    this.$bus.$off('user-after-loggedin', this.fillInUserData)
  },
  beforeMount () {
    this.refreshList()
    this.fillInUserData()
  }
}
