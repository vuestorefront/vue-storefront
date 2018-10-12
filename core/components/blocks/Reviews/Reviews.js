import { Reviews } from '@vue-storefront/core/modules/review/components/Reviews'
import { AddReview } from '@vue-storefront/core/modules/review/components/AddReview'

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
    }
  },
  methods: {
    refreshList () {
      this.$store.dispatch('review/list', { productId: this.product.current.id })
    },
    submit () {
      this.addReview({
        'product_id': this.product.current.id,
        'title': this.formData.summary,
        'detail': this.formData.review,
        'nickname': this.formData.name,
        'review_entity': 'product',
        'review_status': 2,
        'customer_id': this.currentUser.id || null
      })
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
  mounted () {
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
  },
  mixins: [ Reviews, AddReview ]
}
