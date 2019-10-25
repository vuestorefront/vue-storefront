<template>
  <div class="reviews-form t-bg-white t-p-4 t-mb-8" id="reviews-form">
    <form name="review" action="#" @submit.prevent="outOfScope()">
      <div class="t-mb-4">
        <base-label form-id="name" :label-text="$t('First name')" />
        <base-input
          id="name"
          name="name"
          :placeholder="sampleName"
          v-model="reviewForm.name"
          :validations="[
            {
              condition: $v.reviewForm.name.$error && !$v.reviewForm.name.required,
              text: $t('Field is required')
            },
            {
              condition: !$v.reviewForm.name.minLength,
              text: $t('Name must have at least 2 letters.')
            }
          ]"
        />
      </div>
      <div class="t-mb-4">
        <base-label form-id="email" :label-text="$t('Email address')" />
        <base-input
          id="email"
          name="email"
          type="email"
          :placeholder="sampleEmail"
          v-model="reviewForm.email"
          :validations="[
            {
              condition: $v.reviewForm.email.$error && !$v.reviewForm.email.required,
              text: $t('Field is required')
            },
            {
              condition: !$v.reviewForm.email.email && $v.reviewForm.email.$error,
              text: $t('Please provide valid e-mail address.')
            }
          ]"
        />
      </div>
      <div class="t-mb-4">
        <base-label form-id="rating" :label-text="$t('Rating')" />
        <base-select
          id="rating"
          name="rating"
          :options="ratingOptions"
          :initial-option-text="$t('How did you like it?')"
          :validations="[
            {
              condition: $v.reviewForm.rating.$error && !$v.reviewForm.rating.required,
              text: $t('Field is required')
            }
          ]"
          v-model="reviewForm.rating"
        />
      </div>
      <div class="t-mb-4">
        <base-label form-id="summary" :label-text="$t('Summary')" />
        <base-input
          id="summary"
          name="summary"
          :placeholder="$t('...')"
          v-model="reviewForm.summary"
          :validations="[
            {
              condition: $v.reviewForm.summary.$error && !$v.reviewForm.summary.required,
              text: $t('Field is required')
            }
          ]"
        />
      </div>
      <div class="t-mb-4">
        <base-label form-id="review" :label-text="$t('Review')" />
        <base-textarea
          id="review"
          name="review"
          placeholder="..."
          v-model="reviewForm.review"
          :validations="[
            {
              condition: $v.reviewForm.review.$error && !$v.reviewForm.review.required,
              text: $t('Field is required')
            }
          ]"
        />
      </div>
      <div class="">
        <button-component @click.native="validate()" :class="{ 'w-auto': !currentUser }">
          {{ $t('Add review') }}
        </button-component>
      </div>
    </form>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import { mapGetters } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'

import ButtonComponent from 'theme/components/core/blocks/Button'
import BaseLabel from 'theme/components/core/blocks/Form/BaseLabel'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea'
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect'
import { AddReview } from '@vue-storefront/core/modules/review/components/AddReview'

export default {
  name: 'ReviewsForm',
  data () {
    return {
      reviewForm: {
        name: '',
        email: '',
        rating: '',
        summary: '',
        review: ''
      }
    }
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: {
    ButtonComponent,
    BaseLabel,
    BaseInput,
    BaseTextarea,
    BaseSelect
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
    currentUser () {
      return this.$store.state.user.current
    },
    ratingOptions () {
      const total = 5
      let values = []
      for (let value = 1; value <= total; value++) {
        values.push({ value, label: i18n.t(`Reviewrating: ${value}`) })
      }

      return values.reverse()
    },
    sampleName () {
      const names = ['Jose', 'Ulli', 'Manu', 'Maria', 'Micha', 'Sigi', 'Sascha']
      return names[Math.floor(Math.random() * names.length)]
    },
    sampleEmail () {
      return this.sampleName.toLowerCase() + '@muster.de'
    }
  },
  methods: {
    validate () {
      this.$v.reviewForm.$touch()
      if (!this.$v.reviewForm.$invalid) {
        this.submit()
      }
    },
    async submit () {
      const isReviewCreated = await this.$store.dispatch('review/add', {
        'review_entity': 'product',
        'product_id': this.productId,
        'customer_id': this.currentUser ? this.currentUser.id : null,
        'name': this.reviewForm.name,
        'email': this.reviewForm.summary,
        'rating': this.reviewForm.rating,
        'title': this.reviewForm.summary,
        'detail': this.reviewForm.review
      })

      if (isReviewCreated) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: i18n.t('You submitted your review for moderation.'),
          action1: { label: i18n.t('OK') }
        })
        return
      }
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t('Something went wrong. Try again in a few seconds.'),
        action1: { label: i18n.t('OK') }
      })
    },
    clearReviewForm () {
      this.reviewForm.name = ''
      this.reviewForm.email = ''
      this.reviewForm.summary = ''
      this.reviewForm.review = ''
      this.$v.$reset()
    },
    fillInUserData () {
      if (this.currentUser) {
        this.reviewForm.name = this.currentUser.firstname
        this.reviewForm.email = this.currentUser.email
      }
    }
  },
  mounted () {
    this.$bus.$on('clear-add-review-form', this.clearReviewForm)
    this.$bus.$on('user-after-loggedin', this.fillInUserData)
  },
  destroyed () {
    this.$bus.$off('clear-add-review-form', this.clearReviewForm)
    this.$bus.$off('user-after-loggedin', this.fillInUserData)
  },
  beforeMount () {
    this.fillInUserData()
  },
  validations: {
    reviewForm: {
      name: {
        minLength: minLength(2),
        required
      },
      email: {
        required,
        email
      },
      rating: {
        required
      },
      summary: {
        required
      },
      review: {
        required
      }
    }
  }
}
</script>
