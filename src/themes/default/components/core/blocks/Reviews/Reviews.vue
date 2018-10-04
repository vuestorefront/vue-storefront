<template>
  <div class="brdr-top-1 brdr-cl-secondary">
    <section class="container px15 pb50 cl-primary">
      <div class="row between-xs">
        <div class="col-xs-12 col-md-6 pt50">
          <h2 class="h3 m0 mb10 serif lh20 weight-700">
            {{ $t('Reviews') }}
          </h2>
          <reviews-list :per-page="4" :items="reviews" />
        </div>
        <div class="col-xs-12 col-md-5 pt50">
          <h2 class="h3 m0 mb10 serif lh20 weight-700">
            {{ $t('Add review') }}
          </h2>
          <form action="#" @submit.prevent="outOfScope()">
            <div class="mb25 pt50">
              <base-input
                type="text"
                :placeholder="$t('First name') + ' *'"
                v-model="formData.name"
                @blur="$v.formData.name.$touch()"
                :validations="[
                  {
                    condition: $v.formData.name.$error && !$v.formData.name.required,
                    text: $t('Field is required')
                  }
                ]"
              />
            </div>
            <div class="mb25">
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
            <div class="mb25">
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
              <span
                class="fs-medium ml20 cl-gray lh30 py5 block"
                v-if="!currentUser"
              >
                {{ $t('or') }} <a href="#" class="cl-primary" @click.prevent="login()">{{ $t('login') }}</a> {{ $t('to account') }}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

import Reviews from '@vue-storefront/core/components/blocks/Reviews/Reviews'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import BaseTextarea from 'theme/components/core/blocks/Form/BaseTextarea'
import ButtonFull from 'theme/components/theme/ButtonFull'
import ReviewsList from 'theme/components/theme/blocks/Reviews/ReviewsList'

export default {
  methods: {
    validate () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.submit()
      }
    }
  },
  validations: {
    formData: {
      name: {
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
  mixins: [Reviews],
  components: {
    ButtonFull,
    BaseInput,
    BaseTextarea,
    ReviewsList
  }
}
</script>
