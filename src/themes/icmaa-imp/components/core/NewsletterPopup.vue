<template>
  <modal name="modal-newsletter" :title="$t('Newsletter')" :width="400">
    <form @submit.prevent="subscribe(onSuccesfulSubmission)" novalidate v-if="!isSubscribed">
      <p class="t-text-sm t-mb-4">
        {{ $t('Sign up to our newsletter and receive a coupon for 10% off!') }}
      </p>
      <base-input
        focus
        type="email"
        name="email"
        v-model="email"
        class="t-mb-4"
        :placeholder="$t('E-mail address *')"
        :validations="[
          {
            condition: $v.email.$error && !$v.email.required,
            text: $t('Field is required.')
          },
          {
            condition: !$v.email.email && $v.email.$error,
            text: $t('Please provide valid e-mail address.')
          }
        ]"
      />
      <button-component class="t-w-full" type="primary" :submit="true" @click="$v.email.$touch">
        {{ $t('Subscribe') }}
      </button-component>
    </form>
    <div v-else>
      {{ $t('Oh great, you are already subscribed.') }}
      <i18n path="You can manage your subscription in your {account-settings}." tag="div" class="t-text-xs t-text-base-light">
        <router-link place="account-settings" :to="localizedRoute('/my-account/newsletter')" class="t-text-base-light t-underline">
          {{ $t('account settings') }}
        </router-link>
      </i18n>
    </div>
  </modal>
</template>
<script>
import i18n from '@vue-storefront/i18n'
import { required, email } from 'vuelidate/lib/validators'

import Modal from 'theme/components/core/Modal'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonComponent from 'theme/components/core/blocks/Button'
import { mapGetters } from 'vuex'

export default {
  name: 'NewsletterPopup',
  components: {
    Modal,
    BaseInput,
    ButtonComponent
  },
  data () {
    return {
      email: '',
      user: {
        isSubscribed: false
      }
    }
  },
  computed: {
    ...mapGetters({
      isSubscribed: 'newsletter/isSubscribed'
    })
  },
  validations: {
    email: {
      required,
      email
    }
  },
  beforeMount () {
    if (this.$store.state.user.current) {
      this.onLoggedIn()
    }
    this.$bus.$on('user-after-loggedin', this.onLoggedIn)
  },
  mounted () {
    this.$nextTick(() => {
      this.$bus.$emit('modal-show', 'modal-newsletter')
    })
  },
  beforeDestroy () {
    this.$bus.$off('user-after-loggedin', this.onLoggedIn)
  },
  methods: {
    async onLoggedIn () {
      this.email = this.$store.state.user.current.email
      this.user.isSubscribed = await this.$store.dispatch('newsletter/status', this.email)
    },
    subscribe (success, failure) {
      // argument omitted for validation purposes
      if (!this.$v.$invalid) {
        return this.$store.dispatch('newsletter/subscribe', this.email).then(res => {
          if (success) success(res)
        }).catch(err => {
          if (failure) failure(err)
        }
        )
      }
    },
    onSuccesfulSubmission (isSubscribed) {
      if (isSubscribed) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: i18n.t('We are almost done. A confirmation email has been send to your email address.'),
          action1: { label: i18n.t('OK') }
        })

        this.$bus.$emit('modal-hide', 'modal-newsletter')
      }
    }
  }
}
</script>
