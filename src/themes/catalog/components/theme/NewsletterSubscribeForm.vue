<template>
  <div class="newsletter-subscribe-form">
    <input v-model="email" type="email" class="m0 px25 inline-flex fs-medium" autocomplete="email" placeholder="E-mail address">
    <button @click="subscribeNewsletter" class="m0 fs-medium inline-flex center-xs c-on-accent bg-accent bg-accent-hover pointer">Subscribe to magazine</button>
  </div>
</template>

<script>
import i18n from 'lib/i18n'

export default {
  data () {
    return {
      email: null,
      // Temporary for demo purposes, normally we should use Vuex
      subscribed: false
    }
  },
  methods: {
    subscribeNewsletter () {
      const notification = {
        subscribed: {
          type: 'success',
          message: i18n.t('Newsletter succesfully subscribed. Thank you!'),
          action1: { label: 'OK', action: 'close' }
        },
        alreadySubscribed: {
          type: 'error',
          message: i18n.t('You have already subscibed our newsletter'),
          action1: { label: 'OK', action: 'close' }
        },
        wrongEmail: {
          type: 'error',
          message: i18n.t('Email field is empty'),
          action1: { label: 'OK', action: 'close' }
        }
      }

      if (this.email && !this.subscribed) {
        this.subscribed = true
        this.$bus.$emit('newsletter-after-subscribe', { email: this.email })
        this.$bus.$emit('notification', notification.subscribed)
      } else if (this.subscribed) {
        this.$bus.$emit('notification', notification.alreadySubscribed)
      } else if (!this.email) {
        this.$bus.$emit('notification', notification.wrongEmail)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~theme/css/vars/additional';

.newsletter-subscribe-form {
    input, button {
        height: 60px;
        box-sizing: border-box;
        border: none;
    }
    input {
        width: 65%;
    }
    button {
        width: 35%;
        outline: none;
    }
    @media (max-width: $md) {
      input, button {
        width: 80%;
      }
    }

}
</style>
