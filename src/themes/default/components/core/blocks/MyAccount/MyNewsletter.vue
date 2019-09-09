<template>
  <div class="mb35">
    <!-- My newsletter header -->
    <div class="row mb15">
      <div class="col-xs-12 col-sm-6">
        <h3 class="m0 mb5">
          {{ $t('My newsletter') }}
        </h3>
      </div>
    </div>

    <!-- My newsletter body (both modes) -->
    <div class="row">
      <div class="col-xs-12">
        <h4>
          {{ $t('General agreement') }}
        </h4>
      </div>

      <base-checkbox
        class="col-xs-12 mb25 cl-primary"
        id="generalAgreement"
        v-model="user.isSubscribed"
        @click="edit()"
      >
        {{ $t('I want to receive a newsletter, and agree to its terms') }}
      </base-checkbox>

      <div class="col-xs-12 col-sm-6">
        <button-full @click.native="updateNewsletter">
          {{ $t('Update my preferences') }}
        </button-full>
      </div>
    </div>
  </div>
</template>

<script>
import { Newsletter } from '@vue-storefront/core/modules/newsletter/components/Newsletter'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from '../Form/BaseCheckbox.vue'
import i18n from '@vue-storefront/i18n'

export default {
  components: {
    ButtonFull,
    BaseCheckbox
  },
  data () {
    return {
    }
  },
  methods: {
    edit () {
      this.isEdited = true
    },
    async updateNewsletter () {
      if (this.user.isSubscribed) {
        const isSubscribed = await this.$store.dispatch('newsletter/subscribe', this.email)

        if (isSubscribed) {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'success',
            message: i18n.t('You have been successfully subscribed to our newsletter!'),
            action1: { label: i18n.t('OK') }
          })
        }
        return
      }

      const isUnsubscribed = await this.$store.dispatch('newsletter/unsubscribe', this.email)
      if (isUnsubscribed) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: i18n.t('You have been successfully unsubscribed from our newsletter!'),
          action1: { label: i18n.t('OK') }
        })
      }
    }
  },
  mixins: [Newsletter]
}
</script>
