<template>
  <div class="brdr-top-1 brdr-cl-secondary">
    <section class="container px15 pb50 cl-primary">
      <div class="row between-xs">
        <div class="col-xs-12 col-md-6 pt50">
          <h2 class="h3 m0 mb10 serif lh20 weight-700">
            {{ $t('Reviews') }}
          </h2>
          <reviews-list
            :per-page="4"
            :items="reviews"
            :product-name="productName"
            :product="product"
          />
        </div>
        <div class="col-xs-12 col-md-5 pt50">
          <h2 class="h3 m0 mb10 serif lh20 weight-700">
            {{ $t('Add review') }}
          </h2>
          <form action="#" @submit.prevent="outOfScope()">
            <div class="mb10 pt50">
              <base-input
                type="text"
                :placeholder="$t('First name') + ' *'"
                v-model="formData.name"
                @blur="$v.formData.name.$touch()"
                :validations="[
                  {
                    condition: $v.formData.name.$error && !$v.formData.name.required,
                    text: $t('Field is required')
                  },
                  {
                    condition: !$v.formData.name.minLength,
                    text: $t('Name must have at least 2 letters.')
                  }
                ]"
              />
            </div>
            <div class="mb10">
              <base-input
                type="email"
                :placeholder="$t('Email address') + ' *'"
                v-model="formData.email"
                @blur="$v.formData.email.$touch()"
                :validations="[
                  {
                    condition: $v.formData.email.$error && !$v.formData.email.required,
                    text: $t('Field is required')
                  },
                  {
                    condition: !$v.formData.email.email && $v.formData.email.$error,
                    text: $t('Please provide valid e-mail address.')
                  }
                ]"
              />
            </div>
            <div class="mb10">
              <base-input
                type="text"
                :placeholder="$t('Summary') + ' *'"
                v-model="formData.summary"
                @blur="$v.formData.summary.$touch()"
                :validations="[
                  {
                    condition: $v.formData.summary.$error && !$v.formData.summary.required,
                    text: $t('Field is required')
                  }
                ]"
              />
            </div>
            <div class="mb25">
              <base-textarea
                type="text"
                :placeholder="$t('Review') + ' *'"
                v-model="formData.review"
                @blur="$v.formData.review.$touch()"
                :validations="[
                  {
                    condition: $v.formData.review.$error && !$v.formData.review.required,
                    text: $t('Field is required')
                  }
                ]"
              />
            </div>
            <div class="row m0 middle-xs center-xs start-sm buttons">
              <button-full
                @click.native="validate()"
                :class="{ 'w-auto': !currentUser }"
              >
                {{ $t('Add review') }}
              </button-full>
              <no-ssr>
                <span
                  class="fs-medium ml20 cl-gray lh30 py5 block"
                  v-if="!currentUser"
                >
                  {{ $t('or') }} <a href="#" class="cl-primary" @click.prevent="login()">{{ $t('login') }}</a> {{ $t('to account') }}
                </span>
              </no-ssr>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea'
import ButtonFull from 'theme/components/theme/ButtonFull'
import ReviewsList from 'theme/components/theme/blocks/Reviews/ReviewsList'
import { Reviews } from '@vue-storefront/core/modules/review/components/Reviews'
import { AddReview } from '@vue-storefront/core/modules/review/components/AddReview'
import NoSSR from 'vue-no-ssr'
import i18n from '@vue-storefront/i18n'

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
  props: {
    productId: {
      type: [String, Number],
      required: true
    },
    productName: {
      type: String,
      default: ''
    },
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user.current
    }
  },
  methods: {
    validate () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.submit()
      }
    },
    refreshList () {
      this.$store.dispatch('review/list', { productId: this.productId })
    },
    async submit () {
      const isReviewCreated = await this.$store.dispatch('review/add', {
        'product_id': this.productId,
        'title': this.formData.summary,
        'detail': this.formData.review,
        'nickname': this.formData.name,
        'review_entity': 'product',
        'customer_id': this.currentUser ? this.currentUser.id : null
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
  mixins: [ Reviews ],
  validations: {
    formData: {
      name: {
        minLength: minLength(2),
        required
      },
      email: {
        required,
        email
      },
      summary: {
        required
      },
      review: {
        required
      }
    }
  },
  components: {
    ButtonFull,
    BaseInput,
    BaseTextarea,
    ReviewsList,
    'no-ssr': NoSSR
  }
}
</script>
